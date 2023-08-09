import { BiTime } from "react-icons/bi";
import {
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaPhoneAlt,
  FaPinterest,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="pt-10">
      <div className="footer container py-4">
        <div>
          <Link to="/" className="flex items-center" data-aos="zoom-in">
            <img src={logo} alt="logo" className="w-14 max-[360px]:w-12" />
            <h2 className="font-nunito font-extrabold text-2xl max-[360px]:text-xl mt-1 ml-1 text-secondary-focus leading-10 letter tracking-tighter">
              <span className="text-primary">Edu</span>
              PlayMart
            </h2>
          </Link>
          <a
            className="link link-hover flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <FaFacebookF /> Facebook
          </a>
          <a
            className="link link-hover flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <FaInstagram /> Instagram
          </a>
          <a
            className="link link-hover flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <FaPinterest /> Pinterest
          </a>
        </div>
        <div>
          <span
            className="footer-title opacity-100 text-lg font-semibold"
            data-aos="zoom-in"
          >
            INFORMATION
          </span>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            About Search
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Privacy Policy
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Terms & Condition
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Faq & Help
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Refund & Return
          </a>
        </div>
        <div>
          <span
            className="footer-title opacity-100 text-lg font-semibold"
            data-aos="zoom-in"
          >
            SUPPORT
          </span>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Chat Support
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Terms of Support
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Press Release
          </a>
          <a
            className="link link-hover"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            Star Support
          </a>
        </div>
        <div>
          <span
            className="footer-title opacity-100 text-lg font-semibold"
            data-aos="zoom-in"
          >
            CONTACT US
          </span>
          <p
            className="flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <FaHome /> Dhaka, Bangladesh
          </p>
          <p
            className="flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <FaPhoneAlt /> 0000 - 123 - 456789
          </p>
          <p
            className="flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <BiTime /> 9.00AM - 6.00PM
          </p>
          <a
            className="link link-hover flex items-center gap-2"
            data-aos="fade-left"
            data-aos-offset={100}
          >
            <HiMail /> demo@example.com
          </a>
        </div>
      </div>
      <div className="footer footer-center p-4 glass">
        <div>
          <p>Copyright © 2023 - All right reserved by Partha Sarathi Halder</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
