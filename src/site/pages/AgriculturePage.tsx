import { Link } from "react-router-dom";
import { Page, HeroCard, SectionHead, usePageMeta } from "../components/ui";
import { SIcon } from "../components/SiteIcon";
import { AGRI_CATEGORIES, AGRI_TOTAL, asset } from "../data/catalogue";
import { AGRICULTURE_PAGE, FARM_TO_CONTAINER } from "../data/pages";

export default function AgriculturePage() {
  usePageMeta("Agriculture", AGRICULTURE_PAGE.heroText);
  return (
    <Page className="sp-agri">
      <HeroCard
        crumbs={[{ label: "Products", to: "/products" }, { label: "Agriculture" }]}
        eyebrow="Product category"
        title={AGRICULTURE_PAGE.heroTitle}
        text={AGRICULTURE_PAGE.heroText}
        image={asset("cat-agri.jpg")}
      >
        <div className="sp-hero-facts">
          <div><b>7</b><span>product lines</span></div>
          <div><b>{AGRI_TOTAL}</b><span>products listed</span></div>
        </div>
      </HeroCard>

      {/* Table-of-contents composition: curved image + numbered lines */}
      <section className="sp-toc">
        <div className="sp-toc-media" data-r>
          <img src={asset("ops-field.jpg")} alt="Our team on a farm visit" loading="lazy" />
          <div className="sp-toc-label">
            <span>Agriculture</span>
            <b>7 lines</b>
          </div>
        </div>
        <div className="sp-toc-list">
          <div data-r>
            <p className="sp-eyebrow">{AGRICULTURE_PAGE.introTitle}</p>
            <p className="sp-toc-intro">{AGRICULTURE_PAGE.introText}</p>
          </div>
          <ol>
            {AGRI_CATEGORIES.map((c, i) => (
              <li key={c.slug} data-r>
                <Link to={c.path}>
                  <span className="sp-toc-dot">{i + 1}</span>
                  <span className="sp-toc-text">
                    <b>{c.shortTitle}</b>
                    <small>{c.lede}</small>
                  </span>
                  <em>{c.products.length}</em>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-agri-bento">
        <SectionHead eyebrow="Browse the lines" title="Seven ways into Indian agriculture." text="Open a line to see its complete product list." />
        <div className="sp-bento">
          {AGRI_CATEGORIES.map((c, i) => (
            <Link key={c.slug} to={c.path} className={`sp-bento-tile b${i}`} data-r>
              <img src={c.heroImage} alt="" loading="lazy" />
              <div className="sp-bento-body">
                <span>{c.products.length} products</span>
                <h3>{c.shortTitle}</h3>
                <p>{c.groups.map((g) => g.name).join(" · ")}</p>
              </div>
              <i><SIcon name="arrow-ur" /></i>
            </Link>
          ))}
        </div>
        <div className="sp-bento-note" data-r>
          <SIcon name="layers" />
          <h3>Combine lines in one order</h3>
          <p>Spices with pulses, makhana with dehydrated onion: buyers can mix categories in a single consignment.</p>
          <Link to="/contact" className="sp-btn sp-btn-dark">Request a quote <SIcon name="arrow" /></Link>
        </div>
      </section>

      <section className="sp-stagger-sec">
        <SectionHead eyebrow="How we work" title="From farm to container." text="Every step matters, from sourcing fresh produce to loading export-ready containers." />
        <ol className="sp-stagger">
          {FARM_TO_CONTAINER.map((s, i) => (
            <li key={s.n} className={i % 2 ? "is-right" : ""} data-r>
              <span className="sp-stagger-n">{s.n}</span>
              <div className="sp-stagger-bar">
                <small>{s.tag}</small>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Page>
  );
}
