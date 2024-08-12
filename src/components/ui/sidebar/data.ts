import { SideNavProps } from "./SideNav";
import { Home, User, DocumentText } from "react-huge-icons/outline";
// import { BsDatabase, BsFillBarChartFill } from "react-icons/bs";

export const sidebarData: SideNavProps[] = [
  { href: "/dashboard", icon: Home, text: "Dashboard", dropdown: false },
  {
    href: "/calendar",
    icon: DocumentText,
    text: "School Calendar",
    dropdown: false,
  },
  {
    href: "/staff",
    icon: User,
    text: "Staff",
    dropdown: false,
  },
  // {
  //   href: "/settings",
  //   icon: BsDatabase,
  //   text: "Data Repository",
  //   dropdown: false,
  // },
  // { href: "/settings", icon: BsDatabase, text: "Training", dropdown: false },
  // {
  //   href: "/settings",
  //   icon: BsFillBarChartFill,
  //   text: "Report & Insights",
  //   dropdown: true,
  // },
];
