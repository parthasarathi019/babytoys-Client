import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import usePageTitle from "../../hooks/usePageTitle";
import { AuthContext } from "../../provider/AuthProvider";

const AddAToy = () => {
  usePageTitle("Add A Toy");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // add a product action
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target;
      const image = form.image.value;
      const name = form.name.value;
      const sellerName = user.displayName;
      const sellerEmail = user.email;
      const subCategory = form.subCategory.value;
      const price = Number(form.price.value);
      const rating = Number(form.rating.value);
      const availableQty = Number(form.availableQty.value);
      const details = form.details.value;
      const isValidAllField = [
        image.trim(),
        name.trim(),
        sellerName.trim(),
        sellerEmail.trim(),
        subCategory,
        price,
        rating,
        availableQty,
        details.trim(),
      ].every(Boolean);

      if (!isValidAllField)
        throw new Error("Please input all field by valid information");

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://edu-play-mart-server.vercel.app/api/seller/toys",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image,
            name,
            sellerName,
            sellerEmail,
            subCategory,
            price,
            rating,
            availableQty,
            details,
          }),
        }
      );
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      Swal.fire({
        icon: "success",
        title: "Success!",
        iconColor: "#FEBF00",
        confirmButtonColor: "#FEBF00",
        text: "Toy is added successfully!",
      });
      form.reset();
      navigate("/seller/toys");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add!",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb heading="Add A Toy">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Seller</li>
          <li>Add A Toy</li>
        </ul>
      </Breadcrumb>

      <div className="container my-16">
        <div
          className="card w-full max-w-3xl mx-auto bg-base-200 rounded-none"
          data-aos="zoom-in"
        >
          <form onSubmit={handleAdd} className="card-body">
            <div className="form-control">
              <label className="label" htmlFor="image">
                <span className="label-text">Image URL</span>
              </label>
              <input
                type="text"
                id="image"
                placeholder="image url"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Toy Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="toy name"
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1 form-control">
                <label className="label" htmlFor="price">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="text"
                  id="price"
                  placeholder="price"
                  className="input input-bordered focus:outline-none"
                />
              </div>
              <div className="flex-1 form-control">
                <label className="label">
                  <span className="label-text">Subcategory</span>
                </label>
                <select
                  className="select select-bordered w-full focus:outline-none font-normal"
                  id="subCategory"
                  defaultValue=""
                >
                  <option value="" disabled>
                    subcategory
                  </option>
                  <option>Toys & Games</option>
                  <option>Puzzle Toys</option>
                  <option>Development Toys & Kits</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1 form-control">
                <label className="label" htmlFor="availableQty">
                  <span className="label-text">Available Quantity</span>
                </label>
                <input
                  type="text"
                  id="availableQty"
                  placeholder="available quantity"
                  className="input input-bordered focus:outline-none"
                />
              </div>
              <div className="flex-1 form-control">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <select
                  className="select select-bordered w-full focus:outline-none font-normal"
                  id="rating"
                  defaultValue=""
                >
                  <option value="" disabled>
                    rating
                  </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>4.5</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="details">
                <span className="label-text">Details Description</span>
              </label>
              <textarea
                placeholder="description"
                id="details"
                className="input input-bordered py-2 min-h-16 focus:outline-none"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
              >
                {!loading && "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAToy;
