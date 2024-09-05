import { useRef, useState } from "react";
import { cn } from "../../utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { saveAs } from "file-saver";
import { Eye, Trash } from "react-huge-icons/outline";
import "react-toastify/dist/ReactToastify.css";
import { download_cv } from "../../utils/apiService";
import { AnimatePresence, motion } from "framer-motion";
import { GrClose } from "react-icons/gr";
import NonTeachingApplication from "../data/NonTeachingApplication";
import { ApplicationDeleteWarn } from "../ui/modals/ApplicationDeleteWarn";

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

export const NonTeachingTable = ({
  // showPagination = false,
  headers,
  headersClassName,
  tableRows,
}: IBaseTable) => {
  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [Isteaching, setIsteaching] = useState(false);
  const [isApplication_id, setisApplication_id] = useState("");
  const tooltipRef = useRef<HTMLDivElement>(null);

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
        msg: "Are you sure you want to delete this Application?",
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

  const downloadcv = async (file: string | boolean | undefined) => {
    try {
      if (typeof file === "string") {
        const fileName = file.split("\\").pop();
        console.log(fileName);
        const blob = await download_cv(fileName);
        saveAs(blob, fileName);
      } else {
        console.log("File is not a string:", file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (applicationsId: string | undefined | boolean) => {
    if (typeof applicationsId === "string") {
      console.log(applicationsId);

      setisApplication_id(applicationsId);
      setIsteaching(true);
    } else {
      setisApplication_id("");
    }
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
      } else if (row.cv === true && row.file) {
        return (
          <button
            className="bg-[#fff] text-[#F3685B] flex justify-center text-[12px] items-center w-[90px] rounded-[4px] py-1"
            onClick={() => downloadcv(row.file)}
          >
            Download CV
          </button>
        );
      } else if (row.cv === false && !row.file) {
        return (
          <p className="bg-[#fff] text-[#F3685B] flex justify-center text-[12px] items-center w-[90px] rounded-[4px] py-1">
            No CV Uploaded
          </p>
        );
      } else if (row.action === true && row.userId) {
        return (
          <div className="flex bg-white flex-row items-center gap-3">
            <Eye
              className="cursor-pointer bg-white text-xl"
              onClick={() => handleOpenModal(row.userId)}
            />
            <Trash
              onClick={() => hndelstaff(row.userId)}
              className="cursor-pointer bg-white text-xl"
            />
          </div>
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
    <div className="w-auto mb-2">
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
                  className="bg-[#fcfdfd] text-[12px] text-center w-[13%] text-[#435060] font-bold font-DMSans"
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
        <div className="mt-2 bg-white flex items-center w-full justify-between">
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
      {Isteaching && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: Isteaching ? 1 : 0,
              y: Isteaching ? 0 : -20,
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full bg-transparent backdrop-blur-[10px] min-h-screen w-full items-center justify-center overflow-y-auto"
          >
            <div
              ref={tooltipRef}
              className={
                "mb-32 h-auto py-4 max-h-[640px] w-[30%] overflow-y-auto rounded-[20px] bg-[#fff] px-4 shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%]"
              }
            >
              <div className="flex bg-white px-4 justify-end items-end py-4">
                <button onClick={() => setIsteaching(false)}>
                  <GrClose />
                </button>
              </div>
              <h2 className="font-OpenSans mb-6 bg-white text-[#1EB3FE] text-center text-[26px] font-normal leading-[44px]">
                Application for Non Teaching Position
              </h2>
              <NonTeachingApplication
                application_id={isApplication_id}
                onClose={() => setIsteaching(false)}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {deleteWarn.status && (
        <ApplicationDeleteWarn
          status={deleteWarn.status}
          msg={deleteWarn.msg}
          userId={deleteWarn.userId}
          closeModal={closeWarning}
        />
      )}
    </div>
  );
};
