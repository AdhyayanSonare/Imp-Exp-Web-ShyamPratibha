import { useCallback, useEffect, useMemo, useState } from "react";
import { Page, Breadcrumbs, usePageMeta } from "../components/ui";
import { SIcon } from "../components/SiteIcon";
import { asset } from "../data/catalogue";
import { GALLERY_PAGE } from "../data/pages";

/* Real company photographs, grouped by what they show. No per-photo captions (none are published). */

export default function GalleryPage() {
  usePageMeta("Gallery", GALLERY_PAGE.heroText);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const all = useMemo(
    () => GALLERY_PAGE.groups.flatMap((g) => g.images.map((id) => ({ id, group: g.id, groupTitle: g.title, src: asset(`gallery/${id}.jpg`) }))),
    [],
  );
  const visible = filter === "all" ? all : all.filter((x) => x.group === filter);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + visible.length) % visible.length)), [visible.length]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, close, step]);

  return (
    <Page className="sp-gallery">
      <section className="sp-gal-hero">
        <Breadcrumbs items={[{ label: "Gallery" }]} />
        <div className="sp-gal-hero-row">
          <h1>{GALLERY_PAGE.heroTitle}</h1>
          <p className="sp-lede">{GALLERY_PAGE.heroText}</p>
        </div>
        <div className="sp-gal-strip" aria-hidden="true">
          {all.slice(0, 6).map((x) => <img key={x.id} src={x.src} alt="" />)}
        </div>
      </section>

      <div className="sp-gal-filter" role="tablist" aria-label="Filter photos">
        <button role="tab" aria-selected={filter === "all"} onClick={() => setFilter("all")}>All <em>{all.length}</em></button>
        {GALLERY_PAGE.groups.map((g) => (
          <button key={g.id} role="tab" aria-selected={filter === g.id} onClick={() => setFilter(g.id)}>{g.title} <em>{g.images.length}</em></button>
        ))}
      </div>

      {(filter === "all" ? GALLERY_PAGE.groups : GALLERY_PAGE.groups.filter((g) => g.id === filter)).map((g) => (
        <section key={g.id} className="sp-gal-group">
          <h2 data-r>{g.title}</h2>
          <div className="sp-masonry">
            {g.images.map((id) => {
              const idx = visible.findIndex((x) => x.id === id);
              return (
                <button key={id} className="sp-masonry-item" onClick={() => setOpen(idx)} aria-label={`Open photo from ${g.title}`} data-r>
                  <img src={asset(`gallery/${id}.jpg`)} alt={`${g.title} photograph`} loading="lazy" />
                  <span className="sp-masonry-zoom"><SIcon name="expand" /></span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {open !== null && visible[open] && (
        <div className="sp-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <img src={visible[open].src} alt={`${visible[open].groupTitle} photograph`} onClick={(e) => e.stopPropagation()} />
          <p className="sp-lightbox-meta">{visible[open].groupTitle} · {open + 1} / {visible.length}</p>
          <button className="sp-lb-btn sp-lb-close" onClick={close} aria-label="Close"><SIcon name="x" /></button>
          <button className="sp-lb-btn sp-lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo"><SIcon name="chev-r" /></button>
          <button className="sp-lb-btn sp-lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo"><SIcon name="chev-r" /></button>
        </div>
      )}
    </Page>
  );
}
