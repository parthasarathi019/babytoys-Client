/* eslint-disable react/prop-types */
import bg from "../assets/images/breadcrumb.webp";

const Breadcrumb = ({ heading, children }) => {
  return (
    <div
      className="h-[250px] bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(254, 191, 0, 0.8), rgba(254, 191, 0, 0.8)), url(${bg})`,
      }}
    >
      <h1 className="font-nunito font-extrabold text-4xl mb-2">{heading}</h1>
      <div className="breadcrumbs max-w-xs">{children}</div>
    </div>
  );
};

export default Breadcrumb;
