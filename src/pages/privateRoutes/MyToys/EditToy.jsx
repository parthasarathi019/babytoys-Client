import { useRef, useState } from "react";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const EditToy = ({ selectedToy, setToys }) => {
  const { _id, name, price, availableQty, details } = selectedToy;
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  // handle update toy action
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target;
      const price = Number(form.price.value);
      const availableQty = Number(form.availableQty.value);
      const details = form.details.value;
      const isValidAllField = [price, availableQty, details.trim()].every(
        Boolean
      );
      if (!isValidAllField)
        throw new Error("Please input all field by valid info");
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://edu-play-mart-server.vercel.app/api/seller/toys/${_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price,
            availableQty,
            details,
          }),
        }
      );

      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setToys((toys) => {
        const updatedToy = toys.find((toy) => toy._id === _id);
        updatedToy.price = price;
        updatedToy.availableQty = availableQty;
        updatedToy.details = details;
        return [...toys];
      });
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        iconColor: "#FEBF00",
        confirmButtonColor: "#FEBF00",
        text: "Toy is updated successfully!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update!",
        text: error.message,
      });
    } finally {
      ref.current.checked = false;
      setLoading(false);
    }
  };

  return (
    <>
      <input ref={ref} type="checkbox" id="editToy" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box card w-full max-w-xl shadow-2xl bg-base-100 relative">
          <label
            htmlFor="editToy"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleUpdate} className="card-body">
            <h2 className="font-bold text-xl text-center">Toy Name: {name}</h2>
            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                id="price"
                placeholder="price"
                defaultValue={price}
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="availableQty">
                <span className="label-text">Available Quantity</span>
              </label>
              <input
                type="text"
                id="availableQty"
                placeholder="available quantity"
                defaultValue={availableQty}
                className="input input-bordered focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="details">
                <span className="label-text">Details Description</span>
              </label>
              <textarea
                placeholder="description"
                id="details"
                defaultValue={details}
                className="input input-bordered py-2 min-h-16 focus:outline-none"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "loading" : ""}`}
              >
                {!loading && "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditToy;
