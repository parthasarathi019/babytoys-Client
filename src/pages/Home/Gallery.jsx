/* eslint-disable react/prop-types */
import loadingSvg from "../../assets/spinner.svg";
import { useLazyImage } from "../../hooks/useLazyImage";

// gallery image component
const GalleryImage = ({ item }) => {
  const { imageRef, shouldLoadImage } = useLazyImage();

  return (
    <img
      ref={imageRef}
      src={shouldLoadImage ? item.img : loadingSvg}
      className="w-full aspect-square object-cover object-center border-2 border-white custom-shadow"
      data-aos="zoom-out-up"
    />
  );
};

// gallery main component
const Gallery = ({ gallery }) => {
  return (
    <div className="container my-20">
      {/* heading */}
      <h1
        className="text-center text-4xl sm:text-5xl font-extrabold mb-12 font-nunito"
        data-aos="zoom-in"
      >
        Gallery
      </h1>
      {/* gallery images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        {gallery.map((item) => (
          <GalleryImage key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
