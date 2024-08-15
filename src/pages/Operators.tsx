import { useEffect, useRef, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import {
  Plus,
  UserCommunity,
  UserAdd,
  IdCard,
  Mail,
  UserCircleBlock,
  Mobile,
  ArchiveDocument,
} from "react-huge-icons/solid";
import { Camera } from "react-huge-icons/outline";
import { DashboardCardRow } from "../components/grouped-components/dashboard-card-row";
import { DashboardCardProps } from "../components/ui/dashboard-card";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { new_operator, all_operators } from "../utils/apiService";
import { format } from "date-fns";
import { success } from "../assets";
import { UserTable } from "../components/table/UserTable";

const transactionTableHeaders = [
  "ID CARD NO",
  "FIRST NAME",
  "LAST NAME",
  "EMAIL ADDRESS",
  "PHONE NO",
  "POSITION",
  "DATE CREATED",
  "DEPARTMENT",
  "STATUS",
  "Action",
];
interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

const Operators = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const tooltipRef = useRef<HTMLElement>(null);
  const { user } = useUser();
  const [filteredTableRows] = useState<IBaseTable["tableRows"]>([]);
  const [staffName, setStaffName] = useState("");
  const [isNewstaff, setisNewstaff] = useState(false);
  const [registrationSuccess, setregistrationSuccess] = useState(false);
  const [searchQuery] = useState("");
  const [formData, setFormData] = useState({
    idNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    picture: null as File | null,
  });
  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);
  const [dashboardHeroCards, setDashboardHeroCards] = useState<
    DashboardCardProps[]
  >([
    {
      icon: UserCommunity,
      title: "Operators",
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
      { hasAvatar: true, statusText: "", img: "", name: "" },
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      { verified: true, userId: "" },
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

  const getall_operators = async () => {
    try {
      const res = await all_operators();
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
          user.lastName,
          user.email,
          user.phone,
          user.position,
          format(new Date(user.createdAt), "MMM do, yyyy, h:mm:ss a"),
          user.department,
          {
            verified: user.accountverified,
            userId: user._id,
          },
          {
            action: true,
            userId: user._id,
          },
        ]);

        setTransactionsMockTableRows(newRows);
        setDashboardHeroCards((prevCards) =>
          prevCards.map((card) =>
            card.title === "Operators" ? { ...card, value: totalCount } : card
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
    getall_operators();
  }, []);

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("idNo", formData.idNo);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("middleName", formData.middleName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("department", formData.department);
      formDataToSend.append("position", formData.position);
      if (formData.picture) {
        formDataToSend.append("file", formData.picture);
      }
      const res = await new_operator(formDataToSend);
      if (res) {
        getall_operators();
        setisNewstaff(false);
        setregistrationSuccess(true);
        setFormData({
          idNo: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          phone: "",
          department: "",
          position: "",
          picture: null as File | null,
        });
        setTimeout(() => {
          setregistrationSuccess(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
    // Handle form submission here
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef?.current &&
        event.target instanceof Node &&
        !tooltipRef.current?.contains(event.target)
      ) {
        setisNewstaff(false);
        document.body.style.overflow = "auto";
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isNewstaff) {
        setisNewstaff(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isNewstaff]);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, picture: file });
      setSelectedFile(() => file);
    }
  };
  const removeFile = () => {
    setSelectedFile(null);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="h-full w-full">
        <div className="w-[300px]">
          <DashboardCardRow dashboardHeroCards={dashboardHeroCards} />
        </div>
        <div className="w-full flex justify-end items-end">
          <button
            className="bg-[#3B5712] mb-4 flex justify-between items-center gap-2 text-[#fff] px-2 py-2 rounded-lg"
            onClick={() => setisNewstaff(!isNewstaff)}
          >
            <Plus className={"bg-transparent w-[20px] h-[20px]"} />
            <p className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
              New User
            </p>
          </button>
        </div>
        <div className="h-full w-full">
          <div className="z-0">
            <UserTable
              tableRows={
                searchQuery ? filteredTableRows : transactionsMockTableRows
              }
              headers={transactionTableHeaders}
              showPagination={true}
            />
          </div>
        </div>
      </div>
      {isNewstaff && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isNewstaff ? 1 : 0,
              y: isNewstaff ? 0 : -20,
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
                <h2 className="font-bold text-left w-full bg-white text-[20px] font-DMSans mt-4">
                  New User
                </h2>
                <div className="bg-white">
                  {/* <input type="file" name="picture" onChange={handlePictureChange} /> */}
                  {selectedFile ? (
                    <div className="bg-white">
                      <button
                        className="mb-3 rounded-lg bg-[#80BD25] p-2 text-center text-[14px] text-[#fff] font-semibold"
                        onClick={removeFile}
                      >
                        Change
                      </button>
                      <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        exit={{ scale: 0 }}
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        className=" h-[180px] w-[180px] rounded-[10px] border-[1px] border-themeGrey/20"
                      />
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
                          name="picture"
                          onChange={handlePictureChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <div className="inset-0 flex h-[180px] w-[140px] items-center  justify-center rounded-[10px] border-[1px] border-[#80BD25] lg:w-[180px]">
                          <Camera fontSize={40} />
                        </div>
                      </label>
                    </motion.div>
                  )}
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-2 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    ID No.
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <IdCard className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="ID Card No"
                      name="idNo"
                      value={formData.idNo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    First Name
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <UserAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full  focus:outline-none h-full px-2"
                      placeholder="First name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Middle Name
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <UserAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full  focus:outline-none h-full px-2"
                      placeholder="Middle name"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Last Name
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <UserAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full  focus:outline-none h-full px-2"
                      placeholder="Last name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Email Address
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <Mail className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="email"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Phone
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <Mobile className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="number"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Department
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <UserCircleBlock className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Position
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <ArchiveDocument className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      name="position"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Position"
                      value={formData.position}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  className="bg-[#80BD25] h-[40px] lg:w-[336px]  w-full  rounded-md font-semibold text-[#fff] my-4"
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

export default Operators;
