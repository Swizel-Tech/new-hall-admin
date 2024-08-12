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
import { all_staff } from "../utils/apiService";
import { format } from "date-fns";

const transactionTableHeaders = [
  "ID CARD NO",
  "FIRST NAME",
  "MIDDLE NAME",
  "LAST NAME",
  "EMAIL ADDRESS",
  "PHONE NO",
  "POSITION",
  "DATE CREATED",
  "DEPARTMENT",
];

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

const Home = () => {
  const [filteredTableRows] = useState<IBaseTable["tableRows"]>([]);
  const [searchQuery] = useState("");
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");

  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  const [dashboardHeroCards, setDashboardHeroCards] = useState<
    DashboardCardProps[]
  >([
    {
      icon: FaUserFriends,
      title: "Students",
      value: 43,
      icbg: "bg-[#E5E4FF]",
      txbg: "text-[#8280FF]",
      chart: HiOutlineTrendingUp,
      upcolor: "text-[#4BD991]",
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
      value: 100,
      icbg: "bg-[#D9F7E8]",
      txbg: "text-[#4BD991]",
      chart: MdOutlineTrendingDown,
      upcolor: "text-[#F83F67]",
      percentage: "4.3%",
      msg: "Down from Yesterday",
    },
    {
      icon: RxTimer,
      title: "Boarded Students",
      value: 2040,
      icbg: "bg-[#FFDED1]",
      txbg: "text-[#FF9871]",
      chart: HiOutlineTrendingUp,
      upcolor: "text-[#4BD991]",
      percentage: "1.8%",
      msg: "Up from Yesterday",
    },
  ]);
  // const [transactionsMockTableRows] = useState([
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00001" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Completed" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00002" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Processing" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00003" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Completed" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00004" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Rejected" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00005" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Processing" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00006" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Rejected" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00007" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Completed" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00008" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Rejected" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00009" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Completed" },
  //   ],
  //   [
  //     { hasAvatar: false, statusText: "", img: "", name: "00010" },
  //     "Children Training",
  //     "108 Federal Housing Estate Abuja",
  //     "30 Mar, 2024",
  //     "Training",
  //     { statusText: "Rejected" },
  //   ],
  // ]);
  const [transactionsMockTableRows, setTransactionsMockTableRows] = useState([
    [
      { hasAvatar: true, statusText: "", img: "", name: "" },
      "",
      "",
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
            hasAvatar: true,
            statusText: "Pending",
            img: user.picture,
            name: user.idNo,
            userId: user._id,
          },
          user.firstName,
          user.middleName,
          user.lastName,
          user.email,
          user.phone,
          user.position,
          format(new Date(user.createdAt), "MMM do, yyyy, h:mm:ss a"),
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
  useEffect(() => {
    getall_staff();
  }, []);
  return (
    <DashboardArea title={`Welcome ${staffName}`}>
      <div className="w-full">
        <DashboardCardRow dashboardHeroCards={dashboardHeroCards} />
      </div>
      <div className="mt-5 rounded-[8px]">
        <div className="z-0">
          <h2>Staff</h2>
          <BaseTable
            tableRows={
              searchQuery ? filteredTableRows : transactionsMockTableRows
            }
            headers={transactionTableHeaders}
            showPagination={true}
          />
        </div>
      </div>
    </DashboardArea>
  );
};

export default Home;
