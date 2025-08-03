import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../services/category/CategoryAction";

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className=" min-h-screen text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 uppercase text-orange-400">
          Workout Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug || cat._id}`}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:scale-[1.03] transition-transform"
            >
              {/* Image background */}
              {cat.images?.[0]?.url && (
                <img
                  src={cat.images[0].url}
                  alt={cat.images[0].altText || cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition"
                />
              )}

              {/* Overlay */}
              <div className="relative z-10 p-4 flex flex-col justify-between h-full">
                <div className="text-lg font-bold text-orange-300 drop-shadow mb-2">
                  {cat.name}
                </div>
                {cat.description && (
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl group-hover:bg-opacity-20 transition" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
