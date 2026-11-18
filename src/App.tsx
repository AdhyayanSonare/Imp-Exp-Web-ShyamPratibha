import { useEffect, useRef } from "react";
import { IconSprite } from "./components/Icon";
import HeroStage from "./components/HeroStage";
import { Strip, Tagline } from "./components/Intro";
import About from "./sections/About";
import Products from "./sections/Products";
import Process from "./sections/Process";
import People from "./sections/People";
import Contact, { Footer } from "./sections/Contact";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, scrollToTarget, startSmoothScroll, HEADER_OFFSET } from "./lib/motion";

const STRIP_ID = "strip";

export default function App() {
  const main = useRef<HTMLElement>(null);

  // Smooth scrolling + in-page links that land below the docked header
  useEffect(() => {
    const stop = startSmoothScroll();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      if (hash === "#") return;
      if (hash === "#top") { e.preventDefault(); scrollToTarget(0); return; }
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target, { offset: HEADER_OFFSET });
    };
    document.addEventListener("click", onClick);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      stop();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // Bento tiles rise in as they enter the viewport
  useGSAP(() => {
    const tiles = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    if (prefersReducedMotion()) { gsap.set(tiles, { opacity: 1, y: 0, scale: 1 }); return; }
    ScrollTrigger.batch(tiles, {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
    });
  }, { scope: main });

  return (
    <>
      <IconSprite />
      <HeroStage stripId={STRIP_ID} />
      <main id="top" ref={main}>
        <Strip id={STRIP_ID} />
        <Tagline />
        <About />
        <Products />
        <Process />
        <People />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
