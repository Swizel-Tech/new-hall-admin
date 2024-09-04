import { useEffect, useState } from "react";
import { all_application } from "../utils/apiService";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { UserAdd } from "react-huge-icons/outline";
import { useUser } from "../context/user-provider";

const shortenedHeaders = [
  "Timestamp",
  "Position",
  "Last Name",
  "Name",
  "Gender",
  "DOB",
  "Marital Status",
  "Address",
  "Primary Mobile",
  "Secondary Mobile",
  "Email",
  "Qualification",
  "School Attended",
  "Duration of Study",
  "Course of study",
  "Degree",
  "Previous Work Place",
  "Position Held",
  "Date Appointed",
  "End Date",
  "Reason for Leaving",
  "Monthly Salary",
  "Primary Subject",
  "Secondary Subject",
  "Greatest Achievement",
  "Teaching Reason",
  "Why New Hall?",
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
  "Upload your cv",
  "Staff Relation",
  "Relation Details",
  "Conviction",
  "Disqualification",
  "Details",
  "Registered Body",
  "Specify Body",
  "Declaration",
];

interface TableRow {
  [key: number]: string; // Each item in the row is a string indexed by its position
}

const DataTable = () => {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");
  const [dashboardHeroCards, setDashboardHeroCards] = useState<
    DashboardCardProps[]
  >([
    {
      icon: UserAdd,
      title: "Application",
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
      const res = await all_application();
      console.log(res);

      setTableData(res.data);
      const totalCount = res.totalRows;
      setDashboardHeroCards((prevCards) =>
        prevCards.map((card) =>
          card.title === "Application" ? { ...card, value: totalCount } : card
        )
      );
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
            <table className="table bg-white w-full">
              <thead className="bg-white">
                <tr className="text-md border-b bg-[#fcfdfd] font-semibold">
                  {shortenedHeaders.map((headr: string, idx: number) => (
                    <th
                      key={idx}
                      className="bg-[#fcfdfd] text-[12px] w-[13%] text-[#435060] font-bold font-DMSans"
                    >
                      <p className="bg-[#fcfdfd] w-full text-[12px] font-DMSans font-bold text-[#435060]">
                        {headr}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {tableData.slice(1).map((row: TableRow, idx: number) => (
                  <tr
                    key={idx}
                    className="border-b rounded-md mb-3 bg-white border-b-themeGrey/20"
                  >
                    {Object.values(row).map((item: string, cellIdx: number) => (
                      <td
                        key={cellIdx}
                        className="bg-white text-[12px] text-[#435060] font-semibold"
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default DataTable;
