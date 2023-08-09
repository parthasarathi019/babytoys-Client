import Aos from "aos";
import { useEffect, useState } from "react";
import { HiOutlineArrowUp } from "react-icons/hi";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

const Main = () => {
  const { state } = useNavigation();
  const [hideScrollTopBtn, setHideScrollTopBtn] = useState(true);

  useEffect(() => {
    Aos.init({
      offset: 150,
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setHideScrollTopBtn(document.documentElement.scrollTop < 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden pt-[86px]">
      <Navbar />
      <ScrollRestoration />
      {state === "loading" ? <Spinner /> : <Outlet />}
      <Footer />

      {/* scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        className={`fixed bottom-3 right-3 btn btn-primary btn-square btn-circle z-20 text-xl disabled:opacity-0 ${
          hideScrollTopBtn ? "hidden" : ""
        }`}
      >
        <HiOutlineArrowUp />
      </button>
    </div>
  );
};

export default Main;
