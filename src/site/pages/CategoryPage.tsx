import { Link } from "react-router-dom";
import { Page, HeroCard, usePageMeta, enquiryMailto, type Crumb } from "../components/ui";
import { ProductCatalogue, CategoryFeature, RelatedCategories } from "../components/Catalogue";
import { SIcon } from "../components/SiteIcon";
import { getCategory } from "../data/catalogue";

/* One template for all ten catalogue pages; each page differs by copy, groups and feature module. */

export default function CategoryPage({ slug }: { slug: string }) {
  const c = getCategory(slug);
  usePageMeta(c.title, c.lede);

  const crumbs: Crumb[] = [{ label: "Products", to: "/products" }];
  if (c.parent === "agriculture") crumbs.push({ label: "Agriculture", to: "/products/agriculture" });
  crumbs.push({ label: c.shortTitle });

  return (
    <Page className={`sp-cat sp-cat-${c.slug}`}>
      <HeroCard crumbs={crumbs} eyebrow={c.eyebrow} title={c.title} text={c.lede} image={c.heroImage}>
        <div className="sp-hero-facts">
          {c.highlights.map((h) => (
            <div key={h.label}><b>{h.value}</b><span>{h.label}</span></div>
          ))}
        </div>
      </HeroCard>

      <section className="sp-intro">
        <div className="sp-intro-lead" data-r>
          <p className="sp-eyebrow">Overview</p>
          <p className="sp-intro-big">{c.body[0]}</p>
        </div>
        <div className="sp-intro-side" data-r>
          <p>{c.body[1]}</p>
          <div className="sp-intro-groups">
            {c.groups.map((g) => (
              <a key={g.id} href={`#group-${g.id}`}>
                <span>{g.name}</span>
                <em>{c.products.filter((p) => p.group === g.id).length}</em>
              </a>
            ))}
          </div>
          <a className="sp-btn sp-btn-dark" href={enquiryMailto(`Enquiry: ${c.shortTitle}`, [`I'm interested in your ${c.shortTitle} range.`, "Products:", "Quantity:", "Destination:"])}>
            Request a quote <SIcon name="arrow" />
          </a>
        </div>
      </section>

      <CategoryFeature category={c} />

      <ProductCatalogue category={c} />

      <section className="sp-cat-note" data-r>
        <SIcon name="file" />
        <p>
          Product names are listed as published in our catalogue. Grades, specifications, packaging and availability are
          confirmed for each enquiry. <Link to="/contact">Contact our team</Link> with your requirement.
        </p>
      </section>

      <RelatedCategories slugs={c.related} />
    </Page>
  );
}
