import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SIcon, SiteIconSprite } from "../site/components/SiteIcon";
import { LAND_MASK, MASK_COLS, MASK_LAT0, MASK_ROWS, MASK_STEP } from "../site/data/worldMask.generated";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/motion";
import { COMPANY, QUOTE } from "./content";
import "./v2.css";

export { SIcon };

export const NAV = [
  { to: "/about-us", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/exim-training", label: "EXIM Training" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

/** Shell for every V2 subpage. The homepage brings its own hero (and header) from the Earth section. */
export function SiteLayout() {
  return (
    <div className="v2">
      <SiteIconSprite />
      <Header />
      <main id="main"><Outlet /></main>
      <Footer />
    </div>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <header className="v2-header">
      <Link to="/" className="v2-brand" aria-label={`${COMPANY.shortName}, home`}>
        <span className="v2-mark" aria-hidden="true" />
        <span>Pratibhashyam</span>
      </Link>
      <nav className={`v2-nav${open ? " is-open" : ""}`} aria-label="Primary" id="v2-nav">
        {NAV.map((n) => <NavLink key={n.to} to={n.to}>{n.label}</NavLink>)}
      </nav>
      <Link to="/contact#quote" className="v2-btn v2-btn-ice v2-header-cta">Get a quote</Link>
      <button className="v2-menu" aria-expanded={open} aria-controls="v2-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
        <SIcon name={open ? "x" : "menu"} />
      </button>
    </header>
  );
}

/* shortcut: interim footer, replace when the footer inspiration arrives. */
export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-top">
        <div>
          <p className="v2-footer-name">{COMPANY.legalName}</p>
          <address>{COMPANY.address}</address>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => <Link key={n.to} to={n.to}>{n.label}</Link>)}
        </nav>
        <div className="v2-footer-contact">
          <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
      </div>
      <p className="v2-footer-legal">© {new Date().getFullYear()} {COMPANY.legalName}. Nagpur, India.</p>
    </footer>
  );
}

/** Renders `*words*` in a heading in the icy accent colour (keeps headings editable as plain strings). */
export const Hl = ({ t }: { t: string }) => <>{t.split("*").map((part, i) => (i % 2 ? <em key={i} className="v2-hl">{part}</em> : part))}</>;

/** Title band for subpages: the horizon light from the design references. */
export function PageHero({ title, text, children }: { title: string; text?: string; children?: ReactNode }) {
  return (
    <section className="v2-pagehero">
      <h1><Hl t={title} /></h1>
      {text && <p>{text}</p>}
      {children}
    </section>
  );
}

/** Fades `[data-reveal]` children up as they enter. Content stays visible without JS or with reduced motion. */
export function useReveal() {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(els, { opacity: 0, y: 28, filter: "blur(6px)" });
    ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.07, overwrite: true }),
    });
  }, { scope });
  return scope;
}

/* ───────── Quote form: no backend yet, so it hands off to WhatsApp (or email). ───────── */

const EMPTY = { first: "", last: "", phone: "", email: "", country: "", product: "", spec: "" };

export function QuoteForm({ id }: { id?: string }) {
  const [f, setF] = useState(EMPTY);
  const [sent, setSent] = useState<"" | "whatsapp" | "email">("");
  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  const message = () => [
    `Quote request: ${f.product}`,
    `Name: ${f.first} ${f.last}`,
    `Mobile: ${f.phone}`,
    `Email: ${f.email}`,
    `Country: ${f.country}`,
    f.spec && `Specification: ${f.spec}`,
  ].filter(Boolean).join("\n");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const viaEmail = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "email";
    if (viaEmail) {
      window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Quote request: ${f.product}`)}&body=${encodeURIComponent(message())}`;
    } else {
      window.open(`https://wa.me/${QUOTE.whatsapp}?text=${encodeURIComponent(message())}`, "_blank", "noopener");
    }
    setSent(viaEmail ? "email" : "whatsapp");
  };

  return (
    <form className="v2-form" id={id} onSubmit={submit}>
      <div className="v2-form-row">
        <Field label="First name"><input required value={f.first} onChange={set("first")} autoComplete="given-name" /></Field>
        <Field label="Last name"><input required value={f.last} onChange={set("last")} autoComplete="family-name" /></Field>
      </div>
      <div className="v2-form-row">
        <Field label="Mobile number"><input required type="tel" inputMode="tel" pattern="[+0-9 ()-]{7,}" value={f.phone} onChange={set("phone")} autoComplete="tel" placeholder="+971 50 123 4567" /></Field>
        <Field label="Business email"><input required type="email" value={f.email} onChange={set("email")} autoComplete="email" placeholder="you@company.com" /></Field>
      </div>
      <div className="v2-form-row">
        <Field label="Country"><input required value={f.country} onChange={set("country")} autoComplete="country-name" /></Field>
        <Field label="Product">
          <select required value={f.product} onChange={set("product")}>
            <option value="" disabled>Select a product</option>
            {QUOTE.products.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Specification" optional>
        <textarea rows={4} value={f.spec} onChange={set("spec")} placeholder="Grade, quantity, packing, destination port, shipping terms" />
      </Field>
      <div className="v2-form-actions">
        <button type="submit" value="whatsapp" className="v2-btn v2-btn-ice">Send on WhatsApp <SIcon name="send" /></button>
        <button type="submit" value="email" className="v2-btn v2-btn-ghost">Send by email</button>
      </div>
      <p className="v2-form-note" aria-live="polite">
        {sent === "whatsapp" && "WhatsApp opened in a new tab with your request filled in. Press send there to reach us."}
        {sent === "email" && "Your email app should now be open with your request ready to send."}
        {!sent && "Your request opens in WhatsApp or your email app, ready to send. Nothing is stored on this site."}
      </p>
    </form>
  );
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="v2-field">
      <span>{label}{optional && <em> (optional)</em>}</span>
      {children}
    </label>
  );
}

/* ───────── Dotted world map from the Natural Earth land mask ───────── */

export function WorldMap({ pins }: { pins: { title: string; text: string; lon: number; lat: number }[] }) {
  const dots: string[] = [];
  LAND_MASK.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] === "#") dots.push(`M${x * 10 + 5} ${y * 10 + 5}h0`); });
  return (
    <div className="v2-world">
      <svg viewBox={`0 0 ${MASK_COLS * 10} ${MASK_ROWS * 10}`} aria-hidden="true"><path d={dots.join("")} /></svg>
      {pins.map((p) => (
        <div key={p.title} className="v2-pin" style={{ left: `${((p.lon + 180) / 360) * 100}%`, top: `${((MASK_LAT0 - p.lat) / (MASK_ROWS * MASK_STEP)) * 100}%` }}>
          <i aria-hidden="true" />
          <span><b>{p.title}</b> {p.text}</span>
        </div>
      ))}
    </div>
  );
}
