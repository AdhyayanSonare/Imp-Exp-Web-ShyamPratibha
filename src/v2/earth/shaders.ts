/* GLSL port of the Blender material "Material.001" (Earth), the route/marker emission materials,
   and Blender's Filmic view transform. Lighting values are in Blender units (sun strength in W/m²). */

const noise = /* glsl */ `
  // Classic 3D Perlin noise (Gustavson), used for Blender's Noise Texture nodes.
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade3(vec3 t){ return t*t*t*(t*(t*6.0-15.0)+10.0); }
  float cnoise(vec3 P){
    vec3 Pi0 = floor(P), Pi1 = Pi0 + vec3(1.0); Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P), Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x), iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz, iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0, gy0 = fract(floor(gx0) / 7.0) - 0.5; gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0, gy1 = fract(floor(gx1) / 7.0) - 0.5; gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x), g100 = vec3(gx0.y,gy0.y,gz0.y), g010 = vec3(gx0.z,gy0.z,gz0.z), g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x), g101 = vec3(gx1.y,gy1.y,gz1.y), g011 = vec3(gx1.z,gy1.z,gz1.z), g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 n0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
    g000 *= n0.x; g010 *= n0.y; g100 *= n0.z; g110 *= n0.w;
    vec4 n1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
    g001 *= n1.x; g011 *= n1.y; g101 *= n1.z; g111 *= n1.w;
    float n000 = dot(g000, Pf0), n100 = dot(g100, vec3(Pf1.x, Pf0.yz)), n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z)), n001 = dot(g001, vec3(Pf0.xy, Pf1.z)), n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz)), n111 = dot(g111, Pf1);
    vec3 f = fade3(Pf0);
    vec4 nz = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), f.z);
    vec2 nyz = mix(nz.xy, nz.zw, f.y);
    return 2.2 * mix(nyz.x, nyz.y, f.x);
  }
  // Blender Noise Texture (fBm): detail may be fractional, output remapped to 0..1.
  float blenderNoise(vec3 p, float detail, float roughness){
    float amp = 1.0, maxamp = 0.0, sum = 0.0, freq = 1.0;
    int n = int(floor(detail));
    for (int i = 0; i <= 8; i++) {
      if (i > n) break;
      sum += cnoise(p * freq) * amp; maxamp += amp; amp *= roughness; freq *= 2.0;
    }
    float rmd = detail - floor(detail);
    if (rmd > 0.0) {
      float s2 = sum + cnoise(p * freq) * amp;
      sum = mix(sum / maxamp, s2 / (maxamp + amp), rmd);
    } else sum /= maxamp;
    return 0.5 * sum + 0.5;
  }
`;

export const earthVertex = /* glsl */ `
  varying vec2 vUv; varying vec3 vN; varying vec3 vWPos; varying vec3 vObj; varying vec3 vT; varying vec3 vB;
  void main() {
    vUv = uv;
    vObj = position;                                   // object space (Blender axes, Z = pole)
    vec3 n = normalize(position);
    vec3 t = normalize(cross(vec3(0.0, 0.0, 1.0), n) + vec3(1e-6, 0.0, 0.0)); // +U (east)
    mat3 m = mat3(modelMatrix);
    vN = normalize(m * n); vT = normalize(m * t); vB = normalize(cross(vN, vT)); // +V (north)
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWPos = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`;

export const earthFragment = /* glsl */ `
  uniform sampler2D diffuseMap, illumMap, cloudsMap, normalMap, glossMap;
  uniform vec3 sunDir; uniform float sunE;
  varying vec2 vUv; varying vec3 vN; varying vec3 vWPos; varying vec3 vObj; varying vec3 vT; varying vec3 vB;
  ${noise}
  const float PI = 3.14159265;
  const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
  float lum(vec3 c){ return dot(c, LUMA); }
  float ease(float t){ t = clamp(t, 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
  float rampLin(float x, float a, float b){ return clamp((x - a) / (b - a), 0.0, 1.0); }

  // Blender fresnel_dielectric_cos
  float fresnelDielectric(float c, float eta){
    float g = eta * eta - 1.0 + c * c;
    if (g <= 0.0) return 1.0;
    g = sqrt(g);
    float A = (g - c) / (g + c), B = (c * (g + c) - 1.0) / (c * (g - c) + 1.0);
    return 0.5 * A * A * (1.0 + B * B);
  }
  // Sun lamp with Angle = 180°: a uniform hemisphere light → Lambert irradiance (1 + n·L) / 2.
  // Light has specular factor 0, so every BSDF here is diffuse-only. sunE already folds in the lamp's
  // exposure, diffuse factor and EEVEE's direct-light intensity.
  float irr(vec3 n){ return 0.5 * (1.0 + dot(n, sunDir)); }
  vec3 diffuseLit(vec3 base, vec3 n){ return base * sunE * irr(n) / PI; }
  void main() {
    vec3 N = normalize(vN), V = normalize(cameraPosition - vWPos);
    vec3 gen = vObj * 0.5 + 0.5; // Generated coordinates (object bbox → 0..1)

    // --- land: Principled BSDF ---
    vec3 tex = texture2D(diffuseMap, vUv).rgb;
    float nz1 = blenderNoise(gen * 8.9, 2.7, 0.6);
    vec3 base = mix(tex * rampLin(nz1, 0.2227, 0.4591), vec3(0.2465, 0.4497, 0.8), 0.0318);
    vec3 nm = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
    vec3 Nn = normalize(vT * nm.x + vB * nm.y + N * nm.z);
    vec3 land = diffuseLit(base, Nn);

    // --- city lights: emission masked by the night side ---
    float dayMask = ease(rampLin(2.0 * sunE * irr(N) / PI, 0.0, 0.4)); // Shader to RGB(Diffuse ×2)
    vec3 illum = texture2D(illumMap, vUv).rgb * (1.0 - dayMask);
    float nz2 = blenderNoise(gen * 6.5, 2.0, 0.55);
    vec3 c0 = vec3(0.0566, 0.0174, 0.0), c1 = vec3(2.0, 0.3766, 0.0564), c2 = vec3(0.0, 0.459, 1.0283);
    vec3 cityCol = nz2 < 0.3818 ? c0 : nz2 < 0.5091 ? mix(c0, c1, ease((nz2 - 0.3818) / 0.1273))
                 : nz2 < 0.8364 ? mix(c1, c2, ease((nz2 - 0.5091) / 0.3273)) : c2;
    vec3 s1 = mix(land, cityCol * 3.1, clamp(lum(illum), 0.0, 1.0));

    // --- clouds (mapping: scale Y -1, rotate X -4.8°) + bump from the unmapped cloud map ---
    vec2 cuv = vec2(vUv.x, -vUv.y * cos(0.0838));
    float cloud = texture2D(cloudsMap, cuv).r;
    float hgt = texture2D(cloudsMap, vUv).r;
    vec3 dpx = dFdx(vWPos), dpy = dFdy(vWPos);
    float dhx = dFdx(hgt), dhy = dFdy(hgt);
    vec3 r1 = cross(dpy, N), r2 = cross(N, dpx);
    float det = dot(dpx, r1);
    vec3 grad = sign(det) * (dhx * r1 + dhy * r2) * 0.7;
    vec3 Nb = normalize(mix(N, normalize(abs(det) * N - grad), 0.1167));
    vec3 cloudShade = diffuseLit(vec3(cloud), Nb);
    vec3 s2 = mix(s1, cloudShade, cloud);
    float edge = cloud < 0.3818 ? mix(0.0, 0.5322, rampLin(cloud, 0.3455, 0.3818)) : mix(0.5322, 0.0, rampLin(cloud, 0.3818, 0.4545));
    vec3 s3 = mix(s2, vec3(0.0), edge);

    // --- blue fresnel sheet, blended in where the sun hits ---
    vec3 blueDiff = diffuseLit(vec3(0.5559, 5.2177, 12.8298), N);
    vec3 s4 = mix(blueDiff, vec3(0.5653, 10.1082, 25.3147) * 1.5, 0.175);
    float fr = fresnelDielectric(abs(dot(V, N)), 1.0 / 0.85);
    vec3 s5 = s4 * fr;
    float f2 = clamp(lum(diffuseLit(vec3(0.2919, 0.267, 0.2779), N)), 0.0, 1.0);

    gl_FragColor = vec4(mix(s3, s5, f2), 1.0);
  }`;

/* "Atmosphere" material: Layer Weight(0.25).Facing^2 × ease-ramp(map(N·D, -0.25..0.8)) mixes
   Transparent → Emission(0.2, 0.55, 1) ×3. Backface culling on, blended. D is a fixed world vector. */
export const atmosVertex = /* glsl */ `
  varying vec3 vN; varying vec3 vWPos;
  void main() {
    vN = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0); vWPos = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }`;
export const atmosFragment = /* glsl */ `
  uniform vec3 uDir; varying vec3 vN; varying vec3 vWPos;
  void main() {
    vec3 n = normalize(vN), v = normalize(cameraPosition - vWPos);
    float facing = 1.0 - pow(abs(dot(n, v)), 0.5);     // Layer Weight blend 0.25 → exponent 0.5
    float m = clamp((dot(n, uDir) + 0.25) / 1.05, 0.0, 1.0);
    float r = clamp(m / 0.6, 0.0, 1.0); r = r * r * (3.0 - 2.0 * r); // Color Ramp, Ease, 0 → 0.6
    float fac = facing * facing * r;
    gl_FragColor = vec4(vec3(0.2, 0.55, 1.0) * 3.0, fac);
  }`;

/* Route bars: instanced boxes; per-instance factor along the route drives the GN reveal/grow logic. */
export const routeVertex = /* glsl */ `
  attribute float aFactor;
  uniform float uReveal, uSoft;
  void main() {
    float grow = clamp((uReveal - aFactor) / uSoft, 0.0, 1.0);
    float shrink = clamp(aFactor / uSoft, 0.0, 1.0);                 // Erase is always 0
    float visible = (aFactor > uReveal || uReveal <= 0.0) ? 0.0 : 1.0;
    float s = min(grow, shrink) * visible;
    vec4 w = modelMatrix * instanceMatrix * vec4(position * s, 1.0);
    gl_Position = projectionMatrix * viewMatrix * w;
  }`;
export const emissionFragment = /* glsl */ `
  uniform vec3 uColor; uniform float uFade;
  void main() { gl_FragColor = vec4(uColor, uFade); }`;
export const basicVertex = /* glsl */ `
  void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

/* Limb glow (website addition, modelled on the reference still): a shell drawn over everything that,
   per pixel, measures how far the view ray passes from the planet's limb. A razor-thin rim that blows out
   to white where the limb faces the sun, a cyan halo, and a wide deep-blue haze into the background.
   Values are HDR so the bloom pass spreads the hot spot further. */
export const limbVertex = /* glsl */ `
  varying vec3 vWPos;
  void main() { vec4 w = modelMatrix * vec4(position, 1.0); vWPos = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
export const limbFragment = /* glsl */ `
  uniform vec3 uSun; uniform float uRadius; uniform float uIntensity;
  varying vec3 vWPos;
  void main() {
    vec3 ro = cameraPosition, rd = normalize(vWPos - cameraPosition);
    float t = -dot(ro, rd);
    vec3 p = ro + rd * t;                     // closest approach to the Earth's centre
    float h = length(p) / uRadius;            // 1.0 = exactly on the limb
    vec3 np = normalize(p);
    float a = clamp(dot(np, uSun), 0.0, 1.0); // how much this part of the limb faces the sun
    // sun-facing point of the silhouette; w = how close along the limb we are to it (1 there, 0 on the night side)
    vec3 vc = normalize(ro);
    vec3 sp = normalize(uSun - vc * dot(uSun, vc));
    float w = clamp(dot(np, sp), 0.0, 1.0);
    float hs = length(p - sp * uRadius);
    // falloffs fitted to the reference image's limb profile (x in Earth radii past the edge)
    vec3 col;
    if (h < 1.0) {
      // on the disc: a thin saturated cyan atmosphere band, blowing out to white at the hot spot
      float y = 1.0 - h;
      col  = vec3(0.02, 0.55, 0.85) * exp(-y / 0.008) * (0.15 + 2.2 * pow(w, 2.0));
      col += vec3(0.80, 0.95, 1.00) * exp(-y / 0.0025) * (10.0 * pow(w, 5.0));
      col += vec3(0.45, 0.80, 1.00) * exp(-y / 0.035) * (0.9 * pow(w, 4.0));  // broad shine on the sun-side edge
    } else {
      float x = h - 1.0;
      col  = vec3(0.45, 0.90, 1.00) * exp(-x / 0.0025) * (0.25 + 10.0 * pow(w, 4.0)); // bright edge
      col += vec3(0.00, 0.33, 1.00) * exp(-x / 0.02) * (0.04 + 0.8 * pow(w, 2.0));    // cyan-blue halo
      col += vec3(0.00, 0.10, 0.30) * exp(-x / 0.09) * (0.02 + 0.22 * w);             // haze
      col += vec3(0.01, 0.035, 0.08) * exp(-x / 0.35) * (0.10 * w);                   // faint wide glow
      col += vec3(0.00, 0.25, 0.80) * exp(-hs / 0.25) * 0.06;                          // spill around the hot spot
    }
    col += vec3(0.80, 0.95, 1.00) * exp(-hs / 0.06) * 3.0; // the hot spot, almost white
    gl_FragColor = vec4(col * uIntensity, 1.0);
  }`;

/* Blender "Filmic" (Medium Contrast) sRGB: lg2 allocation → filmic_desat_33.cube → /0.66 → filmic_to_0-70_1-03. */
export const filmicVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
export const filmicFragment = /* glsl */ `
  precision highp sampler3D;
  uniform sampler2D tScene; uniform sampler3D tDesat; uniform sampler2D tCurve; uniform vec3 uBg;
  varying vec2 vUv;
  float curve(float x){ return texture2D(tCurve, vec2(clamp(x, 0.0, 1.0) * (4095.0 / 4096.0) + 0.5 / 4096.0, 0.5)).r; }
  void main() {
    vec3 c = max(texture2D(tScene, vUv).rgb, vec3(0.0));
    vec3 lg = clamp((log2(max(c, vec3(exp2(-12.473931188)))) + 12.473931188) / 25.0, 0.0, 1.0);
    vec3 d = texture(tDesat, lg * (32.0 / 33.0) + 0.5 / 33.0).rgb / 0.66;
    vec3 o = vec3(curve(d.r), curve(d.g), curve(d.b));
    o += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0; // dither
    o = o + uBg * (1.0 - o); // reference background navy, screen-blended under everything
    gl_FragColor = vec4(o, 1.0);
  }`;
