import { SideNavProps } from "./SideNav";
import {
  Home,
  User,
  DocumentText,
  ArchiveDocument,
  UserAdd,
} from "react-huge-icons/outline";
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
    text: "Active Staff",
    dropdown: false,
  },
  {
    href: "/news",
    icon: ArchiveDocument,
    text: "School News",
    dropdown: false,
  },
  {
    href: "/operators",
    icon: UserAdd,
    text: "Operator",
    dropdown: false,
  },
];
