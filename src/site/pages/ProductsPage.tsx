import { Link } from "react-router-dom";
import { Page, HeroSplit, SectionHead, usePageMeta } from "../components/ui";
import { SIcon } from "../components/SiteIcon";
import { TOP_CATEGORIES, CATALOGUE_TOTAL, asset } from "../data/catalogue";
import { PRODUCTS_PAGE } from "../data/pages";

export default function ProductsPage() {
  usePageMeta("Products", PRODUCTS_PAGE.heroText);
  return (
    <Page className="sp-products">
      <HeroSplit
        crumbs={[{ label: "Products" }]}
        eyebrow="Our products"
        title={PRODUCTS_PAGE.heroTitle}
        text={PRODUCTS_PAGE.heroText}
        image={asset("spice-trays.jpg")}
        imageAlt="Trays of Indian spices, seeds and nuts"
      >
        <div className="sp-hero-stats">
          <div><b>4</b><span>categories</span></div>
          <div><b>{CATALOGUE_TOTAL}</b><span>named products</span></div>
          <div><b>28</b><span>textile categories</span></div>
        </div>
      </HeroSplit>

      <section className="sp-topcats">
        {TOP_CATEGORIES.map((t, i) => (
          <article key={t.slug} className={`sp-topcat ${i % 2 ? "is-flip" : ""}`} data-r>
            <Link to={t.path} className="sp-topcat-media">
              <img src={t.image} alt={t.title} loading="lazy" />
              <span className="sp-topcat-index">{String(i + 1).padStart(2, "0")}</span>
            </Link>
            <div className="sp-topcat-copy">
              <p className="sp-eyebrow">{t.count} {t.countLabel}</p>
              <h2><Link to={t.path}>{t.title}</Link></h2>
              <p className="sp-topcat-summary">{t.summary}</p>
              <p>{t.description}</p>
              {t.children && (
                <ul className="sp-topcat-children">
                  {t.children.map((c) => (
                    <li key={c.path}><Link to={c.path}>{c.title}<SIcon name="arrow-ur" /></Link></li>
                  ))}
                </ul>
              )}
              <Link to={t.path} className="sp-btn sp-btn-dark">Explore {t.title} <SIcon name="arrow" /></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="sp-capabilities">
        <SectionHead eyebrow="Why buy from one partner" title="Consolidated orders, handled end to end." align="left" />
        <div className="sp-cap-row">
          {PRODUCTS_PAGE.capabilities.map((c, i) => (
            <div key={c.title} className="sp-cap" data-r>
              <span className="sp-cap-n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
