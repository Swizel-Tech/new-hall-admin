import { useEffect, useState } from "react";
import { DashboardArea } from "../components/ui/layout/dashboard/DashboardArea";
import { useUser } from "../context/user-provider";
import { get_a_blog } from "../utils/apiService";

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

const ViewBlog = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const { user } = useUser();
  const [staffName, setStaffName] = useState("");

  useEffect(() => {
    setStaffName(`${user.staffRec.firstName} ${user.staffRec.lastName}`);
  }, []);

  const get_all_blogs = async () => {
    try {
      const blogId = "";
      const blogs = await get_a_blog(blogId);
      console.log(blogs);

      setBlog(blogs.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_all_blogs();
  }, []);

  return (
    <DashboardArea title={`Welcome 👋 ${staffName}`}>
      <div className="pt-5 bg-white px-4 rounded-[8px]">
        <div className="flex justify-end items-center gap-3 bg-white">
          <button className="float-end px-4 py-2 text-[#fff] bg-[#80BD25] rounded-lg">
            Edit
          </button>
          <button className="float-end px-4 py-2 text-[#fff] bg-red-700 rounded-lg">
            Delete
          </button>
        </div>
        <div className="z-0 flex bg-white flex-col lg:flex-row gap-4 justify-between items-start">
          <div className="w-full bg-white lg:w-[80%] m-auto">
            <div className="w-full bg-white">
              {blog && (
                <>
                  <h3 className="bg-white text-[#000] rounded-lg text-left px-4 font-bold font-DMSans text-[32px]">
                    {blog.title}
                  </h3>
                  <p className="bg-white px-4 text-[#000] text-left font-normal font-DMSans text-[12px]">
                    <span className="font-semibold italic bg-inherit">
                      Author :
                    </span>{" "}
                    <span className="italic bg-inherit">
                      {blog.author.firstName} {blog.author.lastName}
                    </span>
                  </p>
                  <p className="bg-white px-4 text-[#000] text-left font-normal font-DMSans text-[12px]">
                    <span className="font-semibold italic bg-inherit">
                      Category :
                    </span>{" "}
                    {blog.tags.join(", ")}
                  </p>
                  <div className="flex flex-col gap-2 rounded-lg h-full overflow-y-auto bg-[#fff] p-2">
                    <div
                      key={blog._id}
                      className="flex bg-white p-2 rounded-lg mb-2 justify-between gap-2 items-start"
                    >
                      <div className="flex justify-start items-start flex-col gap-2">
                        {blog.images.map((image, index) => (
                          <img
                            key={index}
                            src={`http://localhost:3001/${image.replace(
                              /\\/g,
                              "/"
                            )}`}
                            alt={`Blog Image`}
                            className="rounded-lg w-[200px] h-[200px]"
                          />
                        ))}
                      </div>
                      <div className="w-full bg-white lg:w-[85%]">
                        <p className="bg-white leading-[30px] text-[#000] font-normal font-DMSans text-[16px] text-justify">
                          {blog.content}
                        </p>
                        {blog.published ? (
                          <p className="bg-white text-[#80BD25] font-semibold">
                            Published
                          </p>
                        ) : (
                          <p className="bg-white text-red-700 font-semibold">
                            Not Published
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardArea>
  );
};

export default ViewBlog;
