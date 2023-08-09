import moment from "moment/moment";
import { BiCalendar } from "react-icons/bi";
import { MdPerson } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import loadingSvg from "../assets/spinner.svg";
import Breadcrumb from "../components/Breadcrumb";
import { useLazyImage } from "../hooks/useLazyImage";
import usePageTitle from "../hooks/usePageTitle";

const BlogItem = ({ blog }) => {
  const { imageRef, shouldLoadImage } = useLazyImage();
  return (
    <div
      key={blog._id}
      className="shadow-sm p-4 flex flex-col justify-between"
      data-aos="zoom-out-up"
    >
      <img
        ref={imageRef}
        src={shouldLoadImage ? blog.thumbnail : loadingSvg}
        alt=""
        className="w-full aspect-square object-cover object-center"
      />
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold font-nunito">{blog.question}</h2>
        <div className="flex items-center justify-between flex-wrap gap-2 my-4">
          <div className="flex items-center">
            <MdPerson className="text-2xl rounded-full border p-0.5 mr-2" />
            <h3 className="opacity-75">By {blog.user}</h3>
          </div>
          <div className="flex items-center">
            <BiCalendar className="text-2xl mr-2" />
            <h3 className="opacity-75">
              {moment(blog.date).format("MMM DD, YYYY")}
            </h3>
          </div>
        </div>
        <p>{blog.answer.substring(0, 100)}...</p>
      </div>

      {/* link to go to blog details page */}
      <Link
        to={`/blog/${blog._id}`}
        className="btn btn-primary rounded-full w-44 normal-case"
      >
        Read more
      </Link>
    </div>
  );
};

const Blogs = () => {
  const blogs = useLoaderData();
  usePageTitle("Blogs");
  return (
    <>
      <Breadcrumb heading="Blogs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Blogs</li>
        </ul>
      </Breadcrumb>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
