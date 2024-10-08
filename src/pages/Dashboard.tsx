import {
  // JSXElementConstructor,
  // ReactElement,
  // ReactNode,
  // ReactPortal,
  useEffect,
  useState,
} from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { BaseTable } from "../components/table/BaseTable";
import { useUser } from "../context/user-provider";
import {
  all_staff,
  get_blogs,
  all_operators,
  get_all_event,
} from "../utils/apiService";
import { useNavigate } from "react-router-dom";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Calendar,
  DocumentText,
  UserBlock,
  UserCircle,
} from "react-huge-icons/outline";

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
      icon: Calendar,
      title: "Calendar Events",
      value: 0,
      icbg: "bg-[#E5E4FF]",
      txbg: "text-[#8280FF]",
      chart: Calendar,
      upcolor: "text-[#F83F67]",
      percentage: "",
      msg: "",
    },
    {
      icon: UserCircle,
      title: "Staff",
      value: 0,
      icbg: "bg-[#FFF3D6]",
      txbg: "text-[#FEC53D]",
      chart: UserCircle,
      upcolor: "text-[#4BD991]",
      percentage: "",
      msg: "",
    },
    {
      icon: UserBlock,
      title: "Operators",
      value: 0,
      icbg: "bg-[#D9F7E8]",
      txbg: "text-[#4BD991]",
      chart: UserBlock,
      upcolor: "text-[#F83F67]",
      percentage: "",
      msg: "",
    },
    {
      icon: DocumentText,
      title: "News",
      value: 0,
      icbg: "bg-[#FFDED1]",
      txbg: "text-[#FF9871]",
      chart: DocumentText,
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
      const operators = await all_operators();
      const all_event = await get_all_event();
      const findUserArray = res.data;
      const totalCount = res.totalCount;
      const eventcount = all_event.totalCount;
      const operatorsCount = operators.totalCount;

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
        setDashboardHeroCards((prevCards) =>
          prevCards.map((card) =>
            card.title === "Operators"
              ? { ...card, value: operatorsCount }
              : card
          )
        );
        setDashboardHeroCards((prevCards) =>
          prevCards.map((card) =>
            card.title === "Calendar Events"
              ? { ...card, value: eventcount }
              : card
          )
        );
      } else {
        console.error("Invalid data format:", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const myEventsList: any = [
  //   {
  //     title: "School Opening",
  //     start: new Date("2024-11-20"),
  //   },
  //   {
  //     title: "Opening Ceremony",
  //     start: new Date("2024-11-1"),
  //   },
  //   {
  //     title: "School Festival",
  //     start: new Date("2024-11-5"),
  //   },
  //   {
  //     title: "Opening festival",
  //     start: new Date("2024-11-13"),
  //   },
  // ];

  const get_all_blogs = async () => {
    try {
      const blogs = await get_blogs();
      const total = blogs.totalCount;
      setBlogs(blogs.data);
      setDashboardHeroCards((prevCards) =>
        prevCards.map((card) =>
          card.title === "News" ? { ...card, value: total } : card
        )
      );
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
  // function renderEventContent(eventInfo: {
  //   event: {
  //     title:
  //       | string
  //       | number
  //       | boolean
  //       | ReactElement<any, string | JSXElementConstructor<any>>
  //       | Iterable<ReactNode>
  //       | ReactPortal
  //       | null
  //       | undefined;
  //   };
  // }) {
  //   return (
  //     <div className="bg-[#cdf4cd]">
  //       <i className="text-[green] bg-inherit text-[10px] font-semibold px-2">
  //         {eventInfo.event.title}
  //       </i>
  //     </div>
  //   );
  // }
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
              <h2 className="bg-[#323232] rounded-tl-lg rounded-tr-lg text-white py-2 text-center mb-4 font-bold font-DMSans text-[20px]">
                Latest News
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
        {/* <div className="calendar-container !bg-white w-[50%] p-4 mt-4 rounded-lg">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={myEventsList}
            eventContent={renderEventContent}
            dayCellContent={(content) => {
              return <div>{content.dayNumberText}</div>;
            }}
          />
        </div> */}
      </div>
    </DashboardArea>
  );
};

export default Home;
