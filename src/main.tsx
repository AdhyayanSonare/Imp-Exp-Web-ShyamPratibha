import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import App from "./App";
import { siteRoutes } from "./site/routes";
import "./styles.css";

// Enables JS-only initial states in CSS (e.g. tiles hidden before their reveal)
document.documentElement.classList.add("js");

// "/" is the homepage; every other path is a subpage. ScrollRestoration opens new pages at
// the top and restores the previous position on Back.
const router = createBrowserRouter([
  {
    path: "/",
    element: <><ScrollRestoration /><Outlet /></>,
    children: [{ index: true, element: <App /> }, ...siteRoutes],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
