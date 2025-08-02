import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteExercise, fetchAllExercises } from '../../services/exercise/exerciseAction';
import Pagination from '../../components/common/Pagination';

const Exercises = () => {
  const dispatch = useDispatch();
  const { loading, exercises } = useSelector((state) => state.exercise);

  useEffect(() => {
    dispatch(fetchAllExercises({ page: 1, limit: 12 }));
  }, [dispatch]);


  const handleDelete = (exerciseId) => {
    dispatch(deleteExercise(exerciseId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Exercises</h1>

      {loading ? (
        <div className="text-gray-500">Loading exercises...</div>
      ) : exercises?.length === 0 ? (
        <div className="text-red-500">No exercises found</div>
      ) : (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {exercises?.exercises?.map((exercise) => (
              <div
                key={exercise._id}
                className="bg-white/10 shadow rounded-lg p-4 hover:shadow-md transition"
              >
                <h2 className="text-lg font-medium text-white">{exercise.name}</h2>
                <p className="text-sm text-gray-100">{exercise.description || 'No description provided'}</p>

                {/* Placeholder buttons for admin actions */}
                <div className="mt-4 flex justify-end gap-2">
                  <Link
                    to={`/exercises/${exercise._id}`}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(exercise._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            totalPages={exercises?.totalPages}
            currentPage={exercises?.page}
            itemsPerPage={exercises?.limit}
            onPageChange={(page) => dispatch(fetchAllExercises({ page, limit: 12 }))}
          />
        </>
      )}
    </div>
  );
};

export default Exercises;
