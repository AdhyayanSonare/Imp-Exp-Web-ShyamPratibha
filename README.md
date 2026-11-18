# Pratibhashyam Exports — website (React + TypeScript)

Vite · React 18 · TypeScript · GSAP ScrollTrigger · Lenis smooth scroll.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
```

## Structure

```
src/
  main.tsx              entry
  App.tsx               page composition, smooth scroll, in-page links, tile reveals
  styles.css            design tokens + all styles
  lib/motion.ts         GSAP/ScrollTrigger registration, Lenis, scrollToTarget()
  data/content.ts       all copy, product data, contact details (from the content audit)
  components/
    HeroStage.tsx       scroll-scrubbed hero → header collapse + quote bar
    Intro.tsx           category marquee + scroll-inked tagline
    Counter.tsx, BlockHead.tsx, Icon.tsx
  sections/             bento sections: About, Products, Process, People, Contact (+ Footer)
public/
  img/                  photography (company photos + Wikimedia Commons, see CREDITS.md)
  CREDITS.md            required attribution for CC-licensed photos
```

## Before launch

Stats, director photo mapping and photo captions are flagged in `src/data/content.ts`
and `src/sections/About.tsx` (`data-verify`) — confirm them with the company (see the content audit).
