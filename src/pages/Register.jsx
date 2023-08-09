import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../components/Breadcrumb";
import Spinner from "../components/Spinner";
import usePageTitle from "../hooks/usePageTitle";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  usePageTitle("Register");
  const { user, loading, error, createUser } = useContext(AuthContext);
  const [internalError, setInternalError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setInternalError(null);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    try {
      if (name.trim().length < 3)
        throw new Error("Name should contain minimum 3 characters");
      if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) === false)
        throw new Error("Please input valid Email");
      if (!photoURL.trim()) throw new Error("Please input photo URL");
      if (password.length < 8)
        throw new Error("Password should be minimum 8 characters");
      if (password !== confirmPassword)
        throw new Error("Password did not match");
      const result = await createUser(name, photoURL, email, password);
      if (result.message)
        Swal.fire({
          icon: "success",
          title: "Success!",
          iconColor: "#FEBF00",
          confirmButtonColor: "#FEBF00",
          text: result.message,
        });
      form.reset();
    } catch (error) {
      setInternalError(error.message);
    }
  };

  // when auth in loading state
  if (loading) return <Spinner />;
  // when user is already logged in
  if (user) return <Navigate to="/" replace={true} />;

  return (
    <>
      <Breadcrumb heading="Register">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Register</li>
        </ul>
      </Breadcrumb>

      <div className="container my-16">
        <div
          className="card w-full max-w-3xl mx-auto bg-base-200 my-10 rounded-none"
          data-aos="zoom-in"
        >
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="name"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="photoURL">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                id="photoURL"
                placeholder="photo url"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="confirmPassword">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="confirm password"
                className="input input-bordered focus:outline-none"
              />
            </div>
            {(error || internalError) && (
              <p className="pt-2 text-center text-error">
                {error || internalError}
              </p>
            )}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>

              {/* link to login page */}
              <p className="text-center mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-focus hover:underline font-semibold"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
