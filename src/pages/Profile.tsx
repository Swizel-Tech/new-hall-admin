import { useEffect, useRef, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import {
  UserAdd,
  IdCard,
  Mail,
  UserCircleBlock,
  Mobile,
  ArchiveDocument,
} from "react-huge-icons/solid";
import { AnimatePresence, motion } from "framer-motion";
import { get_user, edit_Pass } from "../utils/apiService";
import { success } from "../assets";

const Profile = () => {
  const { user } = useUser();
  const [isChangePass, setIsChangePass] = useState(false);
  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);
  const tooltipRef = useRef<HTMLElement>(null);
  const [staffName, setStaffName] = useState("");
  const [formData, setFormData] = useState({
    idNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    picture: "",
  });
  const [newPaswordData, setNewPaswordData] = useState({
    password: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputPassChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewPaswordData({
      ...newPaswordData,
      [name]: value,
    });
  };

  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  const getstaff = async () => {
    try {
      const res = await get_user(user.staffRec._id);
      if (res.success === true) {
        setFormData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getstaff();
  }, []);

  const handleNewPass = async () => {
    try {
      const res = await edit_Pass(newPaswordData, user.staffRec._id);
      console.log(res);
      setIsChangePass(false);
      setIsPasswordSuccess(true);
      setTimeout(() => {
        setIsPasswordSuccess(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="w-full lg:w-[60%] rounded-lg m-auto shadow-xl">
        <div className="w-full flex bg-white p-4 rounded-lg justify-between items-center">
          <h2 className="bg-white text-[#000] py-2 text-left px-2 font-bold font-DMSans text-[18px]">
            {formData.firstName} {formData.lastName}
          </h2>
        </div>
        <div className="w-full rounded-lg p-4 bg-white">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${formData.picture}`}
            alt=""
            className="rounded-full w-[150px] h-[150px] m-auto"
          />
        </div>
        <div className="w-full flex rounded-lg justify-center items-center flex-col bg-white">
          <div className="w-full lg:w-[90%] flex flex-col lg:flex-row justify-between items-center bg-white px-4 gap-4">
            <div className="flex flex-col items-left bg-[#fff] justify-center lg:w-[50%]  w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                ID No.
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <IdCard className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="text"
                  className="w-full focus:outline-none h-full px-2"
                  readOnly
                  placeholder="ID Card No"
                  name="idNo"
                  value={formData.idNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col items-left bg-[#fff] justify-center lg:w-[50%]  w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                First Name
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <UserAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="text"
                  className="w-full  focus:outline-none h-full px-2"
                  placeholder="First name"
                  readOnly
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%] flex flex-col lg:flex-row justify-between items-center bg-white px-4 gap-4">
            <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  lg:w-[50%]   w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                Middle Name
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <UserAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="text"
                  className="w-full  focus:outline-none h-full px-2"
                  placeholder="Middle name"
                  readOnly
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  lg:w-[50%]   w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                Last Name
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <UserAdd className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="text"
                  className="w-full  focus:outline-none h-full px-2"
                  placeholder="Last name"
                  readOnly
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%] flex flex-col lg:flex-row justify-between items-center bg-white px-4 gap-4">
            <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[50%]  w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                Email Address
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <Mail className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="email"
                  className="w-full focus:outline-none h-full px-2"
                  placeholder="Email Address"
                  readOnly
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[50%]  w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                Phone
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <Mobile className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="number"
                  className="w-full focus:outline-none h-full px-2"
                  placeholder="Phone"
                  readOnly
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%]  pb-6 flex flex-col lg:flex-row justify-between items-center bg-white px-4 gap-4">
            <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[50%]  w-full ">
              <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                Department
              </p>
              <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                <UserCircleBlock className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                <input
                  type="text"
                  className="w-full focus:outline-none h-full px-2"
                  placeholder="Department"
                  readOnly
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col items-left bg-[#fff] justify-center pt-4 lg:w-[50%]  w-full ">
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
                  readOnly
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-white px-4 gap-4">
            <button
              className="bg-[#80BD25] lg:w-[40%] h-[40px]  w-full  rounded-md font-semibold text-[#fff] my-4"
              onClick={() => setIsChangePass(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {isChangePass && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isChangePass ? 1 : 0,
              y: isChangePass ? 0 : -20,
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
                  Change Password
                </h2>
                <div className="flex flex-col items-left bg-[#fff] justify-center pt-2 lg:w-[336px]  w-full ">
                  <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
                    New Password
                  </p>
                  <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
                    <IdCard className="bg-inherit h-[30px] w-[30px] text-[#ddd]" />
                    <input
                      type="text"
                      className="w-full focus:outline-none h-full px-2"
                      placeholder="New Password"
                      name="password"
                      value={newPaswordData.password}
                      onChange={handleInputPassChange}
                    />
                  </div>
                </div>
                <div className="flex w-full bg-white gap-4 justify-between items-center">
                  <button
                    className="bg-[#DDD] py-2 lg:w-[50%]  w-full  rounded-md font-semibold text-[#fff] my-4"
                    onClick={() => setIsChangePass(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="bg-[#80BD25] py-2 lg:w-[50%]  w-full  rounded-md font-semibold text-[#fff] my-4"
                    onClick={handleNewPass}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {isPasswordSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isPasswordSuccess ? 1 : 0,
              y: isPasswordSuccess ? 0 : -20,
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
                    Account Successfully Updated.
                  </h2>
                  <p className="pb-4 text-center text-[14px] font-normal bg-white text-[#80BD25]">
                    Account password Successfully changed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </DashboardArea>
  );
};

export default Profile;
