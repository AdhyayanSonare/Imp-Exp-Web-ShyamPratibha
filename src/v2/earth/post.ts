import * as THREE from "three";
import { filmicFragment } from "./shaders";

/* Port of the .blend compositor (scene-linear, before the view transform):
   Render Layers → Lens Distortion (radial, distortion 0, dispersion 0.03)
   → Glare (Fog Glow, threshold 0.5, smoothness 0.1, clamp 10, strength 1.5, tint 0.5/0.8/1, size 0.9)
   → Color Correction → Filmic (view transform).
   The .blend's viewport has the compositor DISABLED, so the reference look is EEVEE + Filmic only:
   COMPOSITOR = false skips lens/glare/colour correction. Flip it to get the final-render compositing. */
export const COMPOSITOR = false;

const quadVert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const lensFrag = /* glsl */ `
  uniform sampler2D tSrc; uniform vec2 uAspect; varying vec2 vUv;
  void main() {
    // chromatic dispersion: red and blue pulled radially in opposite directions, strongest in the corners
    vec2 d = (vUv - 0.5) * uAspect;
    float r2 = dot(d, d) / dot(0.5 * uAspect, 0.5 * uAspect);
    float k = 0.03 * 0.25;
    vec2 off = (vUv - 0.5) * r2 * k;
    gl_FragColor = vec4(texture2D(tSrc, vUv + off).r, texture2D(tSrc, vUv).g, texture2D(tSrc, vUv - off).b, 1.0);
  }`;

// 13-tap downsample (Jimenez 2014); on the first level also extracts highlights like Blender's glare.
const downFrag = /* glsl */ `
  uniform sampler2D tSrc; uniform vec2 uTexel; uniform bool uPrefilter; varying vec2 vUv;
  vec3 s(vec2 o){ return texture2D(tSrc, vUv + o * uTexel).rgb; }
  vec3 highlights(vec3 c){
    float b = max(max(c.r, c.g), c.b);
    float t = 0.5, k = t * 0.1, x = b - t;
    float h = x <= -k ? 0.0 : x < k ? (x + k) * (x + k) / (4.0 * k) : x;
    h = min(h, 10.0);
    return b > 1e-5 ? c * (h / b) : vec3(0.0);
  }
  void main() {
    vec3 a = s(vec2(-2, 2)), b = s(vec2(0, 2)), c = s(vec2(2, 2));
    vec3 d = s(vec2(-2, 0)), e = s(vec2(0, 0)), f = s(vec2(2, 0));
    vec3 g = s(vec2(-2, -2)), h = s(vec2(0, -2)), i = s(vec2(2, -2));
    vec3 j = s(vec2(-1, 1)), k = s(vec2(1, 1)), l = s(vec2(-1, -1)), m = s(vec2(1, -1));
    vec3 o = e * 0.125 + (a + c + g + i) * 0.03125 + (b + d + f + h) * 0.0625 + (j + k + l + m) * 0.125;
    gl_FragColor = vec4(uPrefilter ? highlights(o) : o, 1.0);
  }`;

const upFrag = /* glsl */ `
  uniform sampler2D tSrc; uniform vec2 uTexel; varying vec2 vUv;
  vec3 s(vec2 o){ return texture2D(tSrc, vUv + o * uTexel).rgb; }
  void main() {
    vec3 o = s(vec2(0, 0)) * 4.0 + (s(vec2(-1, 0)) + s(vec2(1, 0)) + s(vec2(0, -1)) + s(vec2(0, 1))) * 2.0
           + s(vec2(-1, -1)) + s(vec2(1, -1)) + s(vec2(-1, 1)) + s(vec2(1, 1));
    gl_FragColor = vec4(o / 16.0, 1.0);
  }`;

// Glare add + Blender Color Correction node + Filmic
const finalFrag = /* glsl */ `
  precision highp sampler3D;
  uniform sampler2D tLens, tGlow; uniform float uGlowNorm; uniform bool uCompositor;
  uniform sampler3D tDesat; uniform sampler2D tCurve; uniform vec3 uBg;
  varying vec2 vUv;
  float curve(float x){ return texture2D(tCurve, vec2(clamp(x, 0.0, 1.0) * (4095.0 / 4096.0) + 0.5 / 4096.0, 0.5)).r; }

  vec3 colorCorrection(vec3 c){
    const float start = 0.1784946, end = 0.5548387, margin = 0.1, div = 0.5 / margin;
    float level = (c.r + c.g + c.b) / 3.0;
    float sh = 0.0, mid = 0.0, hi = 0.0;
    if (level < start - margin) sh = 1.0;
    else if (level < start + margin) { mid = (level - start) * div + 0.5; sh = 1.0 - mid; }
    else if (level < end - margin) mid = 1.0;
    else if (level < end + margin) { hi = (level - end) * div + 0.5; mid = 1.0 - hi; }
    else hi = 1.0;
    // shadows / midtones / highlights, then master
    float contrast = (sh * 1.0 + mid * 1.1403508 + hi * 1.7719297) * 1.05;
    float saturation = 1.0;
    float gamma = 1.0;
    float gain = (sh * 0.6315789 + mid * 1.3508772 + hi * 0.7192982) * 1.1403508;
    float lift = sh * 0.02;
    float luma = dot(c, vec3(0.2126, 0.7152, 0.0722));
    c = luma + saturation * (c - luma);
    c = 0.5 + (c - 0.5) * contrast;
    c = pow(max(c * gain + lift, 0.0), vec3(1.0 / gamma));
    return c;
  }

  void main() {
    vec3 c = texture2D(tLens, vUv).rgb;
    if (uCompositor) {
      c += texture2D(tGlow, vUv).rgb * uGlowNorm * 1.5 * vec3(0.5, 0.8, 1.0);
      c = max(colorCorrection(c), vec3(0.0));
    }
    ${filmicFragment.split("void main() {")[1].replace("vec3 c = max(texture2D(tScene, vUv).rgb, vec3(0.0));", "").replace(/}\s*$/, "")}
  }`;

export function createPost(renderer: THREE.WebGLRenderer, filmic: { curveTex: THREE.Texture; cubeTex: THREE.Data3DTexture }) {
  const LEVELS = 8;
  const hdr = { type: THREE.HalfFloatType, depthBuffer: false } as const;
  const sceneRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  const lensRT = new THREE.WebGLRenderTarget(1, 1, hdr);
  const mips = Array.from({ length: LEVELS }, () => new THREE.WebGLRenderTarget(1, 1, hdr));
  for (const rt of [lensRT, ...mips]) rt.texture.minFilter = rt.texture.magFilter = THREE.LinearFilter;

  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
  quad.frustumCulled = false;
  const scene = new THREE.Scene();
  scene.add(quad);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const mat = (frag: string, uniforms: Record<string, THREE.IUniform>, extra: Partial<THREE.ShaderMaterialParameters> = {}) =>
    new THREE.ShaderMaterial({ vertexShader: quadVert, fragmentShader: frag, uniforms, depthTest: false, depthWrite: false, ...extra });

  const lensMat = mat(lensFrag, { tSrc: { value: sceneRT.texture }, uAspect: { value: new THREE.Vector2(1, 1) } });
  const downMat = mat(downFrag, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uPrefilter: { value: false } });
  const upMat = mat(upFrag, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() } }, {
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendEquation: THREE.AddEquation, transparent: true,
  });
  const finalMat = mat(finalFrag, {
    tLens: { value: COMPOSITOR ? lensRT.texture : sceneRT.texture }, uCompositor: { value: COMPOSITOR }, tGlow: { value: mips[0].texture }, uGlowNorm: { value: 1 / LEVELS }, uBg: { value: new THREE.Vector3(10 / 255, 15 / 255, 21 / 255) },
    tDesat: { value: filmic.cubeTex }, tCurve: { value: filmic.curveTex },
  });

  const pass = (m: THREE.ShaderMaterial, target: THREE.WebGLRenderTarget | null) => {
    quad.material = m;
    renderer.setRenderTarget(target);
    renderer.render(scene, cam);
  };

  return {
    sceneRT,
    setSize(w: number, h: number) {
      sceneRT.setSize(w, h);
      lensRT.setSize(w, h);
      mips.forEach((rt, i) => rt.setSize(Math.max(1, w >> (i + 1)), Math.max(1, h >> (i + 1))));
      lensMat.uniforms.uAspect.value.set(w / h, 1);
    },
    render() {
      if (!COMPOSITOR) { pass(finalMat, null); return; } // viewport look: EEVEE + Filmic only
      pass(lensMat, lensRT);
      // fog glow: highlight downsample pyramid, then additive tent upsample back to level 0
      let src = COMPOSITOR ? lensRT : sceneRT;
      mips.forEach((rt, i) => {
        downMat.uniforms.tSrc.value = src.texture;
        downMat.uniforms.uTexel.value.set(1 / src.width, 1 / src.height);
        downMat.uniforms.uPrefilter.value = i === 0;
        pass(downMat, rt);
        src = rt;
      });
      renderer.autoClear = false;
      for (let i = LEVELS - 1; i > 0; i--) {
        upMat.uniforms.tSrc.value = mips[i].texture;
        upMat.uniforms.uTexel.value.set(1 / mips[i].width, 1 / mips[i].height);
        pass(upMat, mips[i - 1]);
      }
      renderer.autoClear = true;
      pass(finalMat, null);
    },
    dispose() {
      [sceneRT, lensRT, ...mips].forEach((rt) => rt.dispose());
    },
  };
}
