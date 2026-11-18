import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { siteRoutes } from "./site/routes";
import "./styles.css";

// Enables JS-only initial states in CSS (e.g. tiles hidden before their reveal)
document.documentElement.classList.add("js");

// "/" renders the homepage exactly as before; every other path is a subpage.
const router = createBrowserRouter([{ path: "/", element: <App /> }, ...siteRoutes]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
