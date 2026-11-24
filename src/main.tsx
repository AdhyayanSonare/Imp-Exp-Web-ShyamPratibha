import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import { v2Routes } from "./v2/routes";

/* V2. The V1 homepage (App.tsx) and subpages (src/site/routes.tsx) are no longer mounted. */
const router = createBrowserRouter([
  { path: "/", element: <><ScrollRestoration /><Outlet /></>, children: v2Routes },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
