import { Avatar } from "../../avatar";
import { CiCircleChevDown } from "react-icons/ci";
import { useUser } from "../../../../context/user-provider";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LogoutOpen, User } from "react-huge-icons/outline";
import { log_out } from "../../../../utils/apiService";
import { useNavigate } from "react-router-dom";

export interface TopNavProps {
  title: string;
}

export const TopNav = ({ title }: TopNavProps) => {
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");
  const [userPicture, setPicture] = useState("");
  const navigate = useNavigate();
  const tooltipRef = useRef<HTMLElement>(null);
  const [profileClicked, setprofileClicked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef?.current &&
        event.target instanceof Node &&
        !tooltipRef.current?.contains(event.target)
      ) {
        setprofileClicked(false);
        document.body.style.overflow = "auto";
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && profileClicked) {
        setprofileClicked(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [profileClicked]);

  useEffect(() => {
    console.log(user);
    setPicture(user.staffRec.picture);
    setStaffName(`${user.staffRec.lastName}`);
  }, []);

  const handleLogout = async () => {
    try {
      await log_out(user.staffRec._id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex bg-white h-[60px] px-10 w-full justify-between items-center max-md:items-center">
      <div className="relative w-[50%] lg:w-[20%]">
        <div className="absolute top-0 bg-[#fff] bottom-0 left-2 gap-2 flex justify-center items-center">
          <p className="bg-white font-semibold font-DMSans text-[14px] capitalize max-md:hidden">
            {title}
          </p>
        </div>
      </div>
      <div className="relative flex justify-between bg-white items-center gap-4 lg:gap-9">
        <Avatar
          img={userPicture}
          name={staffName}
          avatarClassName="md:h-11 h-36px w-36px rounded-full md:w-11"
          textClassName="font-medium text-sm bg-white max-md:hidden"
          wrapperClassName="max-md:gap-0"
        >
          <div className="pr-1 bg-white font-semibold font-DMSans text-[14px] capitalize max-md:hidden">
            <p className="bg-white font-normal font-DMSans text-[12px] capitalize max-md:hidden">
              Admin
            </p>
          </div>
        </Avatar>
        <button
          className="bg-white"
          onClick={() => setprofileClicked(!profileClicked)}
        >
          <CiCircleChevDown className="bg-white w-[34px] h-[34px]" />
        </button>
        {profileClicked && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={
              "tooltip absolute right-[5%] top-12 bg-white z-[10000000] w-[184px] rounded-[8px] py-3"
            }
            ref={tooltipRef as React.RefObject<HTMLDivElement>}
          >
            <div className="ronded-[3px] bg-white translate-[.3s] flex cursor-pointer items-center justify-start gap-3 px-4 py-3 text-base font-light hover:bg-main/10">
              <User className="text-xl bg-white" />
              <h3 className="bg-white">My Profile</h3>
            </div>
            <div
              className="ronded-[3px] bg-white flex cursor-pointer items-center justify-start gap-3 px-4 py-2 text-base font-light text-[#F45B69]"
              onClick={handleLogout}
            >
              <LogoutOpen className="text-xl bg-white" />
              <h3 className="bg-white">Logout</h3>
            </div>
          </motion.div>
        )}
      </div>
      {profileClicked && (
        <div className="fixed right-0 top-0 z-[999] h-full w-full bg-transparent backdrop-blur-[10px] transition-[.5s]"></div>
      )}
    </header>
  );
};
