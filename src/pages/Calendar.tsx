import { useEffect, useRef, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import { BaseTable } from "../components/table/BaseTable";
import {
  ClockCircle,
  CalendarCheck,
  CalendarAdd,
  Plus,
} from "react-huge-icons/solid";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { new_event, get_all_event } from "../utils/apiService";
import { format } from "date-fns";
import { success } from "../assets";

const transactionTableHeaders = [
  "TITLE",
  "CREATED BY",
  "DESCRITION",
  "START DATE",
  "END DATE",
  "START TIME",
  "END TIME",
  "LOCATION",
  "DATE CREATED",
  "Action",
];
interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

const Calendar = () => {
  const tooltipRef = useRef<HTMLElement>(null);
  const { user } = useUser();
  const [filteredTableRows] = useState<IBaseTable["tableRows"]>([]);
  const [staffName, setStaffName] = useState("");
  const [isNewEvent, setisNewEvent] = useState(false);
  const [registrationSuccess, setregistrationSuccess] = useState(false);
  const [searchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    eventDate: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });
  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);
  const [dashboardHeroCards, setDashboardHeroCards] = useState<
    DashboardCardProps[]
  >([
    {
      icon: CalendarAdd,
      title: "Calendar",
      value: 0,
      icbg: "bg-[#E5E4FF]",
      txbg: "text-[#8280FF]",
      chart: HiOutlineTrendingUp,
      upcolor: "text-[#4BD991]",
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
      "",
      "",
      { action: true, userId: "" },
    ],
  ]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const all_event = async () => {
    try {
      const res = await get_all_event();
      const findUserArray = res.data;
      const totalCount = res.totalCount;
      if (Array.isArray(findUserArray)) {
        const newRows = findUserArray.map((user) => {
          const maxLength = 15;
          const truncatedDescription =
            user.description.length > maxLength
              ? user.description.substring(0, maxLength) + "..."
              : user.description;
          const truncatedLocation =
            user.location.length > maxLength
              ? user.location.substring(0, maxLength) + "..."
              : user.location;

          return [
            {
              hasAvatar: false,
              statusText: "Pending",
              img: "",
              name: user.title,
              userId: user._id,
            },
            `${user.createdBy.firstName} ${user.createdBy.lastName}`,
            truncatedDescription,
            format(new Date(user.startDate), "MMM do, yyyy"),
            format(new Date(user.endDate), "MMM do, yyyy"),
            user.startTime,
            user.endTime,
            truncatedLocation,
            format(new Date(user.createdAt), "MMM do, yyyy, h:mm:ss a"),
            {
              action: true,
              userId: user._id,
            },
          ];
        });

        setTransactionsMockTableRows(newRows);
        setDashboardHeroCards((prevCards) =>
          prevCards.map((card) =>
            card.title === "Calendar" ? { ...card, value: totalCount } : card
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
    all_event();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await new_event(formData, user.staffRec._id);
      console.log(res);

      if (res) {
        all_event();
        setisNewEvent(false);
        setregistrationSuccess(true);
        setFormData({
          title: "",
          eventDate: "",
          description: "",
          location: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
        });
        setTimeout(() => {
          setregistrationSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef?.current &&
        event.target instanceof Node &&
        !tooltipRef.current?.contains(event.target)
      ) {
        setisNewEvent(false);
        document.body.style.overflow = "auto";
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isNewEvent) {
        setisNewEvent(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isNewEvent]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <DashboardArea title={`Welcome ${staffName}`}>
      <div className="w-full">
        <div className="w-[300px]">
          <DashboardCardRow dashboardHeroCards={dashboardHeroCards} />
        </div>
        <div className="w-full flex justify-end items-end">
          <button
            className="bg-[#3B5712] mb-4 flex justify-between items-center gap-2 text-[#fff] px-2 py-2 rounded-lg"
            onClick={() => setisNewEvent(!isNewEvent)}
          >
            <Plus className={"bg-transparent w-[20px] h-[20px]"} />
            <p className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
              New Event
            </p>
          </button>
        </div>
        <div className="h-full mt-4 w-full">
          <div className="z-0">
            <BaseTable
              tableRows={
                searchQuery ? filteredTableRows : transactionsMockTableRows
              }
              headers={transactionTableHeaders}
              showPagination={true}
            />
          </div>
        </div>
      </div>
      {isNewEvent && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isNewEvent ? 1 : 0,
              y: isNewEvent ? 0 : -20,
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
                  New Event
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
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full  lg:w-[336px]">
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
                </div>
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
                  <div className="w-full border-[1px] border-[#ddd] bg-[#ddd] rounded-md">
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
      {registrationSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: registrationSuccess ? 1 : 0,
              y: registrationSuccess ? 0 : -20,
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
                    Staff Created Successfully.
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </DashboardArea>
  );
};

export default Calendar;
