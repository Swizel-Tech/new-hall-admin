import { useState } from "react";
import { cn } from "../../utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Avatar } from "../ui/avatar";
import { Edit, Eye, Trash } from "react-huge-icons/outline";
// import { delete_staff } from "../../utils/apiService";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Warning } from "../ui/modals/Warning";
// import {  } from "react-huge-icons/outline";

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

export const BaseTable = ({
  // showPagination = false,
  headers,
  headersClassName,
  tableRows,
}: IBaseTable) => {
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteWarn, setDeleteWarn] = useState({
    status: false,
    msg: "",
    userId: "",
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableRows.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const hndelstaff = async (userId: string | boolean | undefined) => {
    if (typeof userId === "string") {
      setDeleteWarn({
        status: true,
        msg: "Are you sure you want to delete this Account?",
        userId: userId,
      });
    } else {
      console.error("Invalid userId:", userId);
    }
  };

  const closeWarning = () => {
    setDeleteWarn({
      status: false,
      msg: "",
      userId: "",
    });
  };
  function handleTableRowAppend(
    row: string | Record<string, string | boolean | undefined>
  ) {
    if (typeof row === "string") {
      return row;
    } else {
      if (row.statusText === "Completed") {
        return (
          <div className="bg-[#D9F7E8] text-[#4BD991]  flex justify-center items-center w-[90px] rounded-[4px] px-[10px] py-1">
            {row.statusText}
          </div>
        );
      } else if (row.statusText === "Processing") {
        return (
          <div className="bg-[#E0D4FC] text-[#652AEF] flex justify-center items-center w-[90px] rounded-[4px] px-[10px] py-1">
            {row.statusText}
          </div>
        );
      } else if (row.statusText === "Rejected") {
        return (
          <div className="bg-[#FCD7D4] text-[#F3685B] flex justify-center items-center w-[90px] rounded-[4px] px-[10px] py-1">
            {row.statusText}
          </div>
        );
      } else if (row.action === true && row.userId) {
        return (
          <div className="flex bg-white flex-row items-center gap-3">
            <Eye
              // onClick={() =>
              //   viewStaff(EmployeeViews.PREVIEW_EMPLOYEE, row.userId)
              // }
              className="cursor-pointer bg-white text-xl"
            />
            <Edit
              // onClick={() => editStaff(row.userId)}
              className="cursor-pointer bg-white text-xl"
            />
            <Trash
              onClick={() => hndelstaff(row.userId)}
              className="cursor-pointer bg-white text-xl"
            />
          </div>
        );
      } else if (row.hasAvatar === true) {
        return (
          <Avatar
            img={row?.img?.toString()}
            name={row.name!.toString()}
            avatarClassName="h-10 w-14"
            textClassName="none hidden"
            avatarTextContainerClassName="w-full"
            rounded={true}
          >
            <p className="text-md w-full bg-white">{row.name!.toString()}</p>
          </Avatar>
        );
      } else if (row.hasAvatar === false) {
        return (
          <p className="text-[12px] font-DMSans font-semibold text-[#435060] w-full bg-white">
            {row.name!.toString()}
          </p>
        );
      }
    }
  }

  return (
    <div className="w-auto mb-6">
      <div className="w-auto bg-white overflow-x-auto rounded-[8px]">
        <table className="table bg-white w-full">
          <thead className="bg-white">
            <tr
              className={cn(
                "text-md border-b bg-[#fcfdfd] font-semibold",
                headersClassName
              )}
            >
              {headers.map((headr: string, idx: number) => (
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
            {currentItems.map(
              (
                row: (string | Record<string, string | boolean | undefined>)[],
                idx: number
              ) => (
                <tr
                  key={idx}
                  className="border-b rounded-md mb-3 bg-white border-b-themeGrey/20 "
                >
                  {row.map((item, _i) => (
                    <td
                      key={_i}
                      className="bg-white text-[12px] text-[#435060] font-semibold"
                    >
                      {handleTableRowAppend(item)}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="flex bg-white items-center justify-between rounded-[8px]">
        {/* <div className="font-semibold bg-white">Page {currentPage}</div> */}
        <div className="mt-4 bg-white flex items-center w-full justify-between">
          <button
            className="rounded-lg flex justify-center border-[1px] border-[#e6e6e6] bg-[#fcfdfd] items-center gap-2 p-1"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft fontSize={14} className="bg-[#fcfdfd]" />
            <p className="text-[12px] font-normal items-center bg-[#fcfdfd] font-DMSans">
              Prev.Date
            </p>
          </button>
          <button
            className="rounded-lg flex justify-center border-[1px] border-[#e6e6e6] bg-[#fcfdfd] items-center gap-2  p-1"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= tableRows.length}
          >
            <p className="text-[12px] font-normal items-center bg-[#fcfdfd] font-DMSans">
              Next.Date
            </p>
            <FaChevronRight fontSize={14} className="bg-[#fcfdfd]" />
          </button>
        </div>
      </div>
      {deleteWarn.status && (
        <Warning
          status={deleteWarn.status}
          msg={deleteWarn.msg}
          userId={deleteWarn.userId}
          closeModal={closeWarning}
        />
      )}
    </div>
  );
};
