import { useEffect, useRef, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import { get_blogs, del_a_blog } from "../utils/apiService";
import { Eye, Plus, Trash } from "react-huge-icons/outline";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { success } from "../assets";

type Blog = {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  tags: string[];
  images: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const News = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");
  const [isDeleteNews, setisDeleteNews] = useState({
    bl_status: false,
    blogId: "",
  });
  const [isDeletedSuccess, setisDeletedSuccess] = useState(false);

  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  const get_all_blogs = async () => {
    try {
      const blogs = await get_blogs();
      console.log(blogs);
      setBlogs(blogs.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_all_blogs();
  }, []);

  const handleNewNews = () => {
    navigate("/news/new_blog");
  };

  const handleViewNews = (blogId: string) => {
    navigate(`/news/new_blog/${blogId}`);
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const closeModal = () => {
    setisDeleteNews({
      bl_status: false,
      blogId: "",
    });
    setisDeletedSuccess(false);
  };

  const handeldelNews = async (newsId: string) => {
    try {
      const res = await del_a_blog(newsId);
      if (res.success === true) {
        get_all_blogs();
        setisDeleteNews({
          bl_status: false,
          blogId: "",
        });
        setisDeletedSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="mt-5 rounded-[8px]">
        <div className="z-0 flex flex-col lg:flex-row gap-4 justify-between items-start">
          <div className="w-full m-auto  h-full">
            <div className="w-full flex justify-end items-end">
              <button
                className="bg-[#3B5712] mb-4 flex justify-between items-center gap-2 text-[#fff] px-2 py-2 rounded-lg"
                onClick={handleNewNews}
              >
                <Plus className={"bg-transparent w-[20px] h-[20px]"} />
                <p className="text-[12px] bg-transparent hidden sm:block font-bold font-DMSans">
                  Create a News
                </p>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 rounded-lg h-[60vh] p-2">
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="relative flex bg-white border-[1px] border-[#ddd] p-2 rounded-lg mb-2 shadow-xl w-full lg:w-[400px] h-[200px] justify-between gap-2 items-start"
                >
                  <div className="flex absolute justify-between items-center gap-2 bg-white right-3">
                    <button
                      className=""
                      onClick={() => handleViewNews(blog._id)}
                    >
                      <Eye className="w-[25px] h-[25px] hover:text-[#80BD25] bg-white" />
                    </button>
                    <button
                      className=""
                      onClick={() =>
                        setisDeleteNews({
                          bl_status: true,
                          blogId: blog._id,
                        })
                      }
                    >
                      <Trash className="w-[25px] h-[25px] hover:text-[#80BD25] bg-white" />
                    </button>
                  </div>
                  <div className="bg-white w-[25%] rounded-lg">
                    {blog.images.length > 0 && (
                      <img
                        src={blog.images[0]}
                        alt={`Blog Image`}
                        className="rounded-lg"
                      />
                    )}
                  </div>
                  <div className="w-full bg-white lg:w-[85%]">
                    <h3 className="bg-white text-[#000] text-left font-bold font-DMSans text-[18px]">
                      {blog.title}
                    </h3>
                    <div className="bg-white">
                      <div
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                        className="overflow-x-hidden px-2 rounded-lg overflow-y-hidden h-[110px] bg-white text-[#000] text-left font-normal font-DMSans text-[14px]"
                      ></div>
                    </div>
                    <p className="bg-white mt-2 overflow-x-hidden overflow-y-hidden text-[#000] text-left font-normal font-DMSans text-[12px]">
                      <span className="font-semibold italic bg-inherit">
                        Author :
                      </span>{" "}
                      <span className="italic bg-inherit">
                        {blog.author.firstName} {blog.author.lastName}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDeletedSuccess && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isDeletedSuccess ? 1 : 0,
              y: isDeletedSuccess ? 0 : -20,
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
                News Deleted!
              </h2>
              <div className="flex w-full items-center bg-[#fff] justify-center">
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
                    News Deleted Successfully.
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
        </AnimatePresence>
      )}
      {isDeleteNews.bl_status && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isDeleteNews ? 1 : 0,
              y: isDeleteNews ? 0 : -20,
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
                Action can't be Undone!
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
                    Are you sure you want to Delete this News?
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
                      onClick={() => handeldelNews(isDeleteNews.blogId)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </DashboardArea>
  );
};

export default News;
