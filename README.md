# Pratibhashyam Exports — website (React + TypeScript)

Vite · React 18 · TypeScript · GSAP ScrollTrigger · Lenis smooth scroll.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build
npm run docs:content-map   # regenerate docs/page-content-map.md from the page data
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

## Subpages

`/` is the homepage (`src/App.tsx`, untouched). Every other route is a lazily loaded subpage in `src/site/`:

```
src/site/
  routes.tsx                   16 pages + redirects from the old WordPress URLs + 404
  site.css                     subpage styles, all scoped under .sp
  data/catalogue.ts            category copy, groups, feature modules
  data/products.generated.ts   all 178 product entries scraped from the live site
  data/pages.ts                About, Products, Agriculture, EXIM, Gallery, Contact copy
  data/worldMask.generated.ts  dotted world map (Natural Earth 110m)
  components/                  Layout (header, mega menu, footer), ui, Catalogue, SiteIcon
  pages/                       About, Products, Agriculture, CategoryPage, Exim, Gallery, Contact, NotFound
docs/
  source-content-inventory.md  everything on the original site, by URL
  page-content-map.md          what goes where, plus the copy used (generated)
  client-content-needed.md     open questions for the client
```

Production hosting needs a single-page-app fallback (serve `index.html` for every path).

## Before launch

Stats, director photo mapping and photo captions are flagged in `src/data/content.ts`
and `src/sections/About.tsx` (`data-verify`) — confirm them with the company (see the content audit).
