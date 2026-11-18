/* Frame-sequence player for the hero: preloads JPG frames and paints them onto a canvas
   with object-fit: cover. Fractional frame positions cross-fade the two neighbouring
   frames, so slow scrolling still looks continuous instead of stepping. */

export const FRAME_COUNT = 300;
const DIR = `${import.meta.env.BASE_URL}${encodeURIComponent("hero scroll trigger imgs")}/`;
export const frameSrc = (i: number) => `${DIR}ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;

export interface FramePlayer {
  setPosition(pos: number): void;
  resize(): void;
  destroy(): void;
}

export function createFramePlayer(canvas: HTMLCanvasElement): FramePlayer {
  const ctx = canvas.getContext("2d", { alpha: false })!;
  const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
  let pos = 0;
  let drawn = -1;
  let raf = 0;
  let dead = false;

  // Nearest loaded frame at or before i (falls forward if nothing earlier is ready yet)
  const nearest = (i: number): HTMLImageElement | null => {
    for (let k = i; k >= 0; k--) if (frames[k]) return frames[k];
    for (let k = i + 1; k < FRAME_COUNT; k++) if (frames[k]) return frames[k];
    return null;
  };

  const cover = (im: HTMLImageElement) => {
    const cw = canvas.width, ch = canvas.height;
    const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
    const w = im.naturalWidth * s, h = im.naturalHeight * s;
    ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  const draw = () => {
    raf = 0;
    if (dead) return;
    const i = Math.floor(pos);
    const t = pos - i;
    const a = nearest(i);
    if (!a) return;
    ctx.globalAlpha = 1;
    cover(a);
    const b = i + 1 < FRAME_COUNT ? frames[i + 1] : null;
    if (b && t > 0.001) { ctx.globalAlpha = t; cover(b); ctx.globalAlpha = 1; }
    drawn = pos;
  };
  const request = () => { if (!raf) raf = requestAnimationFrame(draw); };

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // getBoundingClientRect includes the media scale transform; that only oversamples slightly
    const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    drawn = -1;
    request();
  };

  // Load frame 1 first, then the rest in order with a few in flight at once
  const load = (i: number) => new Promise<void>((done) => {
    const im = new Image();
    im.decoding = "async";
    im.onload = () => {
      const ready = im.decode ? im.decode().catch(() => {}) : Promise.resolve();
      ready.then(() => {
        if (dead) return done();
        frames[i] = im;
        if (Math.abs(i - pos) < 2 || drawn === -1) request();
        done();
      });
    };
    im.onerror = () => done();
    im.src = frameSrc(i);
  });
  let next = 1;
  const worker = async () => { while (!dead && next < FRAME_COUNT) await load(next++); };
  load(0).then(() => { for (let k = 0; k < 6; k++) worker(); });

  resize();
  return {
    setPosition(p) {
      pos = Math.min(FRAME_COUNT - 1, Math.max(0, p));
      if (pos !== drawn) request();
    },
    resize,
    destroy() { dead = true; if (raf) cancelAnimationFrame(raf); },
  };
}
