import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import { MdKeyboardArrowRight } from "react-icons/md";

import { MobileNav } from "./MobileNav";

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div
      className={
        "relative bg-theme font-light text-themeText transition-[background-color] duration-500 ease-out"
      }
    >
      <div className="flex max-sm:min-h-screen max-sm:pb-20">
        {sidebarOpen ? (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-black shadow-2xl absolute left-[-8px] top-4 z-10 rounded-[8px]"
          >
            <MdKeyboardArrowRight className="rounded-[4px] w-[24px] h-[24px]" />
          </button>
        )}
        <Outlet />
      </div>
      <MobileNav />
    </div>
  );
};
