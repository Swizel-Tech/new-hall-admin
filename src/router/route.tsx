import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../components/ui/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Form from "../pages/Form";
import Staff from "../pages/Staff";
import Calendar from "../pages/Calendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Form />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
