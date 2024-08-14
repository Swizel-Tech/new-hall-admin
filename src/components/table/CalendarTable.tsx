import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Avatar } from "../ui/avatar";
import {
  CalendarAdd,
  CalendarCheck,
  ClockCircle,
  Edit,
  //   Eye,
  Trash,
} from "react-huge-icons/outline";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { get_an_event, edit_event } from "../../utils/apiService";
import { success } from "../../assets";
import { EventDeleteWarn } from "../ui/modals/EventDeleteWarn";

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

export const CalendarTable = ({
  // showPagination = false,
  headers,
  headersClassName,
  tableRows,
}: IBaseTable) => {
  const [itemsPerPage] = useState(6);
  //   const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditSuccess, setisEditSuccess] = useState(false);
  const tooltipRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const [isEditstaff, setisEditstaff] = useState({
    status: false,
    staffId: "",
  });
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
        msg: "Are you sure you want to delete this Event?",
        userId: userId,
      });
    } else {
      console.error("Invalid userId:", userId);
    }
  };
  const hndeleditstaff = async (userId: string | boolean | undefined) => {
    if (typeof userId === "string") {
      setisEditstaff({
        status: true,
        staffId: userId,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef?.current &&
        event.target instanceof Node &&
        !tooltipRef.current?.contains(event.target)
      ) {
        setisEditstaff({
          status: false,
          staffId: "",
        });
        document.body.style.overflow = "auto";
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEditstaff) {
        setisEditstaff({ status: false, staffId: "" });
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isEditstaff]);
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // get Staff
  const getstaff = async () => {
    try {
      const res = await get_an_event(isEditstaff.staffId);
      if (res.success === true) {
        const startDate = new Date(res.data.startDate)
          .toISOString()
          .slice(0, 10);
        const endDate = new Date(res.data.endDate).toISOString().slice(0, 10);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          startDate: startDate,
          startTime: res.data.startTime,
          endDate: endDate,
          endTime: res.data.endTime,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getstaff();
  }, [isEditstaff.staffId]);

  const handleSubmit = async () => {
    try {
      const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const startDate = formatDate(formData.startDate);
      const endDate = formatDate(formData.endDate);

      const event = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        startDate: startDate,
        startTime: formData.startTime,
        endDate: endDate,
        endTime: formData.endTime,
      };

      const res = await edit_event(event, isEditstaff.staffId);
      if (res.success === true) {
        setisEditstaff({
          status: false,
          staffId: "",
        });
        window.location.reload();
        setisEditSuccess(true);
        setTimeout(() => {
          setisEditSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
            {/* <Eye
              onClick={() => handleStaffView(row.userId)}
              className="cursor-pointer bg-white text-xl"
            /> */}
            <Edit
              onClick={() => hndeleditstaff(row.userId)}
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
            avatarClassName="h-10 w-10"
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
      {isEditstaff.status && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isEditstaff ? 1 : 0,
              y: isEditstaff ? 0 : -20,
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full bg-transparent backdrop-blur-[10px] min-h-screen w-full items-center justify-center overflow-y-auto"
          >
            <div
              ref={tooltipRef as React.RefObject<HTMLDivElement>}
              className={
                "mb-32 h-auto py-4 max-h-[540px] w-[26%] overflow-y-auto rounded-[20px] bg-[#fff] px-4 shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%]"
              }
            >
              <div className="flex w-full flex-col items-center bg-[#fff] justify-center">
                <h2 className="font-bold text-center w-full bg-white text-[20px] font-DMSans mt-4">
                  Edit Event
                </h2>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-2 w-full lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Event Title
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <CalendarAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Event Title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {/* <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Event Date
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <CalendarCheck className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full  focus:outline-none h-full px-2"
                      placeholder="20-12-2024"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div> */}
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Start Date
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <CalendarCheck className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full  focus:outline-none h-full px-2"
                      placeholder="20-12-2024"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Start Time
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <ClockCircle className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="email"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="10:30 AM"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    End Date
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <CalendarAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="20-12-2024"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    End Time
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <ClockCircle className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="10:30 AM"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Location
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <ClockCircle className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Event Description
                  </p>
                  <div className="w-full border-[1px] border-[#ddd] rounded-md">
                    <textarea
                      className="w-full h-[100px] focus:outline-none p-2 resize-none bg-inherit"
                      placeholder="Enter event description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  className="bg-[#80BD25] h-[40px] lg:w-[336px] rounded-md font-semibold  w-full  text-[#fff] my-4"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {isEditSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isEditSuccess ? 1 : 0,
              y: isEditSuccess ? 0 : -20,
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full bg-transparent backdrop-blur-[10px] min-h-screen w-full items-center justify-center overflow-y-auto"
          >
            <div
              ref={tooltipRef as React.RefObject<HTMLDivElement>}
              className={
                "mb-32 h-auto max-h-[540px] w-[26%] overflow-y-auto rounded-[20px] bg-[#fff] px-4 shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%]"
              }
            >
              <div className="flex w-full  items-center bg-[#fff] justify-center">
                <div className="flex flex-col items-center bg-[#fff] justify-center py-6 lg:w-[336px]">
                  <motion.img
                    src={success}
                    alt=""
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 6 }}
                    className="mb-8 w-[30%]"
                  />
                  <h2 className="pb-4 text-center text-[25px] font-semibold bg-white text-[#16151C]">
                    Event Details updated Successfully.
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {deleteWarn.status && (
        <EventDeleteWarn
          status={deleteWarn.status}
          msg={deleteWarn.msg}
          eventId={deleteWarn.userId}
          closeModal={closeWarning}
        />
      )}
    </div>
  );
};
