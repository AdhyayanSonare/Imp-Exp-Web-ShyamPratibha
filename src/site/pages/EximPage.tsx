import { useState } from "react";
import { Page, HeroSplit, SectionHead, Accordion, usePageMeta } from "../components/ui";
import { SIcon, type SiteIconName } from "../components/SiteIcon";
import { asset } from "../data/catalogue";
import { COMPANY, EXIM } from "../data/pages";

export default function EximPage() {
  usePageMeta("EXIM Training", EXIM.heroText);
  const [phase, setPhase] = useState(0);
  const [from, to] = EXIM.phases[phase].range;
  const topics = EXIM.curriculum.slice(from - 1, to);

  return (
    <Page className="sp-exim">
      <HeroSplit
        crumbs={[{ label: "EXIM Training" }]}
        eyebrow="Institute of Export Import Management · Nagpur"
        title={EXIM.heroTitle}
        text={EXIM.heroText}
        image={asset("gallery/meetings-06.jpg")}
        imageAlt="A training session in our office"
      >
        <div className="sp-hero-actions">
          <a href={COMPANY.phoneHref} className="sp-btn sp-btn-dark">Book a free demo <SIcon name="arrow" /></a>
          <a href="#curriculum" className="sp-btn sp-btn-outline">View curriculum</a>
        </div>
      </HeroSplit>

      <section className="sp-services">
        {EXIM.services.map((s, i) => (
          <article key={s.title} className={`sp-service s${i}`} data-r>
            <span className="sp-ico"><SIcon name={s.icon as SiteIconName} /></span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </section>

      <section className="sp-exim-overview">
        <div className="sp-exim-facts" data-r>
          {EXIM.facts.map((f) => (
            <div key={f.label}><b>{f.value}</b><span>{f.label}</span></div>
          ))}
          <div className="sp-exim-cert"><SIcon name="check" /><span>Course completion certificate on successful completion</span></div>
        </div>
        <div className="sp-exim-who" data-r>
          <p className="sp-eyebrow">Who it's for</p>
          <h2>Designed for complete beginners. No prior experience needed.</h2>
          <div className="sp-chips">{EXIM.audience.map((a) => <span key={a}>{a}</span>)}</div>
          <p className="sp-eyebrow sp-mt">By the end you can</p>
          <ul className="sp-checks">{EXIM.outcomes.map((o) => <li key={o}><SIcon name="check" />{o}</li>)}</ul>
        </div>
      </section>

      <section className="sp-curriculum" id="curriculum">
        <SectionHead eyebrow="Course curriculum" title="Twenty modules, in six stages." text="From the basics of international trade to completing your first export deal as a final practical project." />
        <div className="sp-curr">
          <div className="sp-curr-phases" role="tablist" aria-label="Curriculum stages" data-r>
            {EXIM.phases.map((p, i) => (
              <button key={p.title} role="tab" aria-selected={phase === i} onClick={() => setPhase(i)}>
                <span>Stage {i + 1}</span>
                <b>{p.title}</b>
                <em>Modules {p.range[0]}–{p.range[1]}</em>
              </button>
            ))}
          </div>
          <div className="sp-curr-topics" role="tabpanel">
            <Accordion
              key={phase}
              items={topics.map((t, i) => ({
                q: `${String(from + i).padStart(2, "0")} · ${t.title}`,
                a: t.text,
              }))}
            />
          </div>
        </div>
        <details className="sp-curr-all">
          <summary>See all 20 modules at once <SIcon name="chev" /></summary>
          <ol>{EXIM.curriculum.map((t) => <li key={t.title}><b>{t.title}</b><span>{t.text}</span></li>)}</ol>
        </details>
      </section>

      <section className="sp-exim-enrol" data-r>
        <img src={asset("gallery/meetings-07.jpg")} alt="" loading="lazy" />
        <div>
          <p className="sp-eyebrow sp-eyebrow-light">How to enrol</p>
          <h2>Attend a free demo, meet our director, then decide.</h2>
          <ol className="sp-enrol-steps">
            <li><span>1</span>Call to book an enquiry session</li>
            <li><span>2</span>Meet our director in person</li>
            <li><span>3</span>Understand the course, then enrol</li>
          </ol>
          <div className="sp-hero-actions">
            <a href={COMPANY.phoneHref} className="sp-btn sp-btn-light"><SIcon name="phone" />{COMPANY.phoneDisplay}</a>
            <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent("EXIM training enquiry")}`} className="sp-btn sp-btn-ghost"><SIcon name="mail" />Email us</a>
          </div>
        </div>
      </section>

      <section className="sp-faq">
        <SectionHead eyebrow="FAQs" title="Frequently asked questions" align="center" />
        <Accordion items={EXIM.faqs} />
      </section>
    </Page>
  );
}
