import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { CONTACT, NAV_LINKS, img } from "../data/content";

export default function Contact() {
  return (
    <section className="block" id="contact">
      <div className="bento">
        <article className="tile tile-cta c-8" data-reveal>
          <img src={img("port-jnpt.jpg")} alt="" loading="lazy" />
          <div className="tile-cta-body">
            <p className="eyebrow eyebrow-light">Start your export–import journey</p>
            <h2>Share your requirement. Get a customised quote.</h2>
            <ul className="cta-points">
              {["Customised quote", "Reliable support", "Seamless global trade"].map((p) => (
                <li key={p}><Icon name="check" />{p}</li>
              ))}
            </ul>
            <div className="cta-btns">
              <a className="btn btn-light" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Quote request")}`}>
                Email your requirement <Icon name="arrow" />
              </a>
              <a className="btn btn-ghost" href={CONTACT.phoneHref}><Icon name="phone" />Call us</a>
            </div>
          </div>
        </article>

        <article className="tile tile-contact c-4" data-reveal>
          <p className="eyebrow">Head office</p>
          <a className="contact-row" href={CONTACT.mapHref} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" /><span>{CONTACT.address}</span>
          </a>
          <a className="contact-row" href={CONTACT.phoneHref}><Icon name="phone" /><span>{CONTACT.phoneDisplay}</span></a>
          <a className="contact-row" href={`mailto:${CONTACT.email}`}><Icon name="mail" /><span>{CONTACT.email}</span></a>
        </article>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="brand brand-dark" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-word">Pratibhashyam Exports Pvt Ltd</span>
        </a>
        <nav aria-label="Footer">
          {NAV_LINKS.map((l) => <Link key={l.href} to={l.href}>{l.label}</Link>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Pratibhashyam Exports Pvt Ltd. Nagpur, India.</p>
        <p><a href={`${import.meta.env.BASE_URL}CREDITS.md`}>Photo credits</a></p>
      </div>
    </footer>
  );
}
