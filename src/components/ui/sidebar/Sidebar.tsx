import { useState } from "react";
import { sidebarData } from "./data";
import { SideNav } from "./SideNav";
import { IoIosLogOut } from "react-icons/io";
import { african } from "../../../assets";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { log_out } from "../../../utils/apiService";
import { useUser } from "../../../context/user-provider";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleSlideIn = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleSidebar();
  };

  const handleLogout = async () => {
    try {
      await log_out(user.staffRec._id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      className={`relative bg-[#323232] top-0 h-screen w-full max-w-fit max-sm:hidden lg:max-w-[260px] px-3 lg:pt-5 lg:pb-5 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={handleSlideIn}
        className="bg-white absolute right-[-10px] z-10 rounded-[8px]"
      >
        <MdKeyboardArrowLeft className="rounded-[4px] w-[24px] h-[24px]" />
      </button>
      <div
        className={
          "relative flex justify-start items-start w-full bg-[#323232] flex-col p-2 h-full z-0"
        }
      >
        <div className="bg-[#323232] flex gap-2 justify-center items-end mb-10">
          <img src={african} alt="african" className="bg-[#323232] w-[80px]" />
          <h2 className="bg-inherit text-[#80BD25] font-bold text-[18px]">
            New Hall International Schools
          </h2>
        </div>
        <ul
          className="border-t-2 border-[#fff] pb-[40%] py-5 bg-[#323232] w-full text-[#fff] grid grid-cols-1 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 200px)" }}
        >
          <p className="bg-[#323232] py-2 text-[14px] font-semibold font-DMSans">
            Main
          </p>
          {sidebarData.map((data) => (
            <SideNav
              key={data.text}
              {...data}
              textStyles="hidden text-md text-[#fff] lg:block"
            />
          ))}
        </ul>
        <div className="absolute bottom-0 flex justify-start flex-col w-full items-start bg-inherit gap-y-4">
          <div className="mt-auto flex justify-center gap-2 items-center bg-inherit text-[#fff]">
            <IoIosLogOut className="bg-inherit text-[#80BD25]" />
            <button
              className="bg-inherit text-[13px] text-[#80BD25] font-semibold"
              onClick={handleLogout}
            >
              Logout Account
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
