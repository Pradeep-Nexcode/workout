import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExercisesByCategory } from "../services/exercise/exerciseAction";

const Category = () => {
    const { id } = useParams();

    const { exercises } = useSelector((state) => state.exercise);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchExercisesByCategory(id));
    }, [dispatch, id]);

    return (
        <div className="p-6 space-y-6">
            <div>
                {/* <h1 className="text-3xl font-bold">
                    {category?.name || "Category"} Exercises
                </h1>
                <p className="text-gray-600">{category?.description}</p> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {exercises?.exercises?.map((exercise) => (
                    <Link
                        key={exercise._id}
                        to={`/exercise/${exercise._id}`}
                        className="border p-4 rounded hover:shadow"
                    >
                        <h2 className="text-xl font-semibold">{exercise.name}</h2>
                        <p className="text-sm text-gray-500">{exercise.difficulty}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Category;
