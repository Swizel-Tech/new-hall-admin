import { useEffect, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { FaUserFriends } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa6";
import { RxTimer } from "react-icons/rx";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { MdOutlineTrendingDown } from "react-icons/md";
import { BaseTable } from "../components/table/BaseTable";
import { useUser } from "../context/user-provider";
import { all_staff, get_blogs } from "../utils/apiService";
import { useNavigate } from "react-router-dom";

const transactionTableHeaders = [
  "ID CARD NO",
  "FIRST NAME",
  "LAST NAME",
  "EMAIL ADDRESS",
  "PHONE NO",
  "POSITION",
  "DEPARTMENT",
];

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  tags: string[];
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

const Home = () => {
  const [filteredTableRows] = useState<IBaseTable["tableRows"]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery] = useState("");
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  const [dashboardHeroCards, setDashboardHeroCards] = useState<
    DashboardCardProps[]
  >([
    {
      icon: FaUserFriends,
      title: "Students",
      value: 0,
      icbg: "bg-[#E5E4FF]",
      txbg: "text-[#8280FF]",
      chart: MdOutlineTrendingDown,
      upcolor: "text-[#F83F67]",
      percentage: "",
      msg: "",
    },
    {
      icon: BsBoxFill,
      title: "Staff",
      value: 0,
      icbg: "bg-[#FFF3D6]",
      txbg: "text-[#FEC53D]",
      chart: HiOutlineTrendingUp,
      upcolor: "text-[#4BD991]",
      percentage: "1.3%",
      msg: "Up from past week",
    },
    {
      icon: FaChartLine,
      title: "Books",
      value: 0,
      icbg: "bg-[#D9F7E8]",
      txbg: "text-[#4BD991]",
      chart: MdOutlineTrendingDown,
      upcolor: "text-[#F83F67]",
      percentage: "",
      msg: "",
    },
    {
      icon: RxTimer,
      title: "Boarded Students",
      value: 0,
      icbg: "bg-[#FFDED1]",
      txbg: "text-[#FF9871]",
      chart: MdOutlineTrendingDown,
      upcolor: "text-[#F83F67]",
      percentage: "",
      msg: "",
    },
  ]);

  const [transactionsMockTableRows, setTransactionsMockTableRows] = useState([
    [
      { hasAvatar: false, statusText: "", img: "", name: "" },
      "",
      "",
      "",
      "",
      "",
      "",
    ],
  ]);
  const getall_staff = async () => {
    try {
      const res = await all_staff();
      const findUserArray = res.data;
      const totalCount = res.totalCount;

      if (Array.isArray(findUserArray)) {
        const newRows = findUserArray.map((user) => [
          {
            hasAvatar: false,
            statusText: "Pending",
            img: user.picture,
            name: user.idNo,
            userId: user._id,
          },
          user.firstName,
          user.lastName,
          user.email,
          user.phone,
          user.position,
          user.department,
        ]);

        setTransactionsMockTableRows(newRows);
        setDashboardHeroCards((prevCards) =>
          prevCards.map((card) =>
            card.title === "Staff" ? { ...card, value: totalCount } : card
          )
        );
      } else {
        console.error("Invalid data format:", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_all_blogs = async () => {
    try {
      const blogs = await get_blogs();
      setBlogs(blogs.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getall_staff();
    get_all_blogs();
  }, []);
  const handleViewNews = (blogId: string) => {
    navigate(`/news/new_blog/${blogId}`);
  };
  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="w-full">
        <DashboardCardRow dashboardHeroCards={dashboardHeroCards} />
      </div>
      <div className="mt-5 rounded-[8px]">
        <div className="z-0 flex flex-col lg:flex-row gap-4 justify-between items-start">
          <div className="w-full lg:w-[70%] bg-white p-2 rounded-lg">
            <h2 className="bg-inherit text-left mb-2 font-bold font-DMSans text-[20px]">
              Staff
            </h2>
            <BaseTable
              tableRows={
                searchQuery ? filteredTableRows : transactionsMockTableRows
              }
              headers={transactionTableHeaders}
              showPagination={true}
            />
          </div>
          <div className="w-full lg:w-[30%]">
            <div className="h-[400px] w-full bg-white rounded-lg border-[1px] border-[#ddd]">
              <h2 className="bg-[#80BD25] rounded-tl-lg rounded-tr-lg text-white py-2 text-center mb-4 font-bold font-DMSans text-[20px]">
                Lates News
              </h2>
              <ul className="flex justify-start flex-col gap-2 rounded-lg h-[320px] overflow-y-auto items-start bg-[#fff] p-2">
                {blogs.map((blog) => (
                  <li
                    key={blog._id}
                    className="flex w-full bg-white border-[1px] border-[#ddd] p-2 rounded-lg mb-2 justify-between gap-2 items-start cursor-pointer hover:border-[#80BD25]"
                    onClick={() => handleViewNews(blog._id)}
                  >
                    <div className="w-full bg-white lg:w-[15%] rounded-lg">
                      {blog.images.length > 0 && (
                        <img
                          src={`https://new-hall-server.onrender.com/${blog.images[0].replace(
                            /\\/g,
                            "/"
                          )}`}
                          alt={`Blog Image`}
                          className="rounded-lg"
                        />
                      )}
                    </div>
                    <div className="w-full bg-white lg:w-[85%]">
                      <h3 className="bg-white text-[#000] text-left font-bold font-DMSans text-[14px]">
                        {blog.title}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                        className="overflow-x-hidden px-2 rounded-lg overflow-y-hidden h-[20px] text-[#000] text-left font-normal font-DMSans text-[14px]"
                      ></div>
                      <p className="bg-white mt-2 overflow-x-hidden overflow-y-hidden text-[#000] text-left font-normal font-DMSans text-[12px]">
                        <span className="font-semibold italic bg-inherit">
                          Author :
                        </span>{" "}
                        <span className="italic bg-inherit">
                          {blog.author.firstName} {blog.author.lastName}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default Home;
