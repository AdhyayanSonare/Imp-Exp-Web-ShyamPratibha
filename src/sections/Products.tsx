import { useRef, useState } from "react";
import { Icon } from "../components/Icon";
import Counter from "../components/Counter";
import BlockHead from "../components/BlockHead";
import { gsap, useGSAP } from "../lib/motion";
import { AGRI_LINES, CATALOGUE_COUNTS, img, type AgriKey } from "../data/content";

export default function Products() {
  return (
    <section className="block" id="products">
      <BlockHead
        eyebrow="What we export"
        title="Four categories. One consolidated supplier."
        aside="Buyers can combine categories in a single order. Pick an agriculture line below to see what we list."
      />

      <div className="bento">
        <AgriSwitcher />

        <CategoryTile image="cat-nuts.jpg" alt="Assorted nuts and seeds" title="Nuts & Seeds"
          text="Cashew kernels, sesame, flax, chia, psyllium and more. 14 lines, freshly sourced." />
        <CategoryTile image="cat-pharma.jpg" alt="Tablets and capsules" title="Pharmaceuticals"
          text="15 therapeutic groups, from APIs and antibiotics to OTC and nutrition, with full documentation." />

        <article className="tile tile-rice c-4" data-reveal>
          <img src={img("rice.jpg")} alt="Raw basmati rice" loading="lazy" />
          <div className="tile-rice-body">
            <p className="eyebrow eyebrow-light">Basmati spotlight</p>
            <h3>Four basmati varieties, every finish.</h3>
            <div className="grade-row">
              {["1121", "1509", "1401", "Pusa"].map((g) => <span key={g}>{g}</span>)}
            </div>
            <p className="tile-foot">Steam · Raw · Sella · Golden Sella · Creamy Sella</p>
          </div>
        </article>

        <CategoryTile image="cat-textile.jpg" alt="Fabric on an industrial loom" title="Textiles"
          text="Fabrics, yarn and home textiles made to international standards. Range shared on request." />

        <CatalogueTile />
      </div>
    </section>
  );
}

function AgriSwitcher() {
  const [active, setActive] = useState<AgriKey>("fruits");
  // Two stacked image layers that crossfade; `front` is the visible one
  const [layers, setLayers] = useState<[string, string]>([AGRI_LINES[0].image, ""]);
  const [front, setFront] = useState<0 | 1>(0);
  const line = AGRI_LINES.find((l) => l.key === active)!;

  const show = (key: AgriKey) => {
    if (key === active) return;
    setActive(key);
    const next = AGRI_LINES.find((l) => l.key === key)!.image;
    if (layers[front] === next) return;
    const back = (1 - front) as 0 | 1;
    setLayers((ls) => { const copy: [string, string] = [...ls]; copy[back] = next; return copy; });
  };

  const onLayerLoad = (i: 0 | 1) => { if (i !== front && layers[i]) setFront(i); };
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  return (
    <article className="tile tile-agri c-8 r-2" data-reveal>
      <div className="agri-media">
        {layers.map((src, i) =>
          src ? (
            <img key={i} className={`agri-img${i === front ? " is-on" : ""}`} src={src} alt={i === front ? line.title : ""}
              loading="lazy" onLoad={() => onLayerLoad(i as 0 | 1)} />
          ) : null,
        )}
      </div>
      <div className="agri-body">
        <div className="agri-top">
          <span className="chip chip-glass">Agriculture · {AGRI_LINES.length} lines</span>
          <span className="agri-count"><b>{line.count}</b> products</span>
        </div>
        <h3>{line.title}</h3>
        <ul className="agri-list">
          {line.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="agri-tabs" role="tablist" aria-label="Agriculture lines">
          {AGRI_LINES.map((l) => (
            <button key={l.key} role="tab" aria-selected={l.key === active}
              onClick={() => show(l.key)} onMouseEnter={() => canHover() && show(l.key)}>
              {l.tab}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function CategoryTile({ image, alt, title, text }: { image: string; alt: string; title: string; text: string }) {
  return (
    <article className="tile tile-cat c-4" data-reveal>
      <img src={img(image)} alt={alt} loading="lazy" />
      <div className="tile-cat-body">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <span className="tile-arrow"><Icon name="arrow-ur" /></span>
    </article>
  );
}

function CatalogueTile() {
  const bars = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(bars.current!.children, {
      scaleY: 0, duration: 1, ease: "expo.out", stagger: 0.05,
      scrollTrigger: { trigger: bars.current, start: "top 92%", once: true },
    });
  }, { scope: bars });

  const max = Math.max(...CATALOGUE_COUNTS);
  return (
    <article className="tile tile-catalogue c-4" data-reveal>
      <p className="stat"><Counter to={150} /></p>
      <p className="stat-label">named products across nine catalogues</p>
      <div className="mini-bars" ref={bars} aria-hidden="true">
        {CATALOGUE_COUNTS.map((v, i) => <i key={i} style={{ height: `${(v / max) * 100}%` }} />)}
      </div>
      <a className="btn btn-dark" href="#contact">Request full catalogue <Icon name="arrow" /></a>
    </article>
  );
}
