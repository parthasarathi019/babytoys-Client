import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import Breadcrumb from "../../../components/Breadcrumb";
import Spinner from "../../../components/Spinner";
import usePageTitle from "../../../hooks/usePageTitle";
import EditToy from "./EditToy";

const MyToys = () => {
  usePageTitle("My Toys");
  const [toys, setToys] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedToy, setSelectedToy] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const myToys = await fetch(
          "https://edu-play-mart-server.vercel.app/api/seller/toys",
          {
            headers: {
              Authorization: token,
            },
          }
        ).then((res) => res.json());
        setToys(myToys);
      } catch (error) {
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  // handle sorting action
  const handleSorting = (sortBy) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(`https://edu-play-mart-server.vercel.app/api/seller/toys?sort=${sortBy}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // handle delete action
  const deleteToy = async (id) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure? You want to delete this toy?",
      showCancelButton: true,
      confirmButtonText: "Yes! Delete",
      iconColor: "#FEBF00",
      confirmButtonColor: "#FEBF00",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(
            `https://edu-play-mart-server.vercel.app/api/seller/toys/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: token,
              },
            }
          );
          const json = await res.json();
          if (json.error) throw new Error(json.error);
          setToys((toys) => {
            toys.filter((toy) => toy._id !== id);
            return { ...toys };
          });
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            iconColor: "#FEBF00",
            confirmButtonColor: "#FEBF00",
            text: "Item is deleted successfully!",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed to delete!",
            text: error.message,
          });
        }
      }
    });
  };

  if (initialLoading) return <Spinner />;

  return (
    <>
      <Breadcrumb heading="My Toys">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Seller</li>
          <li>My Toys</li>
        </ul>
      </Breadcrumb>

      <div className="container mt-20 mb-10">
        <div className="my-6 bg-base-200 p-4">
          {/* sorting */}
          <div className="flex items-center gap-3 w-fit mx-auto">
            <label htmlFor="sorting">Sort by</label>
            <select
              id="sorting"
              defaultValue=""
              onChange={(e) => handleSorting(e.target.value)}
              className="select w-fit focus:outline-none"
            >
              <option value="">Featured</option>
              <option value="price-ascending">Price, low to high</option>
              <option value="price-descending">Price, high to low</option>
            </select>
          </div>
        </div>
        {loading ? (
          // loading spinner
          <div className="flex flex-col items-center justify-center my-12">
            <h3 className="text-lg mb-2">Loading...</h3>
            <BarLoader
              color="#FEBF00"
              speedMultiplier={1.5}
              height={10}
              width={200}
            />
          </div>
        ) : toys.length > 0 ? (
          // my toys data table
          <div className="overflow-x-auto w-full">
            <table className="table w-full text-center">
              {/* head */}
              <thead>
                <tr>
                  <th className="font-extrabold text-base">Sl.</th>
                  <th className="font-extrabold text-base">Toy Name</th>
                  <th className="font-extrabold text-base">Subcategory</th>
                  <th className="font-extrabold text-base">Price</th>
                  <th className="font-extrabold text-base">
                    Available Quantity
                  </th>
                  <th className="font-extrabold text-base">Details</th>
                  <th className="font-extrabold text-base">Edit</th>
                  <th className="font-extrabold text-base">Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* rows */}
                {toys.map((toy, i) => (
                  <tr key={toy._id}>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={toy.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div className="text-start">
                          <div className="font-bold">{toy.name}</div>
                          <StarRatings
                            rating={toy.rating}
                            starRatedColor="#FEBF00"
                            starDimension="16px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name="rating"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{toy.subCategory}</td>
                    <td>${toy.price}</td>
                    <td>{toy.availableQty}</td>
                    <th>
                      {/* view details button */}
                      <Link
                        to={`/toy/${toy._id}`}
                        className="btn btn-primary btn-xs"
                      >
                        details
                      </Link>
                    </th>
                    <th>
                      {/* edit button */}
                      <label
                        htmlFor="editToy"
                        onClick={() => setSelectedToy(toy)}
                        title="Edit"
                        className="text-primary text-2xl hover:text-primary-focus active:scale-90 cursor-pointer"
                      >
                        <HiPencil />
                      </label>
                    </th>
                    <th>
                      {/* delete button */}
                      <button
                        title="Delete"
                        onClick={() => deleteToy(toy._id)}
                        className="text-secondary text-3xl hover:text-secondary-focus active:scale-90"
                      >
                        <MdDeleteForever />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // if there have no items in my toys
          <div className="flex flex-col items-center justify-center gap-4 my-5">
            <p className="text-center text-error text-lg">
              You did not add any items to sell!
            </p>
            {/* add a toy button */}
            <Link
              to="/seller/add-toy"
              className="btn btn-primary w-44 rounded-full"
            >
              Add A Toy
            </Link>
          </div>
        )}
      </div>
      <EditToy selectedToy={selectedToy} setToys={setToys} />
    </>
  );
};

export default MyToys;
