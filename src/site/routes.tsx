import { lazy, Suspense, type ReactNode } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

/* Subpage routes. Lazy-loaded so the homepage bundle and behaviour are unaffected. */

const SiteLayout = lazy(() => import("./components/Layout"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const AgriculturePage = lazy(() => import("./pages/AgriculturePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const EximPage = lazy(() => import("./pages/EximPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const S = ({ children }: { children: ReactNode }) => <Suspense fallback={<div className="sp-loading" />}>{children}</Suspense>;
const cat = (slug: string) => <S><CategoryPage key={slug} slug={slug} /></S>;

/* Original WordPress URLs → new URLs (the live Product page links to /textile-2/, which 404s). */
const LEGACY: [string, string][] = [
  ["product", "/products"],
  ["agriculture-product-page", "/products/agriculture"],
  ["fruits-vegetables", "/products/agriculture/fruits-vegetables"],
  ["dry-spices", "/products/agriculture/dry-spices"],
  ["grains", "/products/agriculture/grains-pulses-cereals"],
  ["frozen-vegetables", "/products/agriculture/frozen-vegetables"],
  ["dried-dehydrated", "/products/agriculture/dried-dehydrated"],
  ["cocopeat", "/products/agriculture/cocopeat"],
  ["makhana", "/products/agriculture/makhana"],
  ["nuts-seeds", "/products/nuts-seeds"],
  ["textile", "/products/textile"],
  ["textile-2", "/products/textile"],
  ["pharmaceuticals", "/products/pharmaceuticals"],
];

export const siteRoutes: RouteObject[] = [
  {
    element: <S><SiteLayout /></S>,
    children: [
      { path: "about-us", element: <S><AboutPage /></S> },
      { path: "products", element: <S><ProductsPage /></S> },
      { path: "products/agriculture", element: <S><AgriculturePage /></S> },
      { path: "products/agriculture/fruits-vegetables", element: cat("fruits-vegetables") },
      { path: "products/agriculture/dry-spices", element: cat("dry-spices") },
      { path: "products/agriculture/grains-pulses-cereals", element: cat("grains") },
      { path: "products/agriculture/frozen-vegetables", element: cat("frozen-vegetables") },
      { path: "products/agriculture/dried-dehydrated", element: cat("dried-dehydrated") },
      { path: "products/agriculture/cocopeat", element: cat("cocopeat") },
      { path: "products/agriculture/makhana", element: cat("makhana") },
      { path: "products/nuts-seeds", element: cat("nuts-seeds") },
      { path: "products/textile", element: cat("textile") },
      { path: "products/pharmaceuticals", element: cat("pharmaceuticals") },
      { path: "exim-training", element: <S><EximPage /></S> },
      { path: "gallery", element: <S><GalleryPage /></S> },
      { path: "contact", element: <S><ContactPage /></S> },
      ...LEGACY.map(([from, to]) => ({ path: from, element: <Navigate to={to} replace /> })),
      { path: "*", element: <S><NotFoundPage /></S> },
    ],
  },
];
