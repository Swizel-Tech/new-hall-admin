// Warning.tsx
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { success } from "../../../assets";
import { activate_user } from "../../../utils/apiService";

interface WarningProps {
  status: boolean;
  msg: string;
  userId: string;
  closeModal: () => void;
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const UserActivate: React.FC<WarningProps> = ({
  status,
  msg,
  userId,
  closeModal,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [deletesuccess, setDeletesuccess] = useState(false);

  const handeldelstaff = async (userId: string | boolean | undefined) => {
    try {
      const delstaff = await activate_user(userId);
      console.log(delstaff);
      setDeletesuccess(true);
      //   window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {deletesuccess ? (
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: status ? 1 : 0,
                y: status ? 0 : -20,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full bg-transparent backdrop-blur-[10px] min-h-screen w-full items-center justify-center overflow-y-auto"
            >
              <div
                ref={tooltipRef}
                className="mb-32 h-auto max-h-[540px] w-[26%] overflow-y-auto rounded-[20px] bg-[#fff] px-4 shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%]"
              >
                <h2 className="py-4 bg-white text-center text-[25px] font-semibold ">
                  Account Activated!
                </h2>
                <div className="flex w-full items-center bg-[#fff] justify-center">
                  <div className="flex flex-col items-center bg-[#fff] justify-center py-6 lg:w-[336px]">
                    <motion.img
                      src={success}
                      alt=""
                      initial="hidden"
                      animate="visible"
                      variants={fadeInVariants}
                      transition={{ duration: 1 }}
                      className="mb-8 w-[30%] bg-white"
                    />
                    <h2 className="pb-4 text-center text-[25px] font-semibold bg-white text-[#16151C]">
                      Account Activated Successfully.
                    </h2>
                    <div className="flex bg-white justify-between w-full gap-3 mt-3 items-center">
                      <button
                        className="w-[50%] m-auto text-center text-[18px] text-[#fff] py-3 rounded-lg bg-[#969090]"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: status ? 1 : 0,
                y: status ? 0 : -20,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 top-0 z-[9999] flex h-full bg-transparent backdrop-blur-[10px] min-h-screen w-full items-center justify-center overflow-y-auto"
            >
              <div
                ref={tooltipRef}
                className="mb-32 h-auto max-h-[540px] w-[26%] overflow-y-auto rounded-[20px] bg-[#fff] px-4 shadow-md [@media(max-width:1200px)]:w-[50%] [@media(max-width:700px)]:w-[90%]"
              >
                <h2 className="py-4 bg-white text-center text-[25px] font-semibold ">
                  Activate Account
                </h2>
                <div className="flex w-full items-center bg-[#fff] justify-center">
                  <div className="flex flex-col items-center bg-[#fff] justify-center py-6 lg:w-[336px]">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeInVariants}
                      transition={{ duration: 6 }}
                      className="bg-white"
                    >
                      <FaTrashAlt className="mb-8 text-[100px] bg-white" />
                    </motion.div>
                    <h2 className="pb-4 text-center text-[18px] font-semibold bg-white text-[#16151C]">
                      {msg}
                    </h2>
                    <div className="flex justify-between w-full gap-3 mt-3 items-center">
                      <button
                        className="w-[50%] text-center text-[18px] text-[#fff] py-3 rounded-lg bg-[#969090]"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="text-center text-[18px] text-[#fff] w-[50%]  py-3 rounded-lg bg-[#80BD25]"
                        onClick={() => handeldelstaff(userId)}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
