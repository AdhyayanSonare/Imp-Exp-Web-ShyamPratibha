import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/motion";

/** Counts from 0 to `to` the first time it scrolls into view. */
export default function Counter({ to }: { to: number }) {
  const el = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const node = el.current!;
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: node,
      start: "top 92%",
      once: true,
      onEnter: () =>
        gsap.to(o, {
          v: to,
          duration: prefersReducedMotion() ? 0 : 1.8,
          ease: "power3.out",
          onUpdate: () => { node.textContent = Math.round(o.v).toLocaleString("en-US"); },
        }),
    });
  }, { dependencies: [to] });

  return <span ref={el}>0</span>;
}
