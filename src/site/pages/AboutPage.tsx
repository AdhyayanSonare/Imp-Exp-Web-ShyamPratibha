import { Link } from "react-router-dom";
import { Page, HeroCard, SectionHead, usePageMeta } from "../components/ui";
import { SIcon } from "../components/SiteIcon";
import { asset } from "../data/catalogue";
import { ABOUT, FARM_TO_CONTAINER } from "../data/pages";

export default function AboutPage() {
  usePageMeta("About Us", ABOUT.heroText);
  return (
    <Page className="sp-about">
      <HeroCard crumbs={[{ label: "About Us" }]} eyebrow="About Pratibhashyam Exports" title={ABOUT.heroTitle} text={ABOUT.heroText} image={asset("port-jnpt.jpg")} imageAlt="Container cranes at an Indian port" />

      {/* Story: copy + image with overlapping badge */}
      <section className="sp-story">
        <div className="sp-story-copy" data-r>
          <p className="sp-eyebrow">{ABOUT.story.eyebrow}</p>
          <h2>{ABOUT.story.title}</h2>
          {ABOUT.story.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </div>
        <div className="sp-story-media" data-r>
          <img src={asset("ops-field.jpg")} alt="Our directors on a farm visit" loading="lazy" />
          <div className="sp-badge">
            <b>{ABOUT.story.badge.value}</b>
            <span>{ABOUT.story.badge.label}</span>
          </div>
          <img className="sp-story-inset" src={asset("ops-packing.jpg")} alt="Fresh produce being packed into export cartons" loading="lazy" />
        </div>
      </section>

      {/* Pillars bento */}
      <section className="sp-pillars">
        <SectionHead eyebrow="What we stand for" title="Four promises behind every consignment." />
        <div className="sp-pillar-grid">
          {ABOUT.pillars.map((p, i) => (
            <div key={p.title} className={`sp-pillar p${i}`} data-r>
              <SIcon name={(["shield", "leaf", "file", "ship"] as const)[i]} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Operations: staggered bars */}
      <section className="sp-stagger-sec">
        <SectionHead eyebrow="What we manage" title="Procurement to delivery, under one roof." text="The company manages every stage itself, so buyers deal with one accountable team." />
        <ol className="sp-stagger">
          {ABOUT.operations.map((s, i) => (
            <li key={s.n} className={i % 2 ? "is-right" : ""} data-r>
              <span className="sp-stagger-n">{s.n}</span>
              <div className="sp-stagger-bar"><h3>{s.title}</h3><p>{s.text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      {/* Audiences */}
      <section className="sp-audiences">
        {ABOUT.audiences.map((a) => (
          <article key={a.title} className="sp-audience" data-r>
            <img src={a.image} alt="" loading="lazy" />
            <div><h3>{a.title}</h3><p>{a.text}</p></div>
          </article>
        ))}
      </section>

      {/* Leadership */}
      <section className="sp-leaders">
        <SectionHead eyebrow="Leadership" title="Meet the leadership behind every shipment." text={ABOUT.leadershipIntro} />
        <div className="sp-leader-grid">
          {ABOUT.leaders.map((l) => (
            <article key={l.name} className="sp-leader" data-r>
              <div className="sp-leader-photo"><img src={l.photo} alt={l.name} loading="lazy" /></div>
              <p className="sp-leader-role">{l.role}</p>
              <h3>{l.name}</h3>
              <p>{l.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Vision & mission */}
      <section className="sp-vm">
        <div className="sp-vm-card sp-vm-vision" data-r>
          <p className="sp-eyebrow sp-eyebrow-light">Our vision</p>
          <blockquote>{ABOUT.vision}</blockquote>
        </div>
        <div className="sp-vm-card sp-vm-mission" data-r>
          <p className="sp-eyebrow">Our mission</p>
          <blockquote>{ABOUT.mission}</blockquote>
        </div>
      </section>

      {/* Farm to container */}
      <section className="sp-f2c">
        <SectionHead eyebrow="Our process" title="From farm to container." align="left" />
        <ol className="sp-f2c-row">
          {FARM_TO_CONTAINER.map((s) => (
            <li key={s.n} data-r>
              <span>{s.n}</span>
              <small>{s.tag}</small>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Presence */}
      <section className="sp-presence">
        <div className="sp-presence-copy" data-r>
          <p className="sp-eyebrow">Operating across the globe</p>
          <h2>Offices in India and Dubai, with an international network of buyers, distributors and partners.</h2>
          <Link to="/contact" className="sp-btn sp-btn-dark">Contact us <SIcon name="arrow" /></Link>
        </div>
        <ul className="sp-presence-list">
          {ABOUT.presence.map((p, i) => (
            <li key={p.title} data-r>
              <SIcon name={(["pin", "pin", "globe"] as const)[i]} />
              <div><h3>{p.title}</h3><p>{p.text}</p></div>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
