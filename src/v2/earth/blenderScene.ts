/* Data read from Earth/EARTH_TradeRoutes.blend + Earth/earth_routes_build.py (Blender space, Z-up).
   Everything here is in Blender units/axes; EarthScene puts it under a root rotated -90° about X. */

export const FPS = 24;
export const TOTAL_FRAMES = 1344; // scene frame_end; rotation is one full turn over 1..1345

/* Camera "hero page carema angle" */
export const HERO_CAMERA = {
  location: [-2.331918954849243, 3.7396881580352783, -0.27527427673339844] as const,
  quaternion: { w: 0.215022012591362, x: 0.27066895365715027, y: -0.7260885238647461, z: -0.5943899154663086 },
  lens: 43.1,
  sensor: 36,
};

/* Sun lamp "Light": strength 10, Angle 180° (hemisphere), exposure -1.9847, diffuse factor 0.4046, specular factor 0.
   EEVEE scene: direct light intensity 3. Direction *towards* the light. */
export const SUN = {
  toLight: [0.9256454706192017, -0.0660419762134552, 0.37258416414260864] as const,
  strength: 10, exposure: -1.9847326278686523, diffuseFactor: 0.40458017587661743, eeveeDirectIntensity: 3,
};
export const sunDiffuseIrradiance = () => SUN.strength * 2 ** SUN.exposure * SUN.diffuseFactor * SUN.eeveeDirectIntensity;

/* "Atmosphere" object (parented to Earth). direction = the fixed vector in its Vector Math (dot) node. */
export const ATMOSPHERE = { radius: 1.012, direction: [0.6684, 0.1121, 0.7353] as const };

/* ---- route builder (mirrors earth_routes_build.py) ---- */
export const TIMING = { draw: 5.5, hold: 1.5, fade: 2.5, pause: 4.5 };
export const CYCLE = Math.round((TIMING.draw + TIMING.hold + TIMING.fade + TIMING.pause) * FPS); // 336
export const EARTH_RADIUS = 1.0;
export const SURFACE_OFFSET = 0.012;
export const SEGMENT = { spacing: 0.026, length: 0.015, width: 0.005, height: 0.0025, growSoftness: 0.03 };
export const CYAN = [0.5, 0.75, 1.0] as const;
export const ROUTE_GLOW = 1.5;
export const MARKER_GLOW = 1.5;
export const MARKER_POP_FRAMES = 8;
export const MARKER_RADIUS = 0.0075;

export const CITIES: Record<string, [number, number]> = {
  Mumbai: [19.0760, 72.8777],
  London: [51.5072, -0.1276],
  Singapore: [1.3521, 103.8198],
  Dubai: [25.2048, 55.2708],
  NewYork: [40.7128, -74.0060],
  Tokyo: [35.6762, 139.6503],
  Shanghai: [31.2304, 121.4737],
  Rotterdam: [51.9244, 4.4777],
  Santos: [-23.9608, -46.3336],
  Durban: [-29.8587, 31.0218],
  Chennai: [13.0827, 80.2707],
  Kolkata: [22.5726, 88.3639],
  Mundra: [22.8390, 69.7210],
  Hamburg: [53.5511, 9.9937],
  Jeddah: [21.4858, 39.1925],
  HongKong: [22.3193, 114.1694],
  Colombo: [6.9271, 79.8612],
  Lagos: [6.5244, 3.3792],
  LosAngeles: [34.0522, -118.2437],
  Sydney: [-33.8688, 151.2093],
  Busan: [35.1796, 129.0756],
  Mombasa: [-4.0435, 39.6682],
  CapeTown: [-33.9249, 18.4241],
  Vancouver: [49.2827, -123.1207],
  Panama: [9.3547, -79.9015],
  Melbourne: [-37.8136, 144.9631],
  Antwerp: [51.2194, 4.4025],
  Jakarta: [-6.2088, 106.8456],
  Houston: [29.7604, -95.3698],
};

/* (from, to, start offset s[, per-route draw/hold/fade s]) */
export type RouteTiming = { draw: number; hold: number; fade: number };
export const ROUTES: [string, string, number, RouteTiming?][] = [
  ["Mumbai", "London", 0.0],
  ["Singapore", "Tokyo", 2.3],
  ["Dubai", "Singapore", 4.1],
  ["London", "NewYork", 6.4],
  ["Shanghai", "Singapore", 8.2],
  ["Rotterdam", "Santos", 10.0],
  ["Durban", "Mumbai", 12.1],
  ["Mundra", "Hamburg", 1.1, { draw: 6.5, hold: 1.5, fade: 2.5 }],
  ["Chennai", "Sydney", 3.2, { draw: 6.0, hold: 2.0, fade: 2.0 }],
  ["Kolkata", "HongKong", 5.3, { draw: 4.5, hold: 1.0, fade: 2.0 }],
  ["Colombo", "Jeddah", 7.4, { draw: 5.0, hold: 1.5, fade: 3.0 }],
  ["Mumbai", "Mombasa", 9.1, { draw: 4.5, hold: 2.0, fade: 2.5 }],
  ["HongKong", "LosAngeles", 11.0, { draw: 7.0, hold: 1.5, fade: 2.5 }],
  ["Lagos", "Antwerp", 13.2, { draw: 5.5, hold: 1.0, fade: 2.0 }],
  ["Busan", "Vancouver", 0.6, { draw: 6.5, hold: 2.0, fade: 2.0 }],
  ["Houston", "Rotterdam", 2.9, { draw: 6.0, hold: 1.5, fade: 3.0 }],
  ["CapeTown", "Santos", 4.8, { draw: 5.5, hold: 2.0, fade: 2.0 }],
  ["Jakarta", "Melbourne", 6.9, { draw: 4.5, hold: 1.5, fade: 2.5 }],
  ["Panama", "Shanghai", 8.7, { draw: 7.0, hold: 1.0, fade: 2.5 }],
  ["Chennai", "Singapore", 10.6, { draw: 4.0, hold: 1.5, fade: 2.0 }],
  ["Jeddah", "Rotterdam", 12.6, { draw: 5.5, hold: 2.0, fade: 2.5 }],
];

const smooth = (x: number) => {
  x = Math.max(0, Math.min(1, x));
  return x * x * (3 - 2 * x);
};
const mod = (a: number, n: number) => ((a % n) + n) % n;

/** (reveal, fade, dotScale) at a (fractional) Blender frame, exactly as _route_state() bakes it. */
export function routeState(frame: number, offsetS: number, timing: RouteTiming = TIMING): [number, number, number] {
  const d = timing.draw * FPS, h = timing.hold * FPS, fd = timing.fade * FPS;
  const tl = mod(frame - 1 - offsetS * FPS, CYCLE);
  if (tl > d + h + fd) return [0, 1, 0];
  const reveal = tl < d ? smooth(tl / d) : 1;
  const fade = tl > d + h ? 1 - smooth((tl - d - h) / fd) : 1;
  const dot = tl >= d ? smooth((tl - d) / MARKER_POP_FRAMES) : 0;
  return [reveal, fade, dot];
}
