import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Avatar } from "../ui/avatar";
import {
  ArchiveDocument,
  Camera,
  Edit,
  IdCard,
  Mail,
  Mobile,
  //   Trash,
  UserAdd,
  UserCircleBlock,
} from "react-huge-icons/outline";
import OtpInput from "react-otp-input";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { get_user, edit_user, verify_otp } from "../../utils/apiService";
import { success } from "../../assets";
import { UserDeleteWarn } from "../ui/modals/UserDeleteWarn";
// import {  } from "react-huge-icons/outline";

interface IBaseTable {
  showPagination?: boolean;
  headers: string[];
  headersClassName?: string;
  tableRows: (string | Record<string, string | boolean | undefined>)[][];
}

export const UserTable = ({
  // showPagination = false,
  headers,
  headersClassName,
  tableRows,
}: IBaseTable) => {
  const [itemsPerPage] = useState(4);
  const [otp, setOtp] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [staffpicture, setPicture] = useState("");
  const [isEditSuccess, setisEditSuccess] = useState(false);
  const [isVerificationSuccess, setisVerificationSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const tooltipRef = useRef<HTMLElement>(null);
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
  const [verification, setverification] = useState({
    email: "",
  });
  const [isEditstaff, setisEditstaff] = useState({
    status: false,
    staffId: "",
  });
  const [isVerifyUser, setisVerifyUser] = useState({
    status: false,
    userId: "",
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

  //   const hndelstaff = async (userId: string | boolean | undefined) => {
  //     if (typeof userId === "string") {
  //       setDeleteWarn({
  //         status: true,
  //         msg: "Are you sure you want to delete this Account?",
  //         userId: userId,
  //       });
  //     } else {
  //       console.error("Invalid userId:", userId);
  //     }
  //   };
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
  const handleVerifyUser = async (userId: string | boolean | undefined) => {
    if (typeof userId === "string") {
      setisVerifyUser({
        status: true,
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
        setisVerifyUser({
          status: false,
          userId: "",
        });
        document.body.style.overflow = "auto";
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEditstaff) {
        setisEditstaff({ status: false, staffId: "" });
      }
      if (event.key === "Escape" && isVerifyUser) {
        setisVerifyUser({
          status: false,
          userId: "",
        });
      }
    };

    document.addEventListener("keydown", handleEscKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isEditstaff, isVerifyUser]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleverificationChange = (e: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = e.target;
    setverification({
      ...verification,
      [name]: value,
    });
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, picture: file });
      setSelectedFile(() => file);
    }
  };

  const handleChange = (otp: string) => {
    setOtp(otp);
  };

  // get Staff
  const getuser = async () => {
    try {
      const res = await get_user(isEditstaff.staffId);
      if (res.success === true) {
        setFormData(res.data);
        setPicture(res.data.picture);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuser();
  }, [isEditstaff.staffId]);

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
      const res = await edit_user(formDataToSend, isEditstaff.staffId);
      if (res.success === true) {
        setisEditstaff({
          status: false,
          staffId: "",
        });
        setisEditSuccess(true);
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
          setisEditSuccess(false);
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitOtp = async () => {
    try {
      const data = {
        email: verification.email,
        otp: otp,
      };
      const res = await verify_otp(data);
      if (res.success === true) {
        setisVerifyUser({
          status: false,
          userId: "",
        });
        setisVerificationSuccess(true);
        setTimeout(() => {
          setisVerificationSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const inputStyle = {
    width: "2.5rem",
    height: "2.5rem",
    margin: "0 0.5rem",
    fontSize: "1.5rem",
    borderRadius: "50%",
    border: "1px solid rgba(0,0,0,0.3)",
    backgroundColor: "#fff !important",
  };

  const removeFile = () => {
    setSelectedFile(null);
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
      } else if (row.verified === true && row.userId) {
        return (
          <p className="bg-white text-[#4BD991] flex justify-center text-[12px] items-center w-[90px] rounded-[4px] py-1">
            Verified
          </p>
        );
      } else if (row.verified === false && row.userId) {
        return (
          <button
            className="bg-[#fff] text-[#F3685B] flex justify-center text-[12px] items-center w-[90px] rounded-[4px] py-1"
            onClick={() => handleVerifyUser(row.userId)}
          >
            Verify
          </button>
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
            {/* <Trash
              onClick={() => hndelstaff(row.userId)}
              className="cursor-pointer bg-white text-xl"
            /> */}
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
                <h2 className="font-bold text-left w-full bg-white text-[20px] font-DMSans mt-4">
                  Edit Staff
                </h2>
                {staffpicture !== "" ? (
                  <>
                    <button
                      className="mb-3 rounded-lg bg-[#80BD25] p-2 text-center text-[14px] text-[#fff] font-semibold"
                      onClick={() => setPicture("")}
                    >
                      Change Picture
                    </button>
                    <img
                      src={`${
                        import.meta.env.VITE_API_BASE_URL
                      }/${staffpicture}`}
                      alt="Selected"
                      className="h-[180px] w-[180px] rounded-[10px] border-[1px] border-themeGrey/20"
                    />
                  </>
                ) : (
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
                )}
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
                  Update
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {isVerifyUser.status && (
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
                <h2 className="font-bold text-left w-full bg-white text-[20px] font-DMSans mt-4">
                  Verify User
                </h2>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-2 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    Email Address
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <Mail className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="Email Address"
                      name="email"
                      value={verification.email}
                      onChange={handleverificationChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    OTP (One Time Password)
                  </p>
                  <div className="h-[50px] flex justify-center bg-white items-center w-full p-2 rounded-lg">
                    <OtpInput
                      value={otp}
                      onChange={handleChange}
                      numInputs={6}
                      shouldAutoFocus
                      renderInput={(props) => <input {...props} />}
                      inputStyle={inputStyle}
                      // focusStyle={focusStyle}
                    />
                  </div>
                </div>
                <button
                  className="bg-[#80BD25] h-[40px] lg:w-[336px]  w-full  rounded-md font-semibold text-[#fff] my-4"
                  onClick={handleSubmitOtp}
                >
                  Verify
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
                    className="mb-8 w-[30%] bg-white"
                  />
                  <h2 className="pb-4 text-center text-[25px] font-semibold bg-white text-[#16151C]">
                    Staff Details updated Successfully.
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {isVerificationSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isVerificationSuccess ? 1 : 0,
              y: isVerificationSuccess ? 0 : -20,
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
                    transition={{ duration: 2 }}
                    className="mb-8 w-[30%]"
                  />
                  <h2 className="pb-4 text-center text-[18px] font-semibold bg-white text-[#16151C]">
                    Account Successfully Verified.
                  </h2>
                  <p className="pb-4 text-center text-[14px] font-normal bg-white text-[#80BD25]">
                    User Can check the email for login Credentials
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {deleteWarn.status && (
        <UserDeleteWarn
          status={deleteWarn.status}
          msg={deleteWarn.msg}
          userId={deleteWarn.userId}
          closeModal={closeWarning}
        />
      )}
    </div>
  );
};
