import * as THREE from "three";
import {
  ATMOSPHERE, CITIES, CYAN, EARTH_RADIUS, FPS, HERO_CAMERA, MARKER_GLOW, MARKER_RADIUS, ROUTE_GLOW, ROUTES, SEGMENT, SUN,
  SURFACE_OFFSET, TOTAL_FRAMES, routeState, sunDiffuseIrradiance,
} from "./blenderScene";
import {
  atmosFragment, atmosVertex, basicVertex, earthFragment, earthVertex, emissionFragment, limbFragment, limbVertex, routeVertex,
} from "./shaders";
import { createPost } from "./post";

const latLonToVec = (lat: number, lon: number) => {
  const la = THREE.MathUtils.degToRad(lat), lo = THREE.MathUtils.degToRad(lon);
  return new THREE.Vector3(Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la));
};
const slerpDir = (a: THREE.Vector3, b: THREE.Vector3, f: number) => {
  const om = a.angleTo(b);
  return a.clone().multiplyScalar(Math.sin((1 - f) * om)).add(b.clone().multiplyScalar(Math.sin(f * om))).divideScalar(Math.sin(om));
};

/** Route curve (96 poly points) → resampled by length → one box per point, like GN_RouteSegments. */
function buildRoute(from: string, to: string, material: THREE.ShaderMaterial) {
  const p1 = latLonToVec(...CITIES[from]), p2 = latLonToVec(...CITIES[to]);
  const lift = 0.03 + (0.26 * p1.angleTo(p2)) / Math.PI;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < 96; i++) {
    const f = i / 95;
    const r = EARTH_RADIUS + SURFACE_OFFSET + lift * Math.sin(Math.PI * f);
    pts.push(slerpDir(p1, p2, f).normalize().multiplyScalar(r));
  }
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
  const len = cum[cum.length - 1];
  const count = Math.max(2, Math.floor(len / SEGMENT.spacing) + 1);
  const at = (s: number) => {
    let i = 1;
    while (i < cum.length - 1 && cum[i] < s) i++;
    const t = (s - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
    return pts[i - 1].clone().lerp(pts[i], t);
  };
  const samples = Array.from({ length: count }, (_, i) => at((len * i) / (count - 1)));

  const geo = new THREE.BoxGeometry(SEGMENT.length, SEGMENT.width, SEGMENT.height);
  const mesh = new THREE.InstancedMesh(geo, material, count);
  const factors = new Float32Array(count);
  const m = new THREE.Matrix4();
  for (let i = 0; i < count; i++) {
    const prev = samples[Math.max(0, i - 1)], next = samples[Math.min(count - 1, i + 1)];
    const x = next.clone().sub(prev).normalize();
    const n = samples[i].clone().normalize();
    const z = n.sub(x.clone().multiplyScalar(n.dot(x))).normalize();
    const y = new THREE.Vector3().crossVectors(z, x);
    m.makeBasis(x, y, z).setPosition(samples[i]);
    mesh.setMatrixAt(i, m);
    factors[i] = i / (count - 1);
  }
  geo.setAttribute("aFactor", new THREE.InstancedBufferAttribute(factors, 1));
  mesh.frustumCulled = false;
  return mesh;
}

async function loadFilmic(url: string) {
  const buf = await (await fetch(url)).arrayBuffer();
  const curve = new Float32Array(buf, 0, 4096);
  const cube = new Uint16Array(buf, 16384, 35937 * 3);
  const half = THREE.DataUtils.toHalfFloat;
  const c1 = new Uint16Array(4096 * 4);
  for (let i = 0; i < 4096; i++) c1[i * 4] = half(curve[i]);
  const curveTex = new THREE.DataTexture(c1, 4096, 1, THREE.RGBAFormat, THREE.HalfFloatType);
  const c3 = new Uint16Array(35937 * 4);
  for (let i = 0; i < 35937; i++) {
    for (let k = 0; k < 3; k++) c3[i * 4 + k] = half(cube[i * 3 + k] / 65535);
    c3[i * 4 + 3] = half(1);
  }
  const cubeTex = new THREE.Data3DTexture(c3, 33, 33, 33);
  cubeTex.format = THREE.RGBAFormat;
  cubeTex.type = THREE.HalfFloatType;
  for (const t of [curveTex, cubeTex]) {
    t.minFilter = t.magFilter = THREE.LinearFilter;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.generateMipmaps = false;
    t.needsUpdate = true;
  }
  cubeTex.wrapR = THREE.ClampToEdgeWrapping;
  return { curveTex, cubeTex };
}

export type EarthScene = { start(): void; stop(): void; resize(): void; dispose(): void; ready: Promise<void> };

export function createEarthScene(canvas: HTMLCanvasElement, opts: { animate: boolean; frame?: number }): EarthScene {
  const base = import.meta.env.BASE_URL;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // Filmic pass writes display-referred values itself
  renderer.setClearColor(0x000000, 1); // World: black background

  const scene = new THREE.Scene();
  // Blender Z-up → three Y-up. Everything below `root` uses Blender coordinates directly.
  const root = new THREE.Group();
  root.rotation.x = -Math.PI / 2;
  scene.add(root);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(...HERO_CAMERA.location);
  const q = HERO_CAMERA.quaternion;
  camera.quaternion.set(q.x, q.y, q.z, q.w);
  root.add(camera);

  const sunWorld = new THREE.Vector3(...SUN.toLight).applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2).normalize();

  const controller = new THREE.Group(); // Earth_Rotation_Controller
  root.add(controller);

  // Textures
  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const tex = (name: string, srgb: boolean) =>
    new Promise<THREE.Texture>((res, rej) =>
      loader.load(`${base}models/earth/${name}.jpg`, (t) => {
        t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        t.anisotropy = maxAniso;
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        res(t);
      }, undefined, rej),
    );

  const earthMat = new THREE.ShaderMaterial({
    uniforms: {
      diffuseMap: { value: null }, illumMap: { value: null }, cloudsMap: { value: null }, normalMap: { value: null },
      glossMap: { value: null }, sunDir: { value: sunWorld }, sunE: { value: sunDiffuseIrradiance() },
    },
    vertexShader: earthVertex, fragmentShader: earthFragment,
  });
  // UV sphere with Blender's UV layout: u = (atan2(y,x)+180°)/360°, poles on Z.
  const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 256, 128);
  earthGeo.rotateX(Math.PI / 2);
  const earth = new THREE.Mesh(earthGeo, earthMat);
  controller.add(earth);

  // Atmosphere: child of Earth, 32×16 UV sphere + Subdivision, radius 1.012, front faces only, blended
  const atmos = new THREE.Mesh(
    new THREE.SphereGeometry(ATMOSPHERE.radius, 64, 32),
    new THREE.ShaderMaterial({
      uniforms: { uDir: { value: new THREE.Vector3(...ATMOSPHERE.direction).applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2) } },
      vertexShader: atmosVertex, fragmentShader: atmosFragment, transparent: true, depthWrite: false, side: THREE.FrontSide,
    }),
  );
  atmos.renderOrder = 1;
  earth.add(atmos);

  // Routes + markers
  const routeMats: THREE.ShaderMaterial[] = [];
  const markerMats: THREE.ShaderMaterial[] = [];
  const markers: THREE.Mesh[] = [];
  const dotGeo = new THREE.CircleGeometry(MARKER_RADIUS, 32);
  for (const [from, to] of ROUTES) {
    const rm = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Vector3(...CYAN).multiplyScalar(ROUTE_GLOW) }, uFade: { value: 1 },
        uReveal: { value: 0 }, uSoft: { value: SEGMENT.growSoftness },
      },
      vertexShader: routeVertex, fragmentShader: emissionFragment, transparent: true, depthWrite: false,
    });
    routeMats.push(rm);
    controller.add(buildRoute(from, to, rm));

    const mm = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Vector3(...CYAN).multiplyScalar(MARKER_GLOW) }, uFade: { value: 1 } },
      vertexShader: basicVertex, fragmentShader: emissionFragment, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    markerMats.push(mm);
    const d = latLonToVec(...CITIES[to]);
    const dot = new THREE.Mesh(dotGeo, mm);
    dot.position.copy(d).multiplyScalar(EARTH_RADIUS + SURFACE_OFFSET * 0.6);
    dot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), d);
    markers.push(dot);
    controller.add(dot);
  }

  // Limb glow + background halo (drawn last, additive, ignores depth)
  const limb = new THREE.Mesh(
    new THREE.SphereGeometry(EARTH_RADIUS * 3.5, 96, 48),
    new THREE.ShaderMaterial({
      uniforms: { uSun: { value: sunWorld }, uRadius: { value: EARTH_RADIUS * 1.003 }, uIntensity: { value: 1 } },
      vertexShader: limbVertex, fragmentShader: limbFragment,
      blending: THREE.AdditiveBlending, transparent: true, depthTest: false, depthWrite: false, side: THREE.FrontSide,
    }),
  );
  limb.renderOrder = 10;
  scene.add(limb);

  let post: ReturnType<typeof createPost> | null = null;

  const ready = Promise.all([
    tex("diffuse", true), tex("illumination", true), tex("clouds", false), tex("normalnrm", false), tex("glossiness", false),
    loadFilmic(`${base}models/filmic.bin`),
  ]).then(([d, i, c, n, g, f]) => {
    Object.assign(earthMat.uniforms, {
      diffuseMap: { value: d }, illumMap: { value: i }, cloudsMap: { value: c }, normalMap: { value: n }, glossMap: { value: g },
    });
    post = createPost(renderer, f);
    resize();
  });
  let loaded = false;
  ready.then(() => (loaded = true));

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    const pr = renderer.getPixelRatio();
    post?.setSize(Math.round(w * pr), Math.round(h * pr));
    camera.aspect = w / h;
    // Blender sensor fit AUTO: the 36mm sensor spans the larger image dimension.
    const half = Math.atan(HERO_CAMERA.sensor / 2 / HERO_CAMERA.lens);
    const vHalf = camera.aspect >= 1 ? Math.atan(Math.tan(half) / camera.aspect) : half;
    camera.fov = THREE.MathUtils.radToDeg(2 * vHalf);
    camera.updateProjectionMatrix();
  };

  if (import.meta.env.DEV) (window as unknown as { __earth: unknown }).__earth = { camera, scene, renderer, canvas };
  const startTime = performance.now();
  const setFrame = (frame: number) => {
    controller.rotation.z = (Math.PI * 2 * (frame - 1)) / TOTAL_FRAMES;
    ROUTES.forEach(([, , off, timing], i) => {
      const [reveal, fade, dotScale] = routeState(frame, off, timing);
      routeMats[i].uniforms.uReveal.value = reveal;
      routeMats[i].uniforms.uFade.value = fade;
      markerMats[i].uniforms.uFade.value = fade;
      markers[i].scale.setScalar(Math.max(dotScale, 1e-4));
      markers[i].visible = dotScale > 0;
    });
  };

  const render = () => {
    const t = (performance.now() - startTime) / 1000;
    setFrame(opts.frame ?? (opts.animate ? 1 + ((t * FPS) % TOTAL_FRAMES) : 1));
    scene.updateMatrixWorld();


    if (!post) return;
    renderer.setRenderTarget(post.sceneRT);
    renderer.render(scene, camera);
    post.render();
  };

  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (loaded) render();
  };

  resize();
  return {
    ready,
    resize,
    start() { if (!raf) loop(); },
    stop() { cancelAnimationFrame(raf); raf = 0; },
    dispose() {
      cancelAnimationFrame(raf);
      post?.dispose();
      // free every GPU resource explicitly (4K textures add up fast across remounts)
      const seen = new Set<{ dispose(): void }>();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) seen.add(m.geometry);
        for (const mat of ([] as THREE.Material[]).concat(m.material ?? [])) {
          seen.add(mat);
          for (const u of Object.values((mat as THREE.ShaderMaterial).uniforms ?? {}))
            if (u.value instanceof THREE.Texture) seen.add(u.value);
        }
      });
      seen.forEach((r) => r.dispose());
      renderer.dispose();
      renderer.forceContextLoss(); // free the GL context now (StrictMode / HMR remounts otherwise pile them up)
    },
  };
}
