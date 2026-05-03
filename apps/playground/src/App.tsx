import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import ComponentPage from "./pages/ComponentPage";
import HomePage from "./pages/HomePage";
import BrandPage from "./pages/design/BrandPage";
import ColorsPage from "./pages/design/ColorsPage";
import TypographyPage from "./pages/design/TypographyPage";
import SpacingPage from "./pages/design/SpacingPage";
import IconsPage from "./pages/design/IconsPage";
import MemoryGraphPage from "./pages/design/MemoryGraphPage";
import MotionPage from "./pages/design/MotionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "components/:slug", element: <ComponentPage /> },
      { path: "design/brand", element: <BrandPage /> },
      { path: "design/colors", element: <ColorsPage /> },
      { path: "design/typography", element: <TypographyPage /> },
      { path: "design/spacing", element: <SpacingPage /> },
      { path: "design/icons", element: <IconsPage /> },
      { path: "design/memory-graph", element: <MemoryGraphPage /> },
      { path: "design/motion", element: <MotionPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
