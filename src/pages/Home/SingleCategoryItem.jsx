/* eslint-disable react/prop-types */
import { useContext } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Swal from "sweetalert2";
import loadingSvg from "../../assets/spinner.svg";
import { useLazyImage } from "../../hooks/useLazyImage";
import { AuthContext } from "../../provider/AuthProvider";

const SingleCategoryItem = ({ item }) => {
  const { user } = useContext(AuthContext);
  const { _id, image, name, price, rating } = item;
  const { imageRef, shouldLoadImage } = useLazyImage();
  const navigate = useNavigate();

  return (
    <div
      className="card card-compact w-full shadow-sm rounded-none"
      data-aos="zoom-out-up"
    >
      <figure>
        <img
          ref={imageRef}
          src={shouldLoadImage ? image : loadingSvg}
          alt="Shoes"
          className="w-full aspect-square object-cover object-center"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-nunito font-extrabold">{name}</h2>
        <StarRatings
          rating={rating}
          starRatedColor="#FEBF00"
          starDimension="20px"
          starSpacing="1px"
          numberOfStars={5}
          name="rating"
        />
        <div className="card-actions justify-between mt-2">
          <h3 className="text-lg font-semibold">${price}</h3>

          {/* view details button */}
          <button
            onClick={() => {
              if (!user)
                Swal.fire({
                  icon: "info",
                  title: "Login please!",
                  iconColor: "#FEBF00",
                  text: "You have to log in first to view details",
                  confirmButtonColor: "#FEBF00",
                });
              navigate(`/toy/${_id}`);
            }}
            className="text-2xl text-primary hover:text-primary-focus active:scale-95"
          >
            <HiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCategoryItem;
