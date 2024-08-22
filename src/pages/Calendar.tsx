import { useEffect, useRef, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import { CalendarTable } from "../components/table/CalendarTable";
import { CalendarAdd, Plus } from "react-huge-icons/solid";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { AnimatePresence, motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import {
  new_event,
  upload_pdf,
  get_all_event,
  get_pdf,
} from "../utils/apiService";
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
  const [pdfUrl, setPdfUrl] = useState("");
  const [staffName, setStaffName] = useState("");
  const [isNewEvent, setisNewEvent] = useState(false);
  const [isNewEventPdf, setisNewEventPdf] = useState(false);
  const [registrationSuccess, setregistrationSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery] = useState("");
  const [event, setEvent] = useState({
    calendar: null as File | null,
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
      chart: CalendarAdd,
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
      const formDataToSend = new FormData();
      if (event.calendar) {
        formDataToSend.append("file", event.calendar);
      }
      const res = await new_event(formDataToSend, user.staffRec._id);
      if (res) {
        all_event();
        setisNewEvent(false);
        setregistrationSuccess(true);
        setEvent({
          calendar: null,
        });
        setTimeout(() => {
          setregistrationSuccess(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const calendar_pdf = async () => {
      try {
        const res = await get_pdf("Calendar.pdf");
        if (res.message === "File exists") {
          setPdfUrl(res.fileName);
        }
      } catch (error) {
        console.log(error);
      }
    };
    calendar_pdf();
  }, []);

  const handleSubmitpdf = async () => {
    try {
      const formDataToSend = new FormData();
      if (event.calendar) {
        formDataToSend.append("file", event.calendar);
      }
      const res = await upload_pdf(formDataToSend);
      if (res) {
        all_event();
        setisNewEventPdf(false);
        setregistrationSuccess(true);
        setEvent({
          calendar: null,
        });
        setTimeout(() => {
          setregistrationSuccess(false);
        }, 4000);
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
        setisNewEventPdf(false);
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

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEvent({ ...event, calendar: file });
      setSelectedFile(() => file);
    }
  };

  useEffect(() => {
    console.log(event);
  }, [event.calendar]);

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="w-full">
        <div className="w-[300px]">
          <DashboardCardRow dashboardHeroCards={dashboardHeroCards} />
        </div>
        <div className="w-full flex justify-end gap-3 items-end">
          <button
            className="bg-[#e98256] mb-4 flex justify-between items-center gap-2 text-[#fff] px-2 py-2 rounded-lg"
            onClick={() => setisNewEventPdf(!isNewEventPdf)}
          >
            <Plus className={"bg-transparent w-[20px] h-[20px]"} />
            <p className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
              Upload PDF
            </p>
          </button>
          <button
            className="bg-[#3B5712] mb-4 flex justify-between items-center gap-2 text-[#fff] px-2 py-2 rounded-lg"
            onClick={() => setisNewEvent(!isNewEvent)}
          >
            <Plus className={"bg-transparent w-[20px] h-[20px]"} />
            <p className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
              Upload Calendar
            </p>
          </button>
        </div>
        <div className="h-full mt-4 w-full">
          <div className="z-0">
            <CalendarTable
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
                  Calendar Upload
                </h2>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-2 w-full lg:w-[336px]">
                  {selectedFile === null && (
                    <p className="bg-inherit text-[13px] text-[#80BD25] mb-4 font-semibold">
                      Select an excel File (.xlsx)
                    </p>
                  )}
                  <div className="h-full w-full m-auto flex justify-center items-center bg-white rounded-md">
                    {selectedFile ? (
                      <div className="bg-white w-full">
                        <button
                          className="mb-3 rounded-lg bg-[#80BD25] p-2 text-center text-[14px] text-[#fff] font-semibold"
                          onClick={removeFile}
                        >
                          Change file
                        </button>
                        <motion.p
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.5 }}
                          exit={{ scale: 0 }}
                          className="bg-white font-bold text-left w-full text-[20px] font-DMSans my-4"
                        >
                          {selectedFile.name}
                        </motion.p>
                        {/* <motion.p
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.5 }}
                          exit={{ scale: 0 }}
                          src={selectedFile}
                          alt="Selected"
                          className=" h-[180px] w-[180px] rounded-[10px] border-[1px] border-themeGrey/20"
                        /> */}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        exit={{ scale: 0 }}
                      >
                        <label className="inline-block">
                          <input
                            type="file"
                            name="calendar"
                            onChange={handlePictureChange}
                            className="hidden"
                            accept=".xlsx, .xls"
                          />
                          <div className="inset-0 flex h-[60px] w-[20px] m-auto items-center  justify-center rounded-[10px] border-[1px] border-[#80BD25] lg:w-[180px]">
                            <CalendarAdd fontSize={40} />
                          </div>
                        </label>
                      </motion.div>
                    )}
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
      {isNewEventPdf && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isNewEventPdf ? 1 : 0,
              y: isNewEventPdf ? 0 : -20,
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
                  Calendar PDF Upload
                </h2>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-2 w-full lg:w-[336px]">
                  {selectedFile === null && (
                    <>
                      <p className="bg-inherit text-[13px] text-[#80BD25] font-semibold">
                        Select a pdf file that will be downloaded.
                      </p>
                      <span className="bg-inherit text-[10px] text-[#434d33] italic mb-4 font-semibold">
                        Save file with Calendar.pdf before uploading..
                      </span>
                    </>
                  )}
                  <div className="h-full w-full m-auto flex justify-center items-center bg-white rounded-md">
                    {selectedFile ? (
                      <div className="bg-white w-full">
                        <button
                          className="mb-3 rounded-lg bg-[#80BD25] p-2 text-center text-[14px] text-[#fff] font-semibold"
                          onClick={removeFile}
                        >
                          Change file
                        </button>
                        <motion.p
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.5 }}
                          exit={{ scale: 0 }}
                          className="bg-white font-bold text-left w-full text-[20px] font-DMSans my-4"
                        >
                          {selectedFile.name}
                        </motion.p>
                        {/* <motion.p
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.5 }}
                          exit={{ scale: 0 }}
                          src={selectedFile}
                          alt="Selected"
                          className=" h-[180px] w-[180px] rounded-[10px] border-[1px] border-themeGrey/20"
                        /> */}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        exit={{ scale: 0 }}
                      >
                        <label className="inline-block">
                          <input
                            type="file"
                            name="calendar"
                            onChange={handlePictureChange}
                            className="hidden"
                            accept=".pdf"
                          />
                          <div className="inset-0 flex h-[60px] w-[20px] m-auto items-center  justify-center rounded-[10px] border-[1px] border-[#80BD25] lg:w-[180px]">
                            <CalendarAdd fontSize={40} />
                          </div>
                        </label>
                      </motion.div>
                    )}
                  </div>
                </div>
                <button
                  className="bg-[#80BD25] h-[40px] lg:w-[336px] rounded-md font-semibold  w-full  text-[#fff] my-4"
                  onClick={handleSubmitpdf}
                >
                  Upload
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      <div>
        {pdfUrl ? (
          <>
            <FaFilePdf fontSize={50} color="red" />
            <p className="font-bold text-left w-full text-[20px] font-DMSans my-4">
              {pdfUrl}
            </p>
          </>
        ) : (
          <p className="font-bold text-left w-full text-[20px] font-DMSans my-4">
            No file Uploaded
          </p>
        )}
      </div>
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
                    Event Created Successfully.
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
