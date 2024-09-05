import { useEffect, useState } from "react";
import { all_non_teaching } from "../utils/apiService";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { UserAdd } from "react-huge-icons/outline";
import { useUser } from "../context/user-provider";
import { NonTeachingTable } from "../components/table/NonTeachingTable";
// import { format } from "date-fns";

const shortenedHeaders = [
  "First Name",
  "Last Name",
  "Position",
  "Gender",
  "DOB",
  "Marital Status",
  "Address",
  "Primary Mobile",
  "Secondary Mobile",
  "Email",
  "Qualification",
  "School Attended",
  "Duration Of Study",
  "Course Of Study",
  "Degree",
  "Previous Work Place",
  "Position Held",
  "Date Appointed",
  "End Date",
  "Reason For Leaving",
  "Monthly Salary",
  "Referee 1 Name",
  "Referee 1 Position",
  "Referee 1 Phone",
  "Referee 1 Email",
  "Referee 1 Relation",
  "Referee 2 Name",
  "Referee 2 Position",
  "Referee 2 Phone",
  "Referee 2 Email",
  "Referee 2 Relation",
  "CV",
  "Conviction",
  "Staff Relation",
  "Relation Details",
  "Disqualification",
  "Details",
  "Declaration",
  "Action",
];

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

const DataTable = () => {
  const [transactionsMockTableRows, setTransactionsMockTableRows] = useState([
    [
      { hasAvatar: false, statusText: "", img: "", name: "" },
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      { cv: true, file: "" },
      "",
      "",
      "",
      { action: true, userId: "" },
    ],
  ]);
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");
  const [filteredTableRows] = useState<IBaseTable["tableRows"]>([]);
  const [searchQuery] = useState("");
  const [dashboardHeroCards, setDashboardHeroCards] = useState<
    DashboardCardProps[]
  >([
    {
      icon: UserAdd,
      title: "Non Teaching Application",
      value: 0,
      icbg: "bg-[#E5E4FF]",
      txbg: "text-[#8280FF]",
      chart: UserAdd,
      upcolor: "text-[#4BD991]",
      percentage: "",
      msg: "",
    },
  ]);

  useEffect(() => {
    if (user?.staffRec?.firstName && user?.staffRec?.lastName) {
      setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
    }
  }, [user]);

  const getapplication = async () => {
    try {
      const res = await all_non_teaching();
      const findUserArray = res.data;
      const totalCount = res.totalCount;
      console.log(findUserArray);

      if (Array.isArray(findUserArray)) {
        const newRows = findUserArray.map((user) => [
          {
            hasAvatar: false,
            statusText: "",
            img: "",
            name: user.firstName,
            userId: user._id,
          },
          user.lastName,
          user.position,
          user.gender,
          user.dob,
          user.maritalStatus,
          user.address,
          user.primaryMobile,
          user.secondaryMobile,
          user.email,
          user.highestQualification,
          user.schoolName,
          user.studyDuration,
          user.courseOfStudy,
          user.qualificationObtained,
          user.organizationName,
          user.positionHeld,
          user.dateAppointed,
          user.endDate,
          user.reasonForLeaving,
          user.salaryEarned,
          user.referee1Name,
          user.referee1Position,
          user.referee1Phone,
          user.referee1Email,
          user.referee1Relation,
          user.referee2Name,
          user.referee2Position,
          user.referee2Phone,
          user.referee2Email,
          user.referee2Relation,
          {
            cv: true,
            file: user.cv,
          },
          user.conviction,
          user.relatedToStaff,
          user.relationDetails,
          user.disqualification,
          user.details,
          user.declaration,
          {
            action: true,
            userId: user._id,
          },
        ]);

        setTransactionsMockTableRows(newRows);
        setDashboardHeroCards((prevCards) =>
          prevCards.map((card) =>
            card.title === "Non Teaching Application"
              ? { ...card, value: totalCount }
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

  useEffect(() => {
    getapplication();
  }, []);

  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="h-full w-full">
        <div className="w-[300px]">
          <DashboardCardRow dashboardHeroCards={dashboardHeroCards} />
        </div>
        <div className="overflow-x-auto mt-[6%]">
          <div className="w-auto bg-white overflow-x-auto rounded-[8px]">
            <NonTeachingTable
              tableRows={
                searchQuery ? filteredTableRows : transactionsMockTableRows
              }
              headers={shortenedHeaders}
              showPagination={true}
            />
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default DataTable;
