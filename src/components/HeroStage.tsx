import { useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "./Icon";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, scrollToTarget } from "../lib/motion";
import { CONTACT, NAV_LINKS, QUOTE_CATEGORIES, QUOTE_QUANTITIES, img } from "../data/content";

/* Hero stage: fixed layer whose timeline is scrubbed by scroll.
   Frame 1 → full-width card, one-line headline, full quote bar on the card edge.
   Frame 2 → card insets, headline stacks, bar narrows to icons.
   Frame 3 → card becomes the pill behind the nav links, icon bar docks below it (sticky header). */

interface Point { x: number; y: number }
interface HeadlinePose { l1: Point; l2: Point; s: number }
interface Geometry {
  clipA: string; clipC: string;
  hA: number; hC: number; wA: number; wB: number; wC: number;
  yA: number; yB: number; yC: number;
  A: HeadlinePose; B: HeadlinePose;
  dist: number;
}

interface Props { stripId: string }

export default function HeroStage({ stripId }: Props) {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const navLinks = useRef<HTMLElement>(null);
  const brand = useRef<HTMLAnchorElement>(null);
  const navRight = useRef<HTMLDivElement>(null);
  const navCta = useRef<HTMLAnchorElement>(null);
  const bar = useRef<HTMLFormElement>(null);
  const topFade = useRef<HTMLDivElement>(null);
  const compactRef = useRef(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [quote, setQuote] = useState({
    category: QUOTE_CATEGORIES[0],
    product: "",
    quantity: QUOTE_QUANTITIES[0],
    destination: "",
  });

  useGSAP(
    () => {
      const els = {
        card: card.current!, media: media.current!, l1: line1.current!, l2: line2.current!,
        navLinks: navLinks.current!, brand: brand.current!, navRight: navRight.current!, navCta: navCta.current!,
        bar: bar.current!, topFade: topFade.current!,
      };
      const strip = document.getElementById(stripId);
      const root = document.documentElement;
      const reduced = prefersReducedMotion();
      const G = {} as Geometry;

      const computeGeom = () => {
        const W = window.innerWidth, H = window.innerHeight;
        const mobile = W <= 820;
        const g = mobile ? 10 : 16;
        const cardH = Math.round(Math.max(H * (mobile ? 0.64 : 0.62), mobile ? 440 : 460));
        root.style.setProperty("--cardH", `${cardH}px`);
        const cardW = W - 2 * g;
        const navH = 84;
        const pillH = mobile ? 76 : 84;

        // Final pill hugs the centre links on desktop, spans the nav bar on mobile
        let pillL = g, pillR = W - g;
        if (!mobile) {
          const r = els.navLinks.getBoundingClientRect();
          const pad = Math.min(120, Math.max(48, W * 0.06));
          pillL = r.left - pad;
          pillR = r.right + pad;
        }

        const hA = parseFloat(getComputedStyle(root).getPropertyValue("--barH")) || (mobile ? 74 : 104);
        const cardBottom = (p: number) => g + cardH - p * (cardH - pillH);

        const fs = parseFloat(getComputedStyle(els.l1).fontSize);
        const w1 = els.l1.offsetWidth, w2 = els.l2.offsetWidth, lh = els.l1.offsetHeight;
        const cx = cardW / 2;
        const total = w1 + fs * 0.26 + w2;
        let A: HeadlinePose;
        if (total <= cardW * 0.88) {
          const cy = cardH * 0.46;
          A = { l1: { x: cx - total / 2 + w1 / 2, y: cy }, l2: { x: cx + total / 2 - w2 / 2, y: cy }, s: 1 };
        } else {
          const cy = cardH * 0.44;
          A = { l1: { x: cx, y: cy - lh * 0.52 }, l2: { x: cx, y: cy + lh * 0.52 }, s: 1 };
        }
        const sB = mobile ? 0.82 : 0.86;
        const cardHB = cardH - 0.5 * (cardH - pillH);
        const midB = navH + (cardHB - hA / 2 - navH) * (mobile ? 0.45 : 0.4);
        const B: HeadlinePose = { l1: { x: cx, y: midB - lh * sB * 0.5 }, l2: { x: cx, y: midB + lh * sB * 0.5 }, s: sB };

        // Scroll distance: the strip travels from rest to ~30% of the viewport (frame 3)
        const stripTop = strip ? strip.getBoundingClientRect().top + window.scrollY : H;

        Object.assign(G, {
          clipA: "inset(0px 0px 0px 0px round 30px)",
          clipC: `inset(0px ${W - g - pillR}px ${cardH - pillH}px ${pillL - g}px round 24px)`,
          hA,
          hC: mobile ? 58 : 66,
          wA: mobile ? W - 40 : Math.min(W * 0.77, 1400),
          wB: mobile ? Math.min(W - 80, 300) : Math.min(Math.max(W * 0.35, 560), 660),
          wC: mobile ? Math.min(W - 80, 260) : Math.min(Math.max(W * 0.33, 520), 600),
          yA: cardBottom(0) - hA / 2,
          yB: cardBottom(0.5) - hA / 2,
          yC: cardBottom(1) + (mobile ? 8 : 4),
          A, B,
          dist: Math.max(260, stripTop - H * 0.3),
        } satisfies Geometry);
      };

      computeGeom();
      ScrollTrigger.addEventListener("refreshInit", computeGeom);

      gsap.set([els.l1, els.l2], { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
      gsap.set(els.bar, { xPercent: -50, x: 0 });

      const ink = getComputedStyle(root).getPropertyValue("--ink").trim() || "#1c1b18";
      const barTexts = els.bar.querySelectorAll(".qb-text, .qb-chev");
      const barIcons = els.bar.querySelectorAll(".qb-icon");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: () => `+=${G.dist}`,
          scrub: reduced ? true : 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const compact = self.progress > 0.28;
            if (compact !== compactRef.current) {
              compactRef.current = compact;
              els.bar.classList.toggle("is-compact", compact);
            }
          },
        },
      });

      // Card: linear inset so the edges move in lockstep with scroll
      tl.fromTo(els.card, { clipPath: () => G.clipA }, { clipPath: () => G.clipC, duration: 1 }, 0);
      tl.fromTo(els.media, { scale: 1.14 }, { scale: 1, duration: 1 }, 0);

      // Headline: x and y use different curves so the lines separate vertically before sliding together
      ([[els.l1, "l1"], [els.l2, "l2"]] as const).forEach(([el, k]) => {
        tl.fromTo(el, { x: () => G.A[k].x }, { x: () => G.B[k].x, duration: 0.5, ease: "power2.inOut" }, 0);
        tl.fromTo(el,
          { y: () => G.A[k].y, scale: () => G.A.s, opacity: 1 },
          { y: () => G.B[k].y, scale: () => G.B.s, duration: 0.5, ease: "expo.out" }, 0);
        tl.to(el, { y: () => G.B[k].y - 46, scale: () => G.B.s * 0.86, opacity: 0, duration: 0.3, ease: "power1.in" }, 0.55);
      });

      // Quote bar: rides the card edge, narrows to icons, then docks under the pill
      tl.fromTo(els.bar, { y: () => G.yA }, { y: () => G.yB, duration: 0.5 }, 0);
      tl.to(els.bar, { y: () => G.yC, duration: 0.5, ease: "power1.inOut" }, 0.5);
      tl.fromTo(els.bar, { width: () => G.wA, height: () => G.hA }, { width: () => G.wB, duration: 0.5, ease: "power2.inOut" }, 0);
      tl.to(els.bar, { width: () => G.wC, height: () => G.hC, padding: "6px 6px 6px 8px", duration: 0.5, ease: "power2.inOut" }, 0.5);
      tl.to(barTexts, { opacity: 0, duration: 0.18 }, 0.06);
      tl.to(barIcons, { opacity: 1, duration: 0.16 }, 0.3);

      // Nav chrome turns dark once the card pulls away (desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", () => {
        tl.to([els.brand, els.navRight], { color: ink, duration: 0.16 }, 0.2);
        tl.to(els.navCta, { borderColor: "rgba(28,27,24,.16)", duration: 0.16 }, 0.2);
      });
      tl.to(els.topFade, { opacity: 1, duration: 0.2 }, 0.8);

      // Headline widths depend on web fonts
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", computeGeom);
        mm.revert();
      };
    },
    { scope: stage },
  );

  // Compact bar: tapping it scrolls back up and focuses the matching field
  const onBarClickCapture = (e: MouseEvent<HTMLFormElement>) => {
    if (!compactRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const field = (e.target as HTMLElement).closest(".qb-field");
    scrollToTarget(0, {
      onComplete: () => field?.querySelector<HTMLElement>("input, select")?.focus({ preventScroll: true }),
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (compactRef.current) return;
    const product = quote.product.trim() || "(to be specified)";
    const destination = quote.destination.trim() || "(to be specified)";
    const body = [
      "Hello Pratibhashyam Exports,", "",
      "I'd like a quotation for:",
      `Category: ${quote.category}`,
      `Product: ${product}`,
      `Quantity: ${quote.quantity}`,
      `Destination: ${destination}`, "",
      "Thank you.",
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Quote request: ${product}`)}&body=${encodeURIComponent(body)}`;
  };

  const set = (k: keyof typeof quote) => (e: { target: { value: string } }) => setQuote((q) => ({ ...q, [k]: e.target.value }));

  return (
    <>
      <div className="stage" ref={stage}>
        <div className="hero-card" ref={card}>
          <div className="hero-media" ref={media}>
            <img src={img("hero-port-sunset.jpg")} alt="" />
          </div>
          <div className="hero-shade" />
          <h1 className="hero-title" aria-label="Rooted in India. Trusted worldwide.">
            <span className="ht-line" ref={line1} aria-hidden="true">Rooted in India.</span>
            <span className="ht-line" ref={line2} aria-hidden="true">Trusted worldwide.</span>
          </h1>
        </div>

        <header className="nav">
          <a className="brand" href="#top" ref={brand} aria-label="Pratibhashyam Exports — home">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-word">Pratibhashyam</span>
          </a>
          <nav className="nav-links" ref={navLinks} aria-label="Primary">
            {NAV_LINKS.map((l) => <Link key={l.href} to={l.href}>{l.label}</Link>)}
          </nav>
          <div className="nav-right" ref={navRight}>
            <a className="nav-phone" href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <Link className="nav-cta" to="/contact" ref={navCta}>Get a quote</Link>
            <button
              className="nav-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </header>

        <form className="quote-bar" ref={bar} aria-label="Quick quote request" onSubmit={onSubmit} onClickCapture={onBarClickCapture}>
          <QuoteField field="category" icon="layers" label="Category" chevron>
            <select name="category" value={quote.category} onChange={set("category")}>
              {QUOTE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </QuoteField>
          <span className="qb-sep" />
          <QuoteField field="product" icon="package" label="Product">
            <input name="product" type="text" placeholder="1121 Basmati Rice" autoComplete="off" value={quote.product} onChange={set("product")} />
          </QuoteField>
          <span className="qb-sep" />
          <QuoteField field="quantity" icon="container" label="Quantity" chevron>
            <select name="quantity" value={quote.quantity} onChange={set("quantity")}>
              {QUOTE_QUANTITIES.map((q) => <option key={q}>{q}</option>)}
            </select>
          </QuoteField>
          <span className="qb-sep" />
          <QuoteField field="destination" icon="pin" label="Destination">
            <input name="destination" type="text" placeholder="Port or country" autoComplete="off" value={quote.destination} onChange={set("destination")} />
          </QuoteField>
          <button className="qb-go" type="submit" aria-label="Request a quote">
            <Icon name="arrow" />
          </button>
        </form>

        <div className="top-fade" ref={topFade} aria-hidden="true" />
      </div>

      {menuOpen && (
        <div className="sheet" onClick={(e) => (e.target as HTMLElement).closest("a") && setMenuOpen(false)}>
          {NAV_LINKS.map((l) => <Link key={l.href} to={l.href}>{l.label}</Link>)}
        </div>
      )}
    </>
  );
}

function QuoteField({ field, icon, label, chevron, children }: {
  field: string; icon: IconName; label: string; chevron?: boolean; children: ReactNode;
}) {
  return (
    <label className="qb-field" data-field={field}>
      <span className="qb-icon"><Icon name={icon} /></span>
      <span className="qb-text">
        <span className="qb-label">{label}</span>
        {children}
      </span>
      {chevron && <Icon name="chev" className="qb-chev" />}
    </label>
  );
}
