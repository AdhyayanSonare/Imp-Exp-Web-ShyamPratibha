import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SIcon } from "./SiteIcon";
import { enquiryMailto } from "./ui";
import { asset, getCategory, type Category, type Product } from "../data/catalogue";

/* ───────── Product catalogue: group filter + search + image cards ───────── */

export function ProductCatalogue({ category }: { category: Category }) {
  const [group, setGroup] = useState<string>("all");
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();

  const match = (p: Product) =>
    !needle || `${p.name} ${p.detail ?? ""}`.toLowerCase().includes(needle);

  const sections = useMemo(
    () =>
      category.groups
        .filter((g) => group === "all" || g.id === group)
        .map((g) => ({ ...g, items: category.products.filter((p) => p.group === g.id && match(p)) }))
        .filter((g) => g.items.length > 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, group, needle],
  );
  const shown = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <section className="sp-catalogue" id="catalogue" aria-label={`${category.shortTitle} products`}>
      <div className="sp-cat-toolbar" data-r>
        <div className="sp-cat-chips" role="tablist" aria-label="Filter by group">
          <button role="tab" aria-selected={group === "all"} onClick={() => setGroup("all")}>
            All <em>{category.products.length}</em>
          </button>
          {category.groups.map((g) => (
            <button key={g.id} role="tab" aria-selected={group === g.id} onClick={() => setGroup(g.id)}>
              {g.name} <em>{category.products.filter((p) => p.group === g.id).length}</em>
            </button>
          ))}
        </div>
        <label className="sp-cat-search">
          <SIcon name="search" />
          <input type="search" placeholder={`Search ${category.shortTitle.toLowerCase()}`} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
        </label>
      </div>

      {sections.map((s) => (
        <div className="sp-cat-group" key={s.id} id={`group-${s.id}`}>
          <div className="sp-cat-group-head" data-r>
            <h3>{s.name}</h3>
            <p>{s.note}</p>
            <span>{s.items.length} {s.items.length === 1 ? "product" : "products"}</span>
          </div>
          <ul className="sp-grid">
            {s.items.map((p) => <ProductCard key={p.image} product={p} category={category} />)}
          </ul>
        </div>
      ))}

      {shown === 0 && (
        <p className="sp-cat-empty">No products match “{q}”. <button onClick={() => { setQ(""); setGroup("all"); }}>Clear search</button></p>
      )}
    </section>
  );
}

function ProductCard({ product, category }: { product: Product; category: Category }) {
  const full = product.detail ? `${product.name} (${product.detail})` : product.name;
  return (
    <li className="sp-card" data-r>
      <div className="sp-card-img"><img src={asset(product.image)} alt={full} loading="lazy" /></div>
      <div className="sp-card-body">
        <h4>{product.name}</h4>
        {product.detail && <p>{product.detail}</p>}
      </div>
      <a className="sp-card-enq" href={enquiryMailto(`Enquiry: ${full}`, [`I'd like a quotation for ${full} (${category.shortTitle}).`, "Quantity:", "Destination:"])} aria-label={`Enquire about ${full}`}>
        Enquire <SIcon name="arrow-ur" />
      </a>
    </li>
  );
}

/* ───────── Related categories ───────── */

export function RelatedCategories({ slugs }: { slugs: string[] }) {
  return (
    <section className="sp-related">
      <div className="sp-related-head" data-r>
        <p className="sp-eyebrow">Keep exploring</p>
        <h2>Related categories</h2>
      </div>
      <div className="sp-related-row">
        {slugs.map((s) => {
          const c = getCategory(s);
          return (
            <Link key={s} to={c.path} className="sp-related-card" data-r>
              <img src={c.heroImage} alt="" loading="lazy" />
              <div>
                <span>{c.products.length} products</span>
                <h3>{c.shortTitle}</h3>
              </div>
              <i><SIcon name="arrow-ur" /></i>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ───────── Category feature modules (one composition per page type) ───────── */

export function CategoryFeature({ category }: { category: Category }) {
  switch (category.feature) {
    case "basmati-matrix": return <BasmatiMatrix category={category} />;
    case "forms-matrix": return <FormsMatrix category={category} />;
    case "grade-scale": return <GradeScale category={category} />;
    case "mix-builder": return <MixBuilder category={category} />;
    case "group-index": return <GroupIndex category={category} />;
    case "pharma-note": return <PharmaNote category={category} />;
    case "grow-media": return <GrowMedia category={category} />;
    default: return <Mosaic category={category} />;
  }
}

function FeatureCopy({ category, children }: { category: Category; children?: ReactNode }) {
  return (
    <div className="sp-feature-copy" data-r>
      <p className="sp-eyebrow">{category.shortTitle}</p>
      <h2>{category.featureTitle}</h2>
      <p>{category.featureText}</p>
      {children}
    </div>
  );
}

/** Asymmetric image mosaic of four products, sampled across the groups. */
function Mosaic({ category }: { category: Category }) {
  const picks = useMemo(() => {
    const byGroup = category.groups.map((g) => category.products.filter((p) => p.group === g.id));
    const out: Product[] = [];
    for (let i = 0; out.length < 4 && i < 8; i++) byGroup.forEach((arr) => { if (arr[i] && out.length < 4) out.push(arr[i]); });
    return out;
  }, [category]);
  return (
    <section className="sp-feature sp-feature-mosaic">
      <FeatureCopy category={category}>
        <a href="#catalogue" className="sp-btn sp-btn-dark">See all {category.products.length} products <SIcon name="arrow" /></a>
      </FeatureCopy>
      <div className="sp-mosaic" data-r>
        {picks.map((p, i) => (
          <figure key={p.image} className={`m${i}`}>
            <img src={asset(p.image)} alt={p.name} loading="lazy" />
            <figcaption>{p.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** Grains: varieties × finishes, built only from the published basmati names. */
function BasmatiMatrix({ category }: { category: Category }) {
  const basmati = category.products.filter((p) => p.group === "basmati");
  const finishes = ["Raw", "Steam", "Sella", "Golden Sella", "Creamy Sella"];
  const varieties = ["1121", "1509", "1401", "Pusa"];
  const has = (v: string, f: string) =>
    basmati.some((p) => {
      const label = `${p.name} ${p.detail ?? ""}`;
      if (!label.includes(v)) return false;
      if (f === "Sella") return /\bSella\b/.test(label) && !/Golden Sella|Creamy Sella/.test(label);
      return label.includes(f);
    });
  return (
    <section className="sp-feature sp-feature-matrix">
      <FeatureCopy category={category}>
        <p className="sp-note">Also listed: 100% broken rice for brewing, animal feed and flour.</p>
      </FeatureCopy>
      <div className="sp-matrix-wrap" data-r>
        <table className="sp-matrix">
          <thead>
            <tr><th scope="col">Variety</th>{finishes.map((f) => <th key={f} scope="col">{f}</th>)}</tr>
          </thead>
          <tbody>
            {varieties.map((v) => (
              <tr key={v}>
                <th scope="row">{v}</th>
                {v === "Pusa" ? (
                  <td colSpan={finishes.length} className="sp-matrix-span">Listed as Pusa Basmati Rice (finish not specified)</td>
                ) : (
                  finishes.map((f) => (
                    <td key={f}>
                      {has(v, f)
                        ? <span className="sp-matrix-yes" aria-label="Listed"><SIcon name="check" /></span>
                        : <span className="sp-matrix-no" aria-label="Not listed">–</span>}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Dehydrated: onion vs garlic by format. */
function FormsMatrix({ category }: { category: Category }) {
  const forms = [
    { label: "Flakes", test: /Flakes/ }, { label: "Chopped", test: /Chopped/ }, { label: "Minced", test: /Minced/ },
    { label: "Granules, big", test: /Granules Big/ }, { label: "Granules, small", test: /Granules Small/ },
    { label: "Powder", test: /Powder/ }, { label: "Crispy fried", test: /Fried/ },
  ];
  const col = (g: string) => category.products.filter((p) => p.group === g);
  return (
    <section className="sp-feature sp-feature-forms">
      <FeatureCopy category={category} />
      <div className="sp-forms" data-r>
        {(["onion", "garlic"] as const).map((g) => (
          <div key={g} className={`sp-forms-col sp-forms-${g}`}>
            <h3>{g === "onion" ? "Onion" : "Garlic"}</h3>
            <ul>
              {forms.map((f) => {
                const hits = col(g).filter((p) => f.test.test(p.name));
                return (
                  <li key={f.label} className={hits.length ? "is-on" : undefined}>
                    <span>{f.label}</span>
                    {hits.length ? <em>{hits.length > 1 ? `${hits.length} types` : <SIcon name="check" />}</em> : <em>–</em>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Makhana: size grades on a scale + flavour chips. */
function GradeScale({ category }: { category: Category }) {
  const grades = [
    { g: "4+", band: "12–15 mm", w: 46 },
    { g: "5+", band: "12–18 mm", w: 66 },
    { g: "6+", band: "Above 19 mm", w: 90 },
  ];
  const flavours = category.products.filter((p) => p.group === "flavoured");
  return (
    <section className="sp-feature sp-feature-grades">
      <FeatureCopy category={category} />
      <div className="sp-grades" data-r>
        {grades.map((x) => (
          <div key={x.g} className="sp-grade">
            <span className="sp-grade-g">{x.g}</span>
            <div className="sp-grade-bar"><i style={{ width: `${x.w}%` }} /></div>
            <span className="sp-grade-band">{x.band}</span>
          </div>
        ))}
        <p className="sp-note">Also available as an assorted mix grade.</p>
        <div className="sp-flavours">
          <h3>{flavours.length} flavours</h3>
          <div>{flavours.map((f) => <span key={f.name}>{f.name.replace(/ Makhana$/, "")}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

/** Frozen: three mixes broken into their listed components. */
function MixBuilder({ category }: { category: Category }) {
  const mixes = category.products.filter((p) => p.group === "mixes");
  return (
    <section className="sp-feature sp-feature-mix">
      <FeatureCopy category={category}>
        <p className="sp-ico-line"><SIcon name="snow" />Shipped frozen, through cold-chain logistics.</p>
      </FeatureCopy>
      <div className="sp-mixes" data-r>
        {mixes.map((m, i) => {
          const parts = (m.detail ?? "").replace(/\band\b/g, ",").split(",").map((s) => s.trim()).filter(Boolean);
          return (
            <div className="sp-mix" key={m.image}>
              <img src={asset(m.image)} alt={`${m.name}: ${m.detail}`} loading="lazy" />
              <div>
                <span className="sp-mix-n">Mix {String.fromCharCode(65 + i)}</span>
                <ul>{parts.map((p) => <li key={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</li>)}</ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Textile: six families as an index with cover images. */
function GroupIndex({ category }: { category: Category }) {
  return (
    <section className="sp-feature sp-feature-index">
      <FeatureCopy category={category} />
      <div className="sp-index" data-r>
        {category.groups.map((g, i) => {
          const items = category.products.filter((p) => p.group === g.id);
          return (
            <a key={g.id} href={`#group-${g.id}`} className={`sp-index-card i${i}`}>
              <img src={asset(items[0].image)} alt="" loading="lazy" />
              <div>
                <span>{String(i + 1).padStart(2, "0")} · {items.length} categories</span>
                <h3>{g.name}</h3>
                <p>{g.note}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function PharmaNote({ category }: { category: Category }) {
  const steps = [
    { icon: "box" as const, title: "Share your requirement", text: "Product category, molecule or formulation, quantity and destination." },
    { icon: "file" as const, title: "Documentation check", text: "We confirm the paperwork and import eligibility your market requires." },
    { icon: "ship" as const, title: "Quotation & shipment", text: "A quotation follows, with shipment coordinated end to end." },
  ];
  return (
    <section className="sp-feature sp-feature-pharma">
      <FeatureCopy category={category} />
      <ol className="sp-steps" data-r>
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="sp-steps-n">{i + 1}</span>
            <SIcon name={s.icon} />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function GrowMedia({ category }: { category: Category }) {
  return (
    <section className="sp-feature sp-feature-grow">
      <FeatureCopy category={category} />
      <div className="sp-grow" data-r>
        {category.groups.map((g) => {
          const items = category.products.filter((p) => p.group === g.id);
          return (
            <div className="sp-grow-col" key={g.id}>
              <div className="sp-grow-imgs">
                {items.slice(0, 2).map((p) => <img key={p.image} src={asset(p.image)} alt={p.name} loading="lazy" />)}
              </div>
              <h3>{g.name}</h3>
              <ul>{items.map((p) => <li key={p.image}>{p.name}</li>)}</ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
