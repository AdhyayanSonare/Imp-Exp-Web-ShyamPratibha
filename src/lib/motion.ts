import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────── Smooth scroll: one Lenis instance driving ScrollTrigger ───────── */

let lenis: Lenis | null = null;

export function startSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {};
  const instance = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => instance.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

type ScrollTarget = number | string | HTMLElement;

export function scrollToTarget(target: ScrollTarget, opts: { offset?: number; onComplete?: () => void } = {}): void {
  if (lenis) {
    lenis.scrollTo(target, {
      offset: opts.offset ?? 0,
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      onComplete: opts.onComplete,
    });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  const y = typeof el === "number" ? el : el ? el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0) : 0;
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  if (opts.onComplete) window.setTimeout(opts.onComplete, 700);
}

/** Height of the docked header (pill + compact quote bar) that in-page links must clear. */
export const HEADER_OFFSET = -170;
