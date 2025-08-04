import { createBrowserRouter } from "react-router-dom";
import Categories from "../pages/category/Categories";
import RootLayout from '../RootLayout';
import Category from "../pages/category/Category";
import Exercises from "../pages/exercise/Exercises";
import WorkoutPlans from "../pages/workoutPlan/WorkoutPlans";
import Exercise from "../pages/exercise/Exercise";
import WorkoutPlan from "../pages/workoutPlan/WorkoutPlan";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element:
          <h1>Workout Manager</h1>
        ,
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <Categories />,
          },
          {
            path: "create",
            element: <Category />,
          },
          {
            path: ":id",
            element: <Category />,
          },
        ],
      },
      {
        path: "exercises",
        children: [
          {
            index: true,
            element: <Exercises />,
          },
          {
            path: "create",
            element: <Exercise />,
          },
          {
            path: ":id",
            element: <Exercise />,
          },
        ],
      },
      {
        path: "workoutplans",

        children: [
          {
            index: true,
            element: <WorkoutPlans />,
          },
          {
            path: "create",
            element: <WorkoutPlan />,
          },
          {
            path: ":id",
            element: <WorkoutPlan />,
          },

        ],
      },
    ],
  },
]);

export default routes;
