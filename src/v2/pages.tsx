import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CONTACT_PAGE } from "../site/data/pages";
import { COMPANY, PRESENCE } from "./content";
import { PageHero, QuoteForm, SIcon, WorldMap, useReveal } from "./ui";

const useTitle = (t: string) => useEffect(() => { document.title = `${t} | Pratibhashyam Exports`; }, [t]);

/** Placeholder for subpages not yet designed in V2. */
export function BlankPage({ title }: { title: string }) {
  useTitle(title);
  return (
    <PageHero title={title} text="This page is being rebuilt for the new site.">
      <div className="v2-hero-actions">
        <Link to="/" className="v2-btn v2-btn-ghost">Back to home</Link>
        <Link to="/contact" className="v2-btn v2-btn-ice">Contact us</Link>
      </div>
    </PageHero>
  );
}

export function NotFound() {
  useTitle("Page not found");
  return (
    <PageHero title="We couldn't find that page." text="The link may be old, or the page may have moved.">
      <div className="v2-hero-actions"><Link to="/" className="v2-btn v2-btn-ice">Back to home</Link></div>
    </PageHero>
  );
}

export function ContactPage() {
  useTitle("Contact");
  const scope = useReveal();
  const { hash } = useLocation();
  useEffect(() => { if (hash) document.querySelector(hash)?.scrollIntoView(); }, [hash]);

  const methods = [
    { icon: "mail", label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}`, action: "Write to us" },
    { icon: "phone", label: "Phone & WhatsApp", value: COMPANY.phoneDisplay, href: COMPANY.phoneHref, action: "Call now" },
    { icon: "pin", label: "Head office", value: COMPANY.address, href: COMPANY.mapHref, action: "Get directions" },
  ] as const;

  return (
    <div ref={scope}>
      <PageHero title="Contact *us.*" text={CONTACT_PAGE.heroText} />

      <section className="v2-section v2-methods">
        {methods.map((m) => (
          <a key={m.label} href={m.href} className="v2-method" data-reveal
            {...(m.icon === "pin" ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            <SIcon name={m.icon} />
            <span className="v2-method-label">{m.label}</span>
            <span className="v2-method-value">{m.value}</span>
            <span className="v2-link">{m.action} <SIcon name="arrow-ur" /></span>
          </a>
        ))}
      </section>

      <section className="v2-section v2-quote v2-quote-page" id="quote">
        <div className="v2-quote-copy" data-reveal>
          <h2>Request <em className="v2-hl">a quote.</em></h2>
          <p className="v2-lede">The more detail you share (grade, quantity, packing, destination port and shipping terms), the more accurate your quotation.</p>
          <dl className="v2-faq">
            {CONTACT_PAGE.faqs.slice(1, 4).map((f) => (
              <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>
            ))}
          </dl>
        </div>
        <div className="v2-form-card" data-reveal><QuoteForm /></div>
      </section>

      <section className="v2-section v2-visit">
        <div className="v2-map" data-reveal>
          <iframe title="Map showing our Nagpur head office" src={COMPANY.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="v2-visit-copy" data-reveal>
          <h2>Visit our <em className="v2-hl">head office.</em></h2>
          <address>{COMPANY.addressLines.map((l) => <span key={l}>{l}</span>)}</address>
          <a href={COMPANY.mapHref} target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-ghost">Open in Google Maps <SIcon name="arrow-ur" /></a>
        </div>
      </section>

      <section className="v2-section v2-presence">
        <header className="v2-head v2-head-center" data-reveal>
          <h2>Where <em className="v2-hl">we operate.</em></h2>
          <p>Head office in Nagpur, India, and an office in Dubai, UAE.</p>
        </header>
        <div data-reveal><WorldMap pins={PRESENCE} /></div>
      </section>
    </div>
  );
}
