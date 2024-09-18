import { useEffect, useRef, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "../components/ui/ImageUploader/ImageUploader";
import { create_a_blog, get_a_blog } from "../utils/apiService";
import { AnimatePresence, motion } from "framer-motion";
import { error, success } from "../assets";
import { ArrowLeft } from "react-huge-icons/outline";
import { useNavigate, useParams } from "react-router-dom";

const NewBlog = () => {
  const tooltipRef = useRef<HTMLElement>(null);
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    images: [],
  });
  const navigate = useNavigate();
  const { user } = useUser();
  const { blogId } = useParams();
  const [staffName, setStaffName] = useState("");
  const [isnewBlog, setIsnewBlog] = useState(false);
  const [isnewBlogFailed, setisnewBlogFailed] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  useEffect(() => {
    const get_News = async () => {
      try {
        const res = await get_a_blog(blogId);
        console.log(res);

        setBlog({
          title: res.data.title,
          content: res.data.content,
          author: res.data.author.firstName,
          category: res.data.category,
          images: res.data.images,
        });
      } catch (error) {
        console.log(error);
      }
    };
    get_News();
  }, [blogId]);

  const handleImagesSelected = (images: any) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      images: images,
    }));
  };

  const handleContentChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      category: e.target.value,
    }));
  };
  const resetImageUploader = () => {
    setResetFlag(true);
    setTimeout(() => setResetFlag(false), 0); // Reset flag after triggering
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      formData.append("author", user.staffRec._id);
      formData.append("category", blog.category);

      blog.images.forEach((image) => {
        formData.append("images", image);
      });
      console.log(blog);
      await create_a_blog(formData);
      setIsnewBlog(true);
      setBlog({
        title: "",
        content: "",
        author: "",
        category: "",
        images: [],
      });
      resetImageUploader();
      setTimeout(() => {
        setIsnewBlog(false);
      }, 1000);
    } catch (error) {
      setisnewBlogFailed(true);
      setTimeout(() => {
        setisnewBlogFailed(false);
      }, 1000);
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleNewNews = () => {
    navigate("/news");
  };

  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="w-full flex justify-start items-end">
        <button
          className="bg-inherit mb-4 flex justify-between items-center gap-2 text-[#3B5712] px-2 py-2 rounded-lg"
          onClick={handleNewNews}
        >
          <motion.div
            whileHover={{ x: -5 }} // Move the arrow left by 5px on hover
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-transparent w-[30px] h-[30px]"
          >
            <ArrowLeft className="bg-transparent w-[40px] h-[40px]" />
          </motion.div>
        </button>
      </div>
      <div className="pt-5 w-full lg:w-[50%]  shadow-lg  m-auto bg-white px-4 h-full rounded-[8px]">
        {blogId === undefined ? (
          <h2 className="bg-white text-[#000] rounded-lg text-left font-bold font-DMSans text-[18px]">
            Create News
          </h2>
        ) : (
          <h2 className="bg-white text-[#000] rounded-lg text-left font-bold font-DMSans text-[18px]">
            Edit News
          </h2>
        )}
        <div className="flex bg-white justify-between items-center w-full lg:w-[600px] gap-4 overflow-x-auto">
          {blog.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Blog Image`}
              className="rounded-lg w-[200px] h-[200px]"
            />
          ))}
        </div>
        <div className="pb-4 flex h-full bg-white flex-col gap-4 overflow-y-auto justify-between items-start">
          <div className="flex flex-col items-left bg-[#fff] justify-center pt-4  w-full ">
            <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
              Title
            </p>
            <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
              {/* <UserCircleBlock className="bg-inherit h-[30px] w-[30px] text-[#ddd]" /> */}
              <input
                type="text"
                className="w-full focus:outline-none h-full px-2"
                placeholder="News Title"
                name="title"
                value={blog.title}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-left bg-[#fff] justify-center w-full">
            <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
              Category
            </p>
            <div className="h-[40px] flex justify-between items-center w-full border-[1px] border-[#ddd] bg-slate-400 rounded-md">
              <select
                className="w-full focus:outline-none h-full px-2 rounded-md"
                name="category"
                value={blog.category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="news">News</option>
                <option value="blog">Blog</option>
                <option value="article">Article</option>
                <option value="announcement">Announcement</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col items-left bg-[#fff] justify-center  w-full ">
            <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
              Content
            </p>
            <div className=" rounded-md">
              <textarea
                value={blog.content}
                onChange={handleContentChange}
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#80BD25]"
                placeholder="Enter your content here..."
              />
            </div>
          </div>
          <div className="flex flex-col items-left bg-[#fff] justify-center  w-full ">
            <p className="bg-inherit text-[13px] text-[#80BD25] mb-1 font-semibold">
              Click ro Select Image(s){" "}
              <span className="italic font-semibold bg-white text-[12px] text-[#000]">
                You can select the maximum of 5 pictures{" "}
              </span>
            </p>
            <div className=" bg-inherit rounded-md">
              <ImageUploader
                onImagesSelected={handleImagesSelected}
                onReset={resetFlag}
              />
            </div>
          </div>
          <button
            className="bg-[#80BD25] h-[40px]  w-full  rounded-md font-semibold text-[#fff] my-4"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
      {isnewBlog && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isnewBlog ? 1 : 0,
              y: isnewBlog ? 0 : -20,
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
                    {blog.category} Created Successfully.
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {isnewBlogFailed && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isnewBlogFailed ? 1 : 0,
              y: isnewBlogFailed ? 0 : -20,
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
                    src={error}
                    alt=""
                    initial="hidden"
                    animate="visible"
                    variants={fadeInVariants}
                    transition={{ duration: 6 }}
                    className="mb-8 w-[30%] bg-inherit"
                  />
                  <h2 className="pb-4 text-center text-[25px] font-semibold bg-white text-[#16151C]">
                    {blog.category} Not Created, Please Try again.
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

export default NewBlog;
