import { cn } from "../../../utils/helpers";
import { NavLink } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

type ActiveClass = { isActive: boolean };

type ClassName = (style: ActiveClass) => string;

export interface SideNavProps {
  icon: React.ComponentType<any>;
  text: string;
  href: string;
  dropdown: boolean;
  textStyles?: string;
  className?: ClassName | string;
}

export const SideNav = (props: SideNavProps) => {
  const { icon: Icon, href, text, className, dropdown } = props;
  const [isClicked, setIsClicked] = useState(false);

  const style = ({ isActive }: ActiveClass) => {
    const baseStyles = cn(
      "relative flex bg-[#323232] w-full flex-row items-center gap-4 p-3",
      isActive && "rounded-[8px] w-full bg-[#3B5712]"
    );

    if (typeof className === "string") return cn(baseStyles, className);

    return cn(baseStyles, className?.({ isActive }));
  };
  const handleDropdownClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      {dropdown ? (
        <div className="w-full bg-inherit flex flex-col justify-start items-start">
          <button
            className={style({ isActive: isClicked })}
            onClick={handleDropdownClick}
          >
            <Icon className={cn("bg-transparent w-[20px] h-[20px]")} />
            <span className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
              {text}
            </span>
            {dropdown && (
              <button className="bg-inherit">
                {isClicked ? (
                  <IoIosArrowUp className="bg-inherit" />
                ) : (
                  <IoIosArrowDown className="bg-inherit" />
                )}
              </button>
            )}
          </button>
          {isClicked && (
            <div className="bg-inherit w-full rounded-[4px] p-0 flex justify-end items-end">
              <ul className="m-0 p-0 rounded-bl-[8px] bg-inherit border-l-2 border-[#fff] flex justify-center items-start flex-col w-[90%]">
                <li className="relative mb-4 bg-inherit m-0 rounded-bl-[8px] w-[80%] text-[12px] border-b-2 my-2 border-[#fff] hidden sm:block font-bold font-DMSans p-3 text-center">
                  <button className="py-3 absolute top-[5px] left-4 rounded-[8px] pl-2 text-left w-full cursor-pointer bg-inherit hover:bg-[#3B5712]">
                    Training
                  </button>
                </li>
                <li className="relative  mb-4 bg-inherit m-0 rounded-bl-[8px] w-[80%] text-[12px] border-b-2 my-2 border-[#fff] hidden sm:block font-bold font-DMSans p-3 text-center">
                  <button className="py-3 absolute top-[5px] left-4 rounded-[8px] pl-2 text-left w-full cursor-pointer bg-inherit hover:bg-[#3B5712]">
                    Research Report
                  </button>
                </li>
                <li className="relative  mb-4 bg-inherit m-0 rounded-bl-[8px] w-[80%] text-[12px] border-b-2 my-2 border-[#fff] hidden sm:block font-bold font-DMSans p-3 text-center">
                  <button className="py-3 absolute top-[5px] left-4 rounded-[8px] pl-2 text-left w-full cursor-pointer bg-inherit hover:bg-[#3B5712]">
                    Staff Evaluation
                  </button>
                </li>
                <li className="relative bg-inherit m-0 rounded-bl-[8px] w-[80%] text-[12px] border-b-2 mt-2 border-[#fff] hidden sm:block font-bold font-DMSans p-3 text-center">
                  <button className="py-3 absolute top-[5px] left-4 rounded-[8px] pl-2 text-left w-full cursor-pointer bg-inherit hover:bg-[#3B5712]">
                    Project Development
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <NavLink to={href} className={style}>
          <Icon className={cn("bg-transparent w-[30px] h-[30px]")} />
          <span className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
            {text}
          </span>
        </NavLink>
      )}
    </>
  );
};
