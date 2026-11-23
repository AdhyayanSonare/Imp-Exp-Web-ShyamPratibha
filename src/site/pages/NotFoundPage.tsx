import { Link } from "react-router-dom";
import { Page, usePageMeta } from "../components/ui";
import { SIcon } from "../components/SiteIcon";
import { TOP_CATEGORIES } from "../data/catalogue";

export default function NotFoundPage() {
  usePageMeta("Page not found", "The page you were looking for could not be found.");
  return (
    <Page className="sp-404">
      <section className="sp-404-box">
        <p className="sp-eyebrow">Error 404</p>
        <h1>This page has shipped elsewhere.</h1>
        <p className="sp-lede">The page you were looking for doesn't exist or has moved. Try one of these instead.</p>
        <div className="sp-404-links">
          <Link to="/" className="sp-btn sp-btn-dark">Back to home <SIcon name="arrow" /></Link>
          {TOP_CATEGORIES.map((t) => <Link key={t.slug} to={t.path} className="sp-btn sp-btn-outline">{t.title}</Link>)}
        </div>
      </section>
    </Page>
  );
}
