import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SIcon, type SiteIconName } from "./SiteIcon";
import { COMPANY } from "../data/pages";

/* ───────── page meta ───────── */

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | ${COMPANY.shortName}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = description;
  }, [title, description]);
}

/* ───────── reveal on scroll (IntersectionObserver; no-op under reduced motion) ───────── */

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-r]:not(.in)"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });
  return ref;
}

/** Wraps a page so every [data-r] element inside it reveals on scroll. */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`sp-page ${className ?? ""}`}>{children}</div>;
}

/* ───────── breadcrumbs ───────── */

export interface Crumb { label: string; to?: string }

export function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav className={`sp-crumbs${light ? " is-light" : ""}`} aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map((c, i) => (
          <li key={c.label}>
            <SIcon name="chev-r" />
            {c.to && i < items.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ───────── heroes ───────── */

interface HeroProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  text?: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
}

/** Full-width image card, the homepage hero's language at page scale. */
export function HeroCard({ crumbs, eyebrow, title, text, image, imageAlt = "", children }: HeroProps) {
  return (
    <section className="sp-hero-card">
      <img src={image} alt={imageAlt} className="sp-hero-card-img" />
      <div className="sp-hero-card-shade" />
      <div className="sp-hero-card-top"><Breadcrumbs items={crumbs} light /></div>
      <div className="sp-hero-card-body">
        <div>
          {eyebrow && <p className="sp-eyebrow sp-eyebrow-light">{eyebrow}</p>}
          <h1>{title}</h1>
        </div>
        {(text || children) && (
          <div className="sp-hero-card-aside">
            {text && <p>{text}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** Text left, image right with a curved inner edge (editorial slide composition). */
export function HeroSplit({ crumbs, eyebrow, title, text, image, imageAlt = "", children }: HeroProps) {
  return (
    <section className="sp-hero-split">
      <div className="sp-hero-split-copy">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="sp-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {text && <p className="sp-lede">{text}</p>}
        {children}
      </div>
      <div className="sp-hero-split-media">
        <img src={image} alt={imageAlt} />
      </div>
    </section>
  );
}

/* ───────── section header ───────── */

export function SectionHead({ eyebrow, title, text, align = "split" }: { eyebrow?: string; title: ReactNode; text?: ReactNode; align?: "split" | "center" | "left" }) {
  return (
    <header className={`sp-head sp-head-${align}`} data-r>
      <div>
        {eyebrow && <p className="sp-eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {text && <p className="sp-head-text">{text}</p>}
    </header>
  );
}

/* ───────── misc ───────── */

export function IconBadge({ name }: { name: SiteIconName }) {
  return <span className="sp-ico"><SIcon name={name} /></span>;
}

export function Accordion({ items, numbered }: { items: { q: string; a: ReactNode }[]; numbered?: boolean }) {
  return (
    <div className="sp-acc">
      {items.map((it, i) => (
        <details key={it.q} data-r>
          <summary>
            {numbered && <span className="sp-acc-n">{String(i + 1).padStart(2, "0")}</span>}
            <span className="sp-acc-q">{it.q}</span>
            <span className="sp-acc-icon"><SIcon name="plus" /></span>
          </summary>
          <div className="sp-acc-a">{typeof it.a === "string" ? <p>{it.a}</p> : it.a}</div>
        </details>
      ))}
    </div>
  );
}

export function enquiryMailto(subject: string, lines: string[] = []): string {
  const body = ["Hello Pratibhashyam Exports,", "", ...lines, "", "Thank you."].join("\n");
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
