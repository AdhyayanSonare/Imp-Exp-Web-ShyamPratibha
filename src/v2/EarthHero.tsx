import { useEffect, useRef } from "react";
import { COMPANY } from "./content";
import { Header } from "./ui";
import { prefersReducedMotion } from "../lib/motion";
import { createEarthScene } from "./earth/EarthScene";

/* Real-time Earth from EARTH_TradeRoutes.blend, seen through the "hero page carema angle" camera.
   Fixed framing; the Earth spins and the routes draw/fade exactly on the Blender timeline. */
export default function EarthHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ?frame=1122 freezes the scene on a Blender frame (handy for side-by-side checks against the .blend)
    const frameParam = Number(new URLSearchParams(window.location.search).get("frame")) || undefined;
    // A fresh canvas per mount: a canvas whose context was released can't get a new one.
    const canvas = document.createElement("canvas");
    canvas.className = "v2-earth-canvas";
    canvas.setAttribute("aria-hidden", "true");
    stageRef.current!.appendChild(canvas);
    let earth: ReturnType<typeof createEarthScene>;
    try {
      earth = createEarthScene(canvas, { animate: !prefersReducedMotion(), frame: frameParam });
    } catch (err) {
      console.error("Earth hero disabled:", err);
      canvas.remove(); // no WebGL: the hero keeps its dark background and copy
      return;
    }
    const onResize = () => earth.resize();
    window.addEventListener("resize", onResize);
    // Only render while the hero is on screen.
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? earth.start() : earth.stop()));
    io.observe(sectionRef.current!);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      earth.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <section className="v2-earth" id="hero" ref={sectionRef} aria-label={COMPANY.shortName}>
      <div ref={stageRef} className="v2-earth-stage" />
      <div className="v2-earth-nav"><Header /></div>
      <div className="v2-earth-copy">
        <h1>{COMPANY.shortName}</h1>
        <p>From Indian farms to ports across the world.</p>
      </div>
    </section>
  );
}
