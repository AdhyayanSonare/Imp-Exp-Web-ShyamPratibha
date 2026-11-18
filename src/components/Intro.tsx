import { useRef } from "react";
import { Icon } from "./Icon";
import { gsap, useGSAP } from "../lib/motion";
import { TAGLINE } from "../data/content";

/* Category strip (where the reference shows trusted-by logos) + scroll-inked tagline (frame 3). */

export function Strip({ id }: { id: string }) {
  return (
    <section className="strip" id={id} aria-label="Export categories">
      <p className="strip-label">150+ export lines across nine catalogues</p>
      <div className="marquee">
        <div className="marquee-track">
          <span className="wm wm-a"><Icon name="leaf" />Spices</span>
          <span className="wm wm-b">Basmati&nbsp;&amp;&nbsp;Grains</span>
          <span className="wm wm-c">makhana</span>
          <span className="wm wm-d"><Icon name="star" />Nuts &amp; Seeds</span>
          <span className="wm wm-e">PULSES</span>
          <span className="wm wm-b">Frozen&nbsp;Veg</span>
          <span className="wm wm-c">cocopeat</span>
          <span className="wm wm-a"><Icon name="shield" />Pharma</span>
          <span className="wm wm-e">TEXTILES</span>
        </div>
      </div>
    </section>
  );
}

export function Tagline() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = TAGLINE.split(/\s+/);

  useGSAP(() => {
    const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1c1b18";
    gsap.to(ref.current!.querySelectorAll(".w"), {
      color: ink,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top 82%", end: "bottom 48%", scrub: true },
    });
  }, { scope: ref });

  return (
    <section className="tagline">
      <p className="reveal-words" ref={ref} aria-label={TAGLINE}>
        {words.map((w, i) => (
          <span key={i} aria-hidden="true">
            <span className="w">{w}</span>{i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
