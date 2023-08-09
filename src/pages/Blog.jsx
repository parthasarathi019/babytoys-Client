import moment from "moment";
import { BiCalendar } from "react-icons/bi";
import { FaFacebookF, FaGoogle, FaPinterest, FaTwitter } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import usePageTitle from "../hooks/usePageTitle";

const Blog = () => {
  const blog = useLoaderData();
  const { question, answer, thumbnail, user, date } = blog;
  usePageTitle("Blog | " + question);

  return (
    <>
      <Breadcrumb heading="Blog">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>{question.substring(0, 42)}</li>
        </ul>
      </Breadcrumb>

      <div className="container my-12" data-aos="zoom-out-up">
        <img src={thumbnail} alt="" className="w-full rounded-md mb-5" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-nunito">
          {question}
        </h1>
        <div className="flex items-center flex-wrap gap-4 my-6">
          <div className="flex items-center">
            <MdPerson className="text-2xl rounded-full border p-0.5 mr-2" />
            <h3 className="opacity-75">By {user}</h3>
          </div>
          <div className="flex items-center">
            <BiCalendar className="text-2xl mr-2" />
            <h3 className="opacity-75">
              {moment(date).format("MMM DD, YYYY")}
            </h3>
          </div>
        </div>
        <div className="space-y-3 md:text-lg mb-8">
          {answer.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="flex items-center gap-3 font-extrabold font-nunito">
          Share with us:
          <FaFacebookF className="cursor-pointer hover:text-primary duration-300" />
          <FaTwitter className="cursor-pointer hover:text-primary duration-300" />
          <FaPinterest className="cursor-pointer hover:text-primary duration-300" />
          <FaGoogle className="cursor-pointer hover:text-primary duration-300" />
        </p>
      </div>
    </>
  );
};

export default Blog;
