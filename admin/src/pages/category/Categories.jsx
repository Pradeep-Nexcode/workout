import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories } from '../../services/category/CategoryAction';
import { Link } from 'react-router-dom';

const Categories = () => {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Workout Categories</h1>

      {loading ? (
        <div className="text-gray-500">Loading categories...</div>
      ) : categories?.length === 0 ? (
        <div className="text-red-500">No categories found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-white/10 shadow rounded-lg p-4 hover:shadow-md transition"
            >
              <h2 className="text-lg font-medium text-white">{category.name}</h2>
              <p className="text-sm text-gray-100">{category.description || 'No description provided'}</p>

              {/* Placeholder buttons for admin actions */}
              <div className="mt-4 flex justify-end gap-2">
                <Link to={`/categories/${category._id}`} className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </Link>
                <button onClick={() => handleDelete(category._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
