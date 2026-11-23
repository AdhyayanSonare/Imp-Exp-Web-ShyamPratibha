import { useState, type FormEvent } from "react";
import { Page, Breadcrumbs, SectionHead, Accordion, usePageMeta } from "../components/ui";
import { SIcon } from "../components/SiteIcon";
import { asset } from "../data/catalogue";
import { COMPANY, CONTACT_PAGE } from "../data/pages";
import { LAND_MASK, MASK_COLS, MASK_ROWS, MASK_LAT0, MASK_STEP } from "../data/worldMask.generated";

const TOPICS = ["Product quotation", "Agriculture", "Nuts & Seeds", "Textile", "Pharmaceuticals", "EXIM training", "Other"];

export default function ContactPage() {
  usePageMeta("Contact Us", CONTACT_PAGE.heroText);
  const [f, setF] = useState({ name: "", email: "", company: "", country: "", topic: TOPICS[0], message: "" });
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));

  /* No backend yet: the form opens the visitor's email app with the message filled in. */
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = [
      `Name: ${f.name}`, `Email: ${f.email}`, f.company && `Company: ${f.company}`, f.country && `Country: ${f.country}`,
      `Topic: ${f.topic}`, "", f.message,
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`${f.topic}: ${f.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Page className="sp-contact">
      <section className="sp-contact-hero">
        <img src={asset("hero-port-sunset.jpg")} alt="" className="sp-contact-hero-img" />
        <div className="sp-contact-hero-copy">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <p className="sp-eyebrow">Contact us</p>
          <h1>{CONTACT_PAGE.heroTitle}</h1>
          <p className="sp-lede">{CONTACT_PAGE.heroText}</p>
        </div>
      </section>

      <section className="sp-contact-card" data-r>
        <div className="sp-contact-info">
          <h2>Company information</h2>
          <div className="sp-info-grid">
            <a href={COMPANY.phoneHref} className="sp-info">
              <span className="sp-ico"><SIcon name="phone" /></span>
              <b>Phone</b><span>{COMPANY.phoneDisplay}</span>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="sp-info">
              <span className="sp-ico"><SIcon name="mail" /></span>
              <b>Email</b><span>{COMPANY.email}</span>
            </a>
            <a href={COMPANY.mapHref} target="_blank" rel="noopener noreferrer" className="sp-info sp-info-wide">
              <span className="sp-ico"><SIcon name="pin" /></span>
              <b>Head office</b><span>{COMPANY.address}</span>
              <em>Get directions <SIcon name="arrow-ur" /></em>
            </a>
          </div>
        </div>

        <form className="sp-form" onSubmit={submit}>
          <h2>Send us your requirement</h2>
          <div className="sp-form-row">
            <label>Full name<input required value={f.name} onChange={set("name")} autoComplete="name" /></label>
            <label>Email address<input required type="email" value={f.email} onChange={set("email")} autoComplete="email" /></label>
          </div>
          <div className="sp-form-row">
            <label>Company <span>(optional)</span><input value={f.company} onChange={set("company")} autoComplete="organization" /></label>
            <label>Country <span>(optional)</span><input value={f.country} onChange={set("country")} autoComplete="country-name" /></label>
          </div>
          <label>I'm interested in
            <select value={f.topic} onChange={set("topic")}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
          </label>
          <label>Message<textarea required rows={5} value={f.message} onChange={set("message")} placeholder="Product, quantity, destination and shipping terms" /></label>
          <button type="submit" className="sp-submit">
            <span>Send message</span><i><SIcon name="arrow-ur" /></i>
          </button>
          <p className="sp-form-note" aria-live="polite">
            {sent ? "Your email app should now be open with your message ready to send." : "Submitting opens your email app with your message ready to send."}
          </p>
        </form>
      </section>

      <section className="sp-map" data-r>
        <iframe title="Map showing our Nagpur office" src={COMPANY.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <div className="sp-map-card">
          <SIcon name="pin" />
          <div><b>Pratibhashyam Exports Pvt Ltd</b><span>{COMPANY.address}</span></div>
        </div>
      </section>

      <section className="sp-world">
        <SectionHead eyebrow="Where we operate" title="Two offices, one team." text="Our head office is in Nagpur, India, and we also have an office in Dubai, UAE." align="center" />
        <div className="sp-world-map" data-r>
          <DotWorld />
          {CONTACT_PAGE.offices.map((o) => (
            <div key={o.title} className="sp-world-pin" style={toMap(o.lon, o.lat)}>
              <i />
              <div className="sp-world-tip"><b>{o.title}</b><span>{o.text}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="sp-faq">
        <SectionHead eyebrow="FAQs" title="Frequently asked questions" align="center" />
        <Accordion items={CONTACT_PAGE.faqs} />
      </section>
    </Page>
  );
}

/* Dotted world map rendered from a Natural Earth land mask (see worldMask.generated.ts). */
function DotWorld() {
  const dots: string[] = [];
  LAND_MASK.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] === "#") dots.push(`M${x * 10 + 5} ${y * 10 + 5}h0`); });
  return (
    <svg viewBox={`0 0 ${MASK_COLS * 10} ${MASK_ROWS * 10}`} className="sp-dotworld" aria-hidden="true">
      <path d={dots.join("")} />
    </svg>
  );
}

/** Equirectangular position (percent) of a lon/lat on the mask. */
const toMap = (lon: number, lat: number) => ({
  left: `${((lon + 180) / 360) * 100}%`,
  top: `${((MASK_LAT0 - lat) / (MASK_ROWS * MASK_STEP)) * 100}%`,
});
