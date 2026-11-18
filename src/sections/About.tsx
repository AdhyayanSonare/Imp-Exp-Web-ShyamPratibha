import { Icon } from "../components/Icon";
import Counter from "../components/Counter";
import BlockHead from "../components/BlockHead";
import { img } from "../data/content";

export default function About() {
  return (
    <section className="block" id="about">
      <BlockHead
        eyebrow="Who we are"
        title="An Indian export house that runs the whole chain itself."
        aside="Procurement, inspection, packing, paperwork and freight are all managed by one team in Nagpur, so buyers deal with one partner from farm to port."
      />

      <div className="bento">
        <article className="tile tile-photo c-6 r-2" data-reveal>
          <img src={img("ops-field.jpg")} alt="The Pratibhashyam team on a farm visit" loading="lazy" />
          <div className="tile-photo-body">
            <span className="chip chip-glass"><Icon name="pin" />Nagpur, Maharashtra</span>
            <h3>Rooted in India, trusted across the world.</h3>
            <p>Pratibhashyam Exports Pvt Ltd connects Indian farmers, producers and manufacturers with importers abroad, through direct sourcing, honest dealing and consistent quality.</p>
          </div>
        </article>

        {/* Figures as published on the live site — confirm source and date before launch (audit §3.2). */}
        <article className="tile tile-stat tile-stat-hero c-6" data-reveal data-verify>
          <div>
            <p className="stat"><Counter to={5000} />+</p>
            <p className="stat-label">Farmers connected</p>
          </div>
          <div className="farmer-dots" aria-hidden="true" />
        </article>

        <article className="tile tile-stat c-3" data-reveal data-verify>
          <Icon name="ship" className="tile-ico" />
          <p className="stat"><Counter to={15} />+</p>
          <p className="stat-label">Countries served</p>
        </article>

        <article className="tile tile-stat tile-dark c-3" data-reveal data-verify>
          <div className="stars" role="img" aria-label="4.9 out of 5 stars">
            {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" />)}
          </div>
          <p className="stat">4.9<small>/5</small></p>
          <p className="stat-label">Google rating</p>
        </article>

        <article className="tile c-4" data-reveal>
          <Icon name="users" className="tile-ico" />
          <h3>For importers</h3>
          <p>Distributors, wholesalers and importers who need a dependable Indian supplier, with graded consignments that match the approved sample.</p>
        </article>

        <article className="tile c-4" data-reveal>
          <Icon name="leaf" className="tile-ico" />
          <h3>For farmers &amp; FPOs</h3>
          <p>We help Farmer Producer Organisations and smallholders reach export markets, and run awareness sessions on procedures and quality standards.</p>
        </article>

        <article className="tile tile-tint c-4" data-reveal data-verify>
          <p className="stat"><Counter to={10} />+</p>
          <p className="stat-label">Years of industry experience</p>
          <p className="tile-foot">Four directors oversee every consignment, from sourcing to the container door.</p>
        </article>
      </div>
    </section>
  );
}
