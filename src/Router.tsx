import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TaskDetail from "./pages/TaskDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetail />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
