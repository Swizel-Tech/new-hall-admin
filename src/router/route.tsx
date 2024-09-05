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
import Operators from "../pages/Operators";
import Profile from "../pages/Profile";
import ApplicationTable from "../pages/ApplicationTable";
import NonTeaching from "../pages/NonTeaching";
import Blog from "../pages/Blog";

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
        path: "/news/new_blog",
        element: <NewBlog />,
      },
      {
        path: "/news/new_blog/:blogId",
        element: <Blog />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "/staff/:staffId",
        element: <UserProfile />,
      },
      {
        path: "/operators",
        element: <Operators />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/applications",
        element: <ApplicationTable />,
      },
      {
        path: "/nonapplications",
        element: <NonTeaching />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
