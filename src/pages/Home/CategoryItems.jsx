/* eslint-disable react/prop-types */
import SingleCategoryItem from "./SingleCategoryItem";

const CategoryItems = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-8">
      {items.map((item) => (
        <SingleCategoryItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CategoryItems;
