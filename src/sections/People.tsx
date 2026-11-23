import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import BlockHead from "../components/BlockHead";
import { prefersReducedMotion } from "../lib/motion";
import { CONTACT, DIRECTOR_NAMES, DIRECTOR_PHOTOS, DIRECTOR_ROLES, GALLERY, TRAINING_MODULES } from "../data/content";

export default function People() {
  return (
    <section className="block" id="training">
      <BlockHead eyebrow="People & learning" title="Led by four directors. Teaching the next generation of exporters." />

      <div className="bento">
        <article className="tile tile-leaders c-7" data-reveal>
          <div className="avatars">
            {DIRECTOR_PHOTOS.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
          </div>
          <h3><Link to="/about-us">Four directors, one commitment: quality exports delivered on time.</Link></h3>
          <p className="leader-names">{DIRECTOR_NAMES.join(" · ")}</p>
          <div className="leader-roles">
            {DIRECTOR_ROLES.map((r) => <span key={r}>{r}</span>)}
          </div>
        </article>

        <article className="tile tile-vision c-5" data-reveal>
          <p className="eyebrow">Our vision</p>
          <blockquote>
            To be a globally trusted Indian export company, connecting farmers, producers and manufacturers with
            international markets through uncompromising quality, integrity and reliable service.
          </blockquote>
        </article>

        <article className="tile tile-training c-8 r-2" data-reveal>
          <div className="training-head">
            <span className="chip chip-glass"><Icon name="cap" />EXIM Training · Nagpur</span>
            <h3><Link to="/exim-training">Learn export–import from people who ship every month.</Link></h3>
            <p>A practical, 20-module programme for complete beginners: students, farmers, traders and business owners. Real documents, live consignments and actual case studies.</p>
          </div>
          <div className="modules" aria-label="Sample modules">
            <div className="modules-track">
              {TRAINING_MODULES.map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>
          <div className="training-foot">
            <ul className="training-facts">
              <li><b>20</b> modules</li>
              <li><b>3</b> batches: morning, evening, weekend</li>
              <li>Classroom &amp; online</li>
              <li>Completion certificate</li>
            </ul>
            <a className="btn btn-light" href={CONTACT.phoneHref}>Book a free demo <Icon name="arrow" /></a>
          </div>
        </article>

        <Gallery />
      </div>
    </section>
  );
}

function Gallery() {
  const tile = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0); // bump to restart the timer after a manual pick

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (tile.current) io.observe(tile.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % GALLERY.length), 3400);
    return () => window.clearInterval(t);
  }, [visible, cycle]);

  return (
    <article className="tile tile-gallery c-4 r-2" data-reveal ref={tile}>
      <div className="gallery-stack">
        {GALLERY.map((g, i) => (
          <figure key={g.src} className={i === index ? "is-on" : undefined}>
            <img src={g.src} alt="" loading="lazy" />
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="gallery-meta">
        <p className="eyebrow"><Link to="/gallery">Behind the scenes</Link></p>
        <div className="gallery-dots">
          {GALLERY.map((g, i) => (
            <button key={g.src} aria-label={`Photo ${i + 1}: ${g.caption}`} aria-current={i === index}
              onClick={() => { setIndex(i); setCycle((c) => c + 1); }} />
          ))}
        </div>
      </div>
    </article>
  );
}
