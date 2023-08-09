import { useContext } from "react";
import { BiLogIn } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/images/logo.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser()
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Success!",
          iconColor: "#FEBF00",
          text: "Log out successful!",
        })
      )
      .catch((err) =>
        Swal.fire({ icon: "error", title: "Failed!", text: err.message })
      );
  };
  return (
    <nav className="fixed top-0 bg-white/90 w-full z-20">
      <div className="container navbar justify-between py-4">
        <Link to="/" className="shrink-0">
          <img src={logo} alt="logo" className="w-14 max-[360px]:w-12" />
          <h2 className="font-nunito font-extrabold text-2xl max-[360px]:text-xl mt-1 ml-1 text-secondary-focus leading-10 letter tracking-tighter">
            <span className="text-primary">Edu</span>
            PlayMart
          </h2>
        </Link>

        {/* for larger device */}
        <div className="hidden md:flex w-full justify-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-toys">All Toys</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/seller/toys">My Toys</NavLink>
                </li>
                <li>
                  <NavLink to="/seller/add-toy">Add A Toy</NavLink>
                </li>
              </>
            )}
            <li>
              {/* <NavLink to="/blogs">Blogs</NavLink> */}
            </li>
          </ul>
        </div>
        <div className="shrink-0">
          {user && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-primary btn-circle avatar p-0.5 tooltip tooltip-left normal-case"
                data-tip={user.displayName}
              >
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-full aspect-square object-cover object-center rounded-full"
                />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Log Out</a>
                </li>
              </ul>
            </div>
          )}

          {!user && (
            <Link
              to="/login"
              className="flex items-center font-bold hover:text-primary duration-300"
            >
              Login <BiLogIn className="text-xl ml-1" />
            </Link>
          )}

          {/* for small device */}
          <div className="dropdown dropdown-end md:hidden ml-2">
            <label
              tabIndex={0}
              className="btn btn-ghost hover:bg-inherit btn-circle text-lg font-normal"
            >
              <HiMenuAlt3 className="text-2xl mr-1" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/all-toys">All Toys</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to="/seller/toys">My Toys</NavLink>
                  </li>
                  <li>
                    <NavLink to="/seller/add-toy">Add A Toy</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
