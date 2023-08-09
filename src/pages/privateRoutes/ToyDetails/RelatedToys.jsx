/* eslint-disable react/prop-types */
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleCategoryItem from "../../Home/SingleCategoryItem";

const RelatedToys = ({ relatedToys }) => {
  return (
    <div className="container mt-28 mb-8">
      <h1
        className="text-center text-4xl sm:text-5xl font-extrabold mb-12 font-nunito"
        data-aos="zoom-in"
      >
        Related Toys
      </h1>

      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        grabCursor
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {relatedToys.map((item) => (
          <SwiperSlide key={item._id}>
            <SingleCategoryItem item={item} />
          </SwiperSlide>
        ))}

        {/* navigation controller buttons */}
        <div className="w-fit mx-auto flex items-center justify-center gap-6 mt-6">
          <button className="prev-btn btn glass text-primary hover:bg-primary-focus hover:text-black btn-square btn-circle text-3xl disabled:opacity-0">
            <HiChevronLeft />
          </button>
          <button className="next-btn btn glass text-primary hover:bg-primary-focus hover:text-black btn-square btn-circle text-3xl disabled:opacity-0">
            <HiChevronRight />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default RelatedToys;
