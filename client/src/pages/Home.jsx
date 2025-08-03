import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../components/common/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../services/category/CategoryAction";

const Home = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-10 text-white">
      {/* Banner */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-accent">
          Welcome to FitHub 💪
        </h1>
        <p className="text-muted text-lg">
          Discover exercises, browse categories, and get stronger.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto">
        <SearchInput
          placeholder="Search exercises..."
          onSearch={(q) => console.log("Search query:", q)}
        />
      </div>

      {/* Categories */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Popular Categories</h2>
          <Link to="/categories" className="text-muted text-sm hover:text-accent">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              to={`/category/${cat._id}`}
              key={cat._id}
              className="bg-card p-5 rounded-lg border border-transparent hover:border-accent transition-shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-medium text-accent">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
