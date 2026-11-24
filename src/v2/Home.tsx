import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteIconSprite } from "../site/components/SiteIcon";
import { TOP_CATEGORIES } from "../site/data/catalogue";
import { FARM_TO_CONTAINER } from "../site/data/pages";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/motion";
import { ABOUT_INTRO, CERTIFICATES, COMPANY, DIRECTORS, PRESENCE, QUOTE, STATS, WHY_US } from "./content";
import { Footer, Hl, QuoteForm, SIcon, WorldMap, useReveal } from "./ui";

export default function Home() {
  const scope = useReveal();
  return (
    <div className="v2" ref={scope}>
      <SiteIconSprite />
      <HeroSlot />
      <main id="main">
        <About />
        <Products />
        <Process />
        <WhyUs />
        <Certificates />
        <Directors />
        <Presence />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}

/* Reserved for the Earth hero (matte black, glow, Blender model, SVG overlay), built by a teammate. Drop it in here. */
function HeroSlot() {
  return (
    <section className="v2-hero-slot" id="hero" aria-label="Pratibhashyam Exports">
      {import.meta.env.DEV && <p className="v2-dev-note">Earth hero section goes here (built separately)</p>}
    </section>
  );
}

/** Section title row: big heading left, supporting copy right. */
function Head({ title, text, children }: { title: string; text?: string; children?: ReactNode }) {
  return (
    <header className="v2-head" data-reveal>
      <h2><Hl t={title} /></h2>
      <div className="v2-head-side">
        {text && <p>{text}</p>}
        {children}
      </div>
    </header>
  );
}

/* ───────── About: bento of statement, photos and stats ───────── */

function About() {
  const [farmers, countries, commodities, years] = STATS;
  const [loading, field, team] = ABOUT_INTRO.photos;
  return (
    <section className="v2-section" id="about">
      <div className="v2-bento v2-bento-about">
        <article className="v2-cell v2-ice v2-a-intro" data-reveal>
          <h2><Hl t={ABOUT_INTRO.title} /></h2>
          <p>{ABOUT_INTRO.text}</p>
          <Link to="/about-us" className="v2-link">Our story <SIcon name="arrow" /></Link>
        </article>
        <figure className="v2-cell v2-photo v2-a-photo" data-reveal>
          <img src={loading} alt="Bagged cargo being loaded into a shipping container" loading="lazy" />
          <figcaption>Container loading</figcaption>
        </figure>
        <Stat s={farmers} className="v2-sky v2-a-s1" />
        <Stat s={countries} className="v2-navy v2-a-s2" />
        <Stat s={commodities} className="v2-navy v2-a-s3" />
        <Stat s={years} className="v2-ice v2-a-s4" />
        <figure className="v2-cell v2-photo v2-a-team" data-reveal>
          <img src={team} alt="The Pratibhashyam team at the port" loading="lazy" />
          <figcaption>Our team at the port</figcaption>
        </figure>
        <figure className="v2-cell v2-photo v2-a-field" data-reveal>
          <img src={field} alt="Our team on a sourcing visit to a farm" loading="lazy" />
          <figcaption>Sourcing at the farm</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Stat({ s, className }: { s: (typeof STATS)[number]; className: string }) {
  return (
    <div className={`v2-cell v2-stat ${className}`} data-reveal>
      <span className="v2-stat-num"><Counter to={s.value} />{s.suffix}</span>
      <span className="v2-stat-label">{s.label}</span>
    </div>
  );
}

function Counter({ to }: { to: number }) {
  const el = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const n = { v: 0 };
    gsap.to(n, {
      v: to, duration: 1.8, ease: "expo.out",
      scrollTrigger: { trigger: el.current, start: "top 92%", once: true },
      onUpdate: () => { if (el.current) el.current.textContent = Math.round(n.v).toLocaleString("en-IN"); },
    });
  });
  return <span ref={el}>{to.toLocaleString("en-IN")}</span>;
}

/* ───────── Products bento ───────── */

function Products() {
  const [agri, ...rest] = TOP_CATEGORIES;
  const area = ["v2-p-nuts", "v2-p-textile", "v2-p-pharma"];
  return (
    <section className="v2-section" id="products">
      <Head title="Four export categories, *one supplier.*" text="From Indian farms and factories to your port, with one team handling the order end to end." />
      <div className="v2-bento v2-bento-products">
        <Link to={agri.path} className="v2-cell v2-tile v2-p-agri" data-reveal>
          <img src={agri.image} alt="" loading="lazy" />
          <div className="v2-tile-body">
            <span className="v2-tag">{agri.count} {agri.countLabel}</span>
            <h3>{agri.title}</h3>
            <p>{agri.description}</p>
            <ul className="v2-chips">{agri.children?.map((c) => <li key={c.path}>{c.title}</li>)}</ul>
          </div>
          <SIcon name="arrow-ur" className="v2-tile-arrow" />
        </Link>
        {rest.map((c, i) => (
          <Link key={c.slug} to={c.path} className={`v2-cell v2-tile ${area[i]}`} data-reveal>
            <img src={c.image} alt="" loading="lazy" />
            <div className="v2-tile-body">
              <span className="v2-tag">{c.count} {c.countLabel}</span>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
            </div>
            <SIcon name="arrow-ur" className="v2-tile-arrow" />
          </Link>
        ))}
        <div className="v2-cell v2-sky v2-p-mix" data-reveal>
          <h3>Combine categories in a single order.</h3>
          <p>One supplier, one team and one set of export documents for everything in your container.</p>
          <Link to="/contact#quote" className="v2-btn v2-btn-light">Request a quote <SIcon name="arrow" /></Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── Farm to container: steps over a sky-to-horizon gradient; the line fills as you scroll ───────── */

function Process() {
  const rail = useRef<HTMLOListElement>(null);
  useGSAP(() => {
    const steps = gsap.utils.toArray<HTMLElement>(".v2-step", rail.current);
    if (prefersReducedMotion()) { steps.forEach((s) => s.classList.add("is-lit")); return; }
    gsap.fromTo(rail.current, { "--fill": 0 }, {
      "--fill": 1, ease: "none",
      scrollTrigger: { trigger: rail.current, start: "top 80%", end: "bottom 55%", scrub: 0.6 },
    });
    steps.forEach((s) => ScrollTrigger.create({ trigger: s, start: "top 72%", toggleClass: "is-lit" }));
  }, { scope: rail });

  return (
    <section className="v2-atmos" id="process">
      <div className="v2-atmos-inner">
        <Head title="From farm *to container.*" text="The same six checkpoints for every consignment, whatever the product." />
        <ol className="v2-rail" ref={rail}>
          {FARM_TO_CONTAINER.map((s, i) => (
            <li key={s.title} className="v2-step">
              <i aria-hidden="true" />
              <span className="v2-step-n">Step {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── Why us bento ───────── */

const DOCS = ["Commercial invoice", "Packing list", "Certificate of origin", "Phytosanitary certificate", "Customs clearance"];
const TERMS = ["FOB", "CFR", "CIF"];

function WhyUs() {
  const [quality, direct, range, paperwork, freight, network] = WHY_US;
  return (
    <section className="v2-section" id="why">
      <Head title="Why importers *source from us.*" text="Choosing an export partner decides whether your shipment arrives as ordered. Here is what we take off your plate." />
      <div className="v2-bento v2-bento-why">
        <article className="v2-cell v2-ice v2-w-quality" data-reveal>
          <SIcon name="shield" className="v2-cell-icon" />
          <h3>{quality.title}</h3>
          <p>{quality.text}</p>
        </article>
        <article className="v2-cell v2-navy v2-w-direct" data-reveal>
          <SIcon name="leaf" className="v2-cell-icon" />
          <h3>{direct.title}</h3>
          <p>{direct.text}</p>
        </article>
        <article className="v2-cell v2-sky v2-w-paper" data-reveal>
          <h3>{paperwork.title}</h3>
          <p>{paperwork.text}</p>
          <ul className="v2-doclist">{DOCS.map((d) => <li key={d}><SIcon name="file" />{d}</li>)}</ul>
        </article>
        <article className="v2-cell v2-navy v2-w-range" data-reveal>
          <SIcon name="layers" className="v2-cell-icon" />
          <h3>{range.title}</h3>
          <p>{range.text}</p>
        </article>
        <article className="v2-cell v2-navy v2-w-freight" data-reveal>
          <div className="v2-terms">{TERMS.map((t) => <span key={t}>{t}</span>)}</div>
          <h3>{freight.title}</h3>
          <p>{freight.text}</p>
        </article>
        <article className="v2-cell v2-ice v2-w-network" data-reveal>
          <SIcon name="globe" className="v2-cell-icon" />
          <h3>{network.title}</h3>
          <p>{network.text}</p>
        </article>
      </div>
    </section>
  );
}

/* ───────── Certificates: data-driven, ready for the admin panel ───────── */

function Certificates() {
  if (!CERTIFICATES.length && !import.meta.env.DEV) return null;
  return (
    <section className="v2-section v2-certs" id="certificates">
      <Head title="Certifications *& registrations.*" text="The licences and certificates we hold to export from India." />
      {CERTIFICATES.length ? (
        <ul className="v2-bento v2-cert-grid">
          {CERTIFICATES.map((c) => (
            <li key={c.name} className="v2-cell v2-navy v2-cert" data-reveal>
              {c.image ? <img src={c.image} alt={`${c.name} certificate`} loading="lazy" /> : <SIcon name="shield" className="v2-cell-icon" />}
              <h3>{c.name}</h3>
              <p>{c.issuer}</p>
              {c.href && <a href={c.href} target="_blank" rel="noopener noreferrer" className="v2-link">View <SIcon name="arrow-ur" /></a>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="v2-empty"><SIcon name="shield" />No certificates added yet. Add them in <code>src/v2/content.ts</code> (later, the admin panel). This placeholder only shows in development.</p>
      )}
    </section>
  );
}

/* ───────── Meet our directors: clean columns on ice; slides when they don't all fit ───────── */

function Directors() {
  const track = useRef<HTMLDivElement>(null);
  const [first, setFirst] = useState(0);
  const [edge, setEdge] = useState({ prev: false, next: false });
  const n = DIRECTORS.length;

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    const update = () => {
      const step = (t.children[1] as HTMLElement).offsetLeft - (t.children[0] as HTMLElement).offsetLeft;
      setFirst(Math.round(t.scrollLeft / step));
      setEdge({ prev: t.scrollLeft > 2, next: t.scrollLeft < t.scrollWidth - t.clientWidth - 2 });
    };
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { t.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const go = (dir: 1 | -1) => {
    const t = track.current;
    const card = t?.children[Math.max(0, Math.min(n - 1, first + dir))] as HTMLElement | undefined;
    if (!t || !card) return;
    t.scrollTo({ left: card.offsetLeft - t.offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section className="v2-people" id="directors" aria-roledescription="carousel" aria-label="Meet our directors">
      <div className="v2-people-inner">
        <h2 className="v2-stagger" data-reveal>
          <span>Meet the people</span><span>behind every</span><span>shipment.</span>
        </h2>
        <div className="v2-people-intro" data-reveal>
          <p>Four directors oversee the whole export cycle themselves.</p>
          <p>From sourcing at the farm to the sealed container.</p>
        </div>

        <div className="v2-people-track" ref={track} tabIndex={0} aria-label="Directors"
          onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } }}>
          {DIRECTORS.map((d, i) => (
            <article key={d.name} className="v2-person" aria-roledescription="slide" aria-label={`${i + 1} of ${n}: ${d.name}`}>
              <h3>{d.role}.</h3>
              <p>{d.text}</p>
              <div className="v2-person-photo"><img src={d.photo} alt={`Portrait of ${d.name}`} loading="lazy" /></div>
              <p className="v2-person-name">{d.name}</p>
              <p className="v2-person-role">Director</p>
            </article>
          ))}
        </div>

        <div className="v2-people-bar" data-reveal>
          <p>Four directors, one commitment.<br />Quality exports, delivered on time.</p>
          <div className="v2-people-ctrl">
            {(edge.prev || edge.next) && <>
              <button className="v2-round" onClick={() => go(-1)} disabled={!edge.prev} aria-label="Previous director"><SIcon name="arrow" className="flip" /></button>
              <button className="v2-round" onClick={() => go(1)} disabled={!edge.next} aria-label="Next director"><SIcon name="arrow" /></button>
            </>}
            <Link to="/contact#quote" className="v2-people-cta">Talk to our team <SIcon name="arrow" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Global presence ───────── */

function Presence() {
  return (
    <section className="v2-section" id="presence">
      <Head title="Two offices. *Buyers in 15+ countries.*" text="Our head office is in Nagpur, at the centre of India, and we also have an office in Dubai, UAE." />
      <div className="v2-bento v2-bento-presence">
        <div className="v2-cell v2-navy v2-map-cell" data-reveal><WorldMap pins={PRESENCE} /></div>
        {PRESENCE.map((o, i) => (
          <div key={o.title} className={`v2-cell ${i ? "v2-sky" : "v2-ice"} v2-office`} data-reveal>
            <SIcon name="pin" className="v2-cell-icon" />
            <span className="v2-tag">{o.text}</span>
            <h3>{o.title}</h3>
            {i === 0 && <p>{COMPANY.address}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── Quote: sky-to-horizon band with an ice form card ───────── */

function Quote() {
  return (
    <section className="v2-atmos v2-atmos-quote" id="quote">
      <div className="v2-atmos-inner v2-quote">
        <div className="v2-quote-copy" data-reveal>
          <h2><Hl t={QUOTE.title} /></h2>
          <p className="v2-lede">{QUOTE.text}</p>
          <ul className="v2-checks">{QUOTE.points.map((p) => <li key={p}><SIcon name="check" />{p}</li>)}</ul>
          <div className="v2-direct">
            <a href={COMPANY.phoneHref}><SIcon name="phone" />{COMPANY.phoneDisplay}</a>
            <a href={`mailto:${COMPANY.email}`}><SIcon name="mail" />{COMPANY.email}</a>
          </div>
        </div>
        <div className="v2-form-card" data-reveal><QuoteForm /></div>
      </div>
    </section>
  );
}
