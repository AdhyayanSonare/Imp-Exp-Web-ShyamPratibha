import { Navigate, type RouteObject } from "react-router-dom";
import { CATEGORIES } from "../site/data/catalogue";
import Home from "./Home";
import { BlankPage, ContactPage, NotFound } from "./pages";
import { SiteLayout } from "./ui";

/* Original WordPress URLs → V2 URLs (the live site links Textile to /textile-2/, which 404s). */
const LEGACY: [string, string][] = [
  ["product", "/products"], ["agriculture-product-page", "/products/agriculture"], ["textile-2", "/products/textile"],
  ...CATEGORIES.map((c) => [new URL(c.sourceUrl).pathname.replace(/\//g, ""), c.path] as [string, string]),
];

export const v2Routes: RouteObject[] = [
  { index: true, element: <Home /> },
  {
    element: <SiteLayout />,
    children: [
      { path: "about-us", element: <BlankPage title="About us" /> },
      { path: "products", element: <BlankPage title="Products" /> },
      { path: "products/agriculture", element: <BlankPage title="Agriculture" /> },
      ...CATEGORIES.map((c) => ({ path: c.path.slice(1), element: <BlankPage key={c.slug} title={c.title} /> })),
      { path: "exim-training", element: <BlankPage title="EXIM Training" /> },
      { path: "gallery", element: <BlankPage title="Gallery" /> },
      { path: "contact", element: <ContactPage /> },
      ...LEGACY.map(([from, to]) => ({ path: from, element: <Navigate to={to} replace /> })),
      { path: "*", element: <NotFound /> },
    ],
  },
];
