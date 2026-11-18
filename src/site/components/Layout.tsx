import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { SIcon, SiteIconSprite } from "./SiteIcon";
import { AGRI_CATEGORIES, TOP_CATEGORIES, asset, getCategory } from "../data/catalogue";
import { COMPANY } from "../data/pages";
import "../site.css";

/* Shared shell for every subpage. Mirrors the homepage's docked header (brand · image pill · actions). */

export default function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className="sp">
      <SiteIconSprite />
      <SiteHeader />
      <main className="sp-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

const NAV = [
  { to: "/about-us", label: "About Us" },
  { to: "/products", label: "Products", mega: true },
  { to: "/exim-training", label: "EXIM Training" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function SiteHeader() {
  const { pathname } = useLocation();
  const [mega, setMega] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => { setMega(false); setSheet(false); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setMega(false); setSheet(false); } };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const openMega = () => { window.clearTimeout(closeTimer.current); setMega(true); };
  const closeMegaSoon = () => { closeTimer.current = window.setTimeout(() => setMega(false), 160); };

  return (
    <>
      <header className={`sp-header${scrolled ? " is-scrolled" : ""}`}>
        <Link to="/" className="sp-brand" aria-label={`${COMPANY.shortName}, home`}>
          <span className="brand-mark" aria-hidden="true" />
          <span>Pratibhashyam</span>
        </Link>

        <nav className="sp-pill" aria-label="Primary" onMouseLeave={closeMegaSoon}>
          <span className="sp-pill-bg" aria-hidden="true" />
          {NAV.map((n) =>
            n.mega ? (
              <div key={n.to} className="sp-pill-item" onMouseEnter={openMega}>
                <NavLink to={n.to} className={({ isActive }) => (isActive ? "is-active" : undefined)}>{n.label}</NavLink>
                <button
                  className="sp-pill-toggle"
                  aria-label="Show product categories"
                  aria-expanded={mega}
                  aria-controls="sp-mega"
                  onClick={() => setMega((m) => !m)}
                >
                  <SIcon name="chev" />
                </button>
              </div>
            ) : (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `sp-pill-item${isActive ? " is-active" : ""}`} onMouseEnter={closeMegaSoon}>
                {n.label}
              </NavLink>
            ),
          )}
          <MegaMenu open={mega} onEnter={openMega} onLeave={closeMegaSoon} />
        </nav>

        <div className="sp-actions">
          <a className="sp-phone" href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>
          <Link className="sp-cta" to="/contact">Get a quote</Link>
          <button className="sp-menu-btn" aria-label={sheet ? "Close menu" : "Open menu"} aria-expanded={sheet} onClick={() => setSheet((s) => !s)}>
            <SIcon name={sheet ? "x" : "menu"} />
          </button>
        </div>
      </header>

      {sheet && <MobileSheet />}
    </>
  );
}

function MegaMenu({ open, onEnter, onLeave }: { open: boolean; onEnter: () => void; onLeave: () => void }) {
  const others = TOP_CATEGORIES.filter((t) => t.slug !== "agriculture");
  return (
    <div id="sp-mega" className={`sp-mega${open ? " is-open" : ""}`} onMouseEnter={onEnter} onMouseLeave={onLeave} hidden={!open}>
      <div className="sp-mega-agri">
        <Link to="/products/agriculture" className="sp-mega-head">
          <span>Agriculture</span><SIcon name="arrow" />
        </Link>
        <ul>
          {AGRI_CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={c.path}>
                <img src={c.heroImage} alt="" loading="lazy" />
                <span>{c.shortTitle}</span>
                <em>{c.products.length}</em>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sp-mega-others">
        {others.map((t) => (
          <Link key={t.slug} to={t.path} className="sp-mega-card">
            <img src={t.image} alt="" loading="lazy" />
            <span>{t.title}</span>
          </Link>
        ))}
        <Link to="/products" className="sp-mega-all">All products <SIcon name="arrow" /></Link>
      </div>
    </div>
  );
}

function MobileSheet() {
  return (
    <div className="sp-sheet" role="dialog" aria-label="Menu">
      <Link to="/">Home</Link>
      <Link to="/about-us">About Us</Link>
      <details>
        <summary>Products <SIcon name="chev" /></summary>
        <Link to="/products">All products</Link>
        <Link to="/products/agriculture">Agriculture</Link>
        {AGRI_CATEGORIES.map((c) => <Link key={c.slug} to={c.path} className="sub">{c.shortTitle}</Link>)}
        <Link to="/products/nuts-seeds">Nuts &amp; Seeds</Link>
        <Link to="/products/textile">Textile</Link>
        <Link to="/products/pharmaceuticals">Pharmaceuticals</Link>
      </details>
      <Link to="/exim-training">EXIM Training</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/contact">Contact</Link>
      <a className="sp-sheet-phone" href={COMPANY.phoneHref}><SIcon name="phone" />{COMPANY.phoneDisplay}</a>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="sp-footer">
      <div className="sp-footer-cta">
        <img src={asset("hero-port-sunset.jpg")} alt="" loading="lazy" />
        <div>
          <p className="sp-eyebrow sp-eyebrow-light">Start your export–import journey</p>
          <h2>Share your requirement. Get a customised quote.</h2>
        </div>
        <div className="sp-footer-cta-actions">
          <Link to="/contact" className="sp-btn sp-btn-light">Contact our team <SIcon name="arrow" /></Link>
          <a href={COMPANY.phoneHref} className="sp-btn sp-btn-ghost"><SIcon name="phone" />Call us</a>
        </div>
      </div>

      <div className="sp-footer-grid">
        <div className="sp-footer-brand">
          <Link to="/" className="sp-brand sp-brand-dark"><span className="brand-mark" aria-hidden="true" /><span>{COMPANY.legalName}</span></Link>
          <p>An Indian export company connecting farmers, producers and manufacturers with buyers worldwide.</p>
          <address>
            {COMPANY.addressLines.map((l) => <span key={l}>{l}</span>)}
          </address>
        </div>
        <FooterCol title="Company" links={[["About Us", "/about-us"], ["EXIM Training", "/exim-training"], ["Gallery", "/gallery"], ["Contact", "/contact"]]} />
        <FooterCol title="Agriculture" links={AGRI_CATEGORIES.map((c) => [c.shortTitle, c.path] as [string, string])} />
        <FooterCol
          title="Products"
          links={[["All products", "/products"], ["Agriculture", "/products/agriculture"], [getCategory("nuts-seeds").shortTitle, "/products/nuts-seeds"], ["Textile", "/products/textile"], ["Pharmaceuticals", "/products/pharmaceuticals"]]}
        />
        <div className="sp-footer-col">
          <h3>Contact</h3>
          <a href={COMPANY.phoneHref}>{COMPANY.phoneDisplay}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <a href={COMPANY.mapHref} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
      </div>

      <div className="sp-footer-bottom">
        <p>© {new Date().getFullYear()} {COMPANY.legalName}. Nagpur, India.</p>
        <a href={`${import.meta.env.BASE_URL}CREDITS.md`}>Photo credits</a>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="sp-footer-col">
      <h3>{title}</h3>
      {links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
    </div>
  );
}
