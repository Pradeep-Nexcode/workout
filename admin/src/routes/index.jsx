import { createBrowserRouter } from "react-router-dom";
import Categories from "../pages/category/Categories";
import RootLayout from '../RootLayout';
import Category from "../pages/category/Category";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/categories/create",
        element: <Category />,
      },
      {
        path: "/categories/:id",
        element: <Category />,
      }
    ]
  },
]);

export default routes;
