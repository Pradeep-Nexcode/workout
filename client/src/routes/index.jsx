import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../RootLayout';

import Home from "../pages/Home";
import Exercise from "../pages/Exercise";
import Categories from "../pages/Categories";
import Category from "../pages/Category";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element:
          <Home />
        ,
      },
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "category/:id",
        element: <Category />
      },
      {
        path: "exercise/:id",
        element: <Exercise />
      }



    ],
  },
]);

export default routes;
