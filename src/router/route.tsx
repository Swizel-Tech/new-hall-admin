import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../components/ui/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Form from "../pages/Form";
import Staff from "../pages/Staff";
import Calendar from "../pages/Calendar";
import ViewBlog from "../pages/ViewBlog";
import NewBlog from "../pages/NewBlog";
import News from "../pages/News";
import UserProfile from "../pages/UserProfile";

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
      {
        path: "blog",
        element: <ViewBlog />,
      },
      {
        path: "new_blog",
        element: <NewBlog />,
      },
      {
        path: "/new_blog/:blogId",
        element: <NewBlog />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "/staffprofile",
        element: <UserProfile />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
