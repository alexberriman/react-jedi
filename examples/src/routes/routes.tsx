import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/layout";
import { HomePage } from "../pages/home";
import { ShowcasePage } from "../pages/showcase";
import { DocumentationPage } from "../pages/documentation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "showcase",
        element: <ShowcasePage />,
      },
      {
        path: "documentation",
        element: <DocumentationPage />,
      },
    ],
  },
]);