import { BarLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <h3 className="text-lg mb-2">Loading...</h3>
      <BarLoader
        color="#FEBF00"
        speedMultiplier={1.5}
        height={10}
        width={200}
      />
    </div>
  );
};

export default Spinner;
