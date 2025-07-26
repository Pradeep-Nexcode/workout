 import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchExerciseById } from "../services/exercise/exerciseAction";
import { Dumbbell, Flame, Settings, Play } from "lucide-react"; // Icons

const Exercise = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { exercise, loading } = useSelector((state) => state.exercise);

  useEffect(() => {
    if (id) dispatch(fetchExerciseById(id));
  }, [dispatch, id]);

  if (loading || !exercise) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-neutral- min-h-screen text-white pb-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-orange-600 to-red-700 rounded-b-3xl p-6 md:p-10 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase">{exercise.name}gfhj</h1>
          <p className="text-orange-200 mt-2 text-lg">{exercise.slug}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl  mx-auto px-6 mt-10">
        {/* Image */}

        <div className="flex items-center justify-center">

        {exercise.image?.url && (
          <img
            src={exercise.image.url}
            alt={exercise.image.altText || exercise.name}
            className="w-auto h-72 md:h-[400px] object-cover rounded-2xl shadow-lg"
          />
        )}

        </div>

        {/* Quick Info Tags */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm font-semibold">
          <span className="flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full">
            <Flame size={18} /> {exercise.difficulty}
          </span>
          <span className="flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full">
            <Settings size={18} /> {exercise.type}
          </span>
          <span className="flex items-center gap-2 bg-gray-800 px-4 py-1 rounded-full">
            <Dumbbell size={18} /> {exercise.category?.name}
          </span>
        </div>

        {/* Primary Muscles */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">💪 Target Muscles</h2>
          <div className="flex flex-wrap gap-3">
            {exercise.primaryMuscles.map((m, i) => (
              <span
                key={i}
                className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-3">🛠 Equipment</h2>
          <div className="flex flex-wrap gap-3">
            {exercise.equipment.map((eq, i) => (
              <span
                key={i}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">📋 Instructions</h2>
          <div className="grid gap-4">
            {exercise.instructions.map((step, idx) => (
              <div
                key={idx}
                className="bg-neutral-800 p-4 rounded-xl shadow flex items-start gap-3"
              >
                <span className="text-orange-500 font-bold text-lg">{idx + 1}.</span>
                <p className="text-gray-200">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Preview */}
        {exercise.videoUrl && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <Play size={24} /> Video Demo
            </h2>
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={exercise.videoUrl}
                title="Exercise Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Gallery */}
        {exercise.images?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-3">🖼 More Angles</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {exercise.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.altText || `Exercise Image ${i + 1}`}
                  className="w-full h-40 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercise;
