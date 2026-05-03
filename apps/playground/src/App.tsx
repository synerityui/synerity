import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import ComponentPage from "./pages/ComponentPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "components/:slug", element: <ComponentPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
