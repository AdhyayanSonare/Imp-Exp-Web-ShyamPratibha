import { useRef, useState } from "react";
import { Icon } from "../components/Icon";
import BlockHead from "../components/BlockHead";
import { gsap, useGSAP } from "../lib/motion";
import { EXPORT_DOCS, PROCESS_STEPS, img } from "../data/content";

export default function Process() {
  return (
    <section className="block" id="process">
      <BlockHead
        eyebrow="How we work"
        title="From farm to container, every step is ours."
        aside="We inspect at source, coordinate with logistics partners and supervise loading ourselves."
      />

      <div className="bento">
        <ProcessTile />

        <article className="tile tile-photo c-4 r-2" data-reveal>
          <img src={img("ops-packing.jpg")} alt="Fresh drumsticks being packed into an export carton" loading="lazy" />
          <div className="tile-photo-body">
            <span className="chip chip-glass"><Icon name="leaf" />Direct sourcing</span>
            <h3>Straight from farmers and FPOs.</h3>
            <p>Traceable, fresh produce at fair prices, without unnecessary middlemen.</p>
          </div>
        </article>

        <article className="tile tile-docs c-4 r-2" data-reveal>
          <Icon name="file" className="tile-ico" />
          <h3>Complete export documentation</h3>
          <p>Prepared and checked in-house, so goods clear customs without surprises.</p>
          <div className="doc-stack">
            {EXPORT_DOCS.map((d) => <div className="doc" key={d}><Icon name="check" />{d}</div>)}
          </div>
        </article>

        <article className="tile tile-quality c-4" data-reveal>
          <Icon name="shield" className="tile-ico" />
          <h3>Quality-assured</h3>
          <p>Inspected and graded before dispatch, against international standards and the approved buyer sample.</p>
        </article>

        <article className="tile tile-freight c-4" data-reveal>
          <h3>Sea &amp; air freight</h3>
          <div className="freight-modes">
            <span><Icon name="ship" />Sea</span>
            <span><Icon name="plane" />Air</span>
          </div>
          <div className="incoterms">{["FOB", "CFR", "CIF"].map((t) => <span key={t}>{t}</span>)}</div>
          <p className="tile-foot">With shipment tracking until delivery.</p>
        </article>

        <article className="tile tile-map c-7" data-reveal>
          <div className="map-copy">
            <p className="eyebrow">Global presence</p>
            <h3>Offices in India and Dubai, with a network of buyers, distributors and partners abroad.</h3>
          </div>
          <PresenceMap />
        </article>

        <article className="tile tile-photo c-5" data-reveal>
          <img src={img("ops-container.jpg")} alt="Bagged goods loaded into a shipping container" loading="lazy" />
          <div className="tile-photo-body">
            <h3>We supervise every loading.</h3>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProcessTile() {
  const tile = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [lit, setLit] = useState(0);

  useGSAP(() => {
    gsap.to(fill.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: tile.current, start: "top 78%", end: "bottom 40%", scrub: 0.6,
        onUpdate: (self) => setLit(Math.floor(self.progress * PROCESS_STEPS.length + 0.2)),
      },
    });
  }, { scope: tile });

  return (
    <article className="tile tile-process c-12" data-reveal ref={tile}>
      <div className="process-track" aria-hidden="true"><span className="process-fill" ref={fill} /></div>
      <ol className="process-steps">
        {PROCESS_STEPS.map((s, i) => (
          <li key={s.title} className={i < lit ? "is-lit" : undefined}>
            <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

function PresenceMap() {
  return (
    <svg className="map" viewBox="0 0 520 240" aria-hidden="true">
      <defs>
        <pattern id="dotgrid" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" /></pattern>
      </defs>
      <rect className="map-dots" width="520" height="240" fill="url(#dotgrid)" />
      <path className="map-arc" d="M378 168 C 330 70, 230 60, 170 120" />
      <path className="map-arc map-arc-faint" d="M378 168 C 420 90, 470 70, 500 60" />
      <path className="map-arc map-arc-faint" d="M378 168 C 300 200, 120 210, 40 150" />
      <path className="map-arc map-arc-faint" d="M378 168 C 420 200, 460 210, 505 200" />
      <g className="map-pin" transform="translate(378 168)"><circle r="14" className="pulse" /><circle r="6" /></g>
      <g className="map-pin map-pin-2" transform="translate(170 120)"><circle r="14" className="pulse" /><circle r="6" /></g>
      <text x="392" y="190">Nagpur, India</text>
      <text x="104" y="104">Dubai, UAE</text>
    </svg>
  );
}
