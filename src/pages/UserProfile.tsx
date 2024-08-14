import { useEffect, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import {
  UserAdd,
  IdCard,
  Mail,
  UserCircleBlock,
  Mobile,
  ArchiveDocument,
  ArrowLeft,
  Trash,
} from "react-huge-icons/solid";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { user } = useUser();
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
    picture: null as File | null,
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  return (
    <DashboardArea title={`Welcome ${staffName}`}>
      <div className="w-full flex justify-start items-end">
        <button
          className="bg-inherit mb-4 flex justify-between items-center gap-2 text-[#3B5712] px-2 py-2 rounded-lg"
          // onClick={handleNewNews}
        >
          <motion.div
            whileHover={{ x: -5 }} // Move the arrow left by 5px on hover
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-transparent w-[30px] h-[30px]"
          >
            <ArrowLeft className="bg-transparent hover:text-[#80BD25] w-[40px] h-[40px]" />
          </motion.div>
        </button>
      </div>
      <div className="w-full lg:w-[60%] rounded-lg m-auto shadow-xl">
        <div className="w-full flex bg-white p-4 justify-between items-center">
          <h2 className="bg-white text-[#000] py-2 rounded-lg text-left px-2 font-bold font-DMSans text-[18px]">
            Staff Name
          </h2>
          <button className="">
            <Trash className="w-[35px] h-[35px] hover:text-[#80BD25] bg-white" />
          </button>
        </div>
        <div className="w-full rounded-lg p-4 bg-white">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/330px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg"
            alt=""
            className="rounded-full w-[150px] h-[150px] m-auto"
          />
        </div>
        <div className="w-full flex justify-center items-center flex-col bg-white">
          <div className="w-full lg:w-[90%] flex justify-between items-center bg-white px-4 gap-4">
            <div className="flex flex-col items-left bg-[#fff] justify-center lg:w-[50%]  w-full ">
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%] flex justify-between items-center bg-white px-4 gap-4">
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
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%] flex justify-between items-center bg-white px-4 gap-4">
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%] flex justify-between items-center bg-white px-4 gap-4">
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
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[90%] flex justify-between items-center bg-white px-4 gap-4">
            <button
              className="bg-[#80BD25] h-[40px]  w-full  rounded-md font-semibold text-[#fff] my-4"
              // onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default UserProfile;
