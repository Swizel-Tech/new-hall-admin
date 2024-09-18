import { useEffect, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import "react-quill/dist/quill.snow.css";
import { get_a_blog } from "../utils/apiService";
import { motion } from "framer-motion";
import { ArrowLeft } from "react-huge-icons/outline";
import { useNavigate, useParams } from "react-router-dom";

const Blog = () => {
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
            whileHover={{ x: -5 }}
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
              <input
                type="text"
                className="w-full focus:outline-none h-full px-2"
                placeholder="News Title"
                name="title"
                value={blog.title}
                readOnly
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
        </div>
      </div>
    </DashboardArea>
  );
};

export default Blog;
