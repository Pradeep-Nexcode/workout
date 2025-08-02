import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Btn from "../components/buttons/Btn";
import ShadowCard from "../components/common/ShadowCard";
import { fetchWorkoutPlanById ,updateWorkoutPlan} from "../services/workoutplans/workoutplansAction";

const WorkoutPlanDetails = () => {
  const { id } = useParams(); // Plan ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { workoutPlan, loading } = useSelector((state) => state.workoutplan);

  // Load workout plan details
  useEffect(() => {
    if (id) dispatch(fetchWorkoutPlanById(id));
  }, [dispatch, id]);

  // Mark a single exercise completed
  const handleExerciseComplete = (exerciseId) => {
    dispatch(
      updateWorkoutPlan({
        id: workoutPlan._id,
        updates: {
          exercises: workoutPlan.exercises.map((ex) =>
            ex.exerciseId._id === exerciseId
              ? { ...ex, completed: true }
              : ex
          ),
        },
      })
    );
  };

  // Mark whole workout completed
  const handleCompleteWorkout = () => {
    dispatch(
      updateWorkoutPlan({
        id: workoutPlan._id,
        updates: { status: "Completed", completedAt: new Date() },
      })
    );
    navigate("/"); // Redirect after complete
  };

  if (loading) return <p>Loading workout details...</p>;
  if (!workoutPlan) return <p>No workout plan found</p>;

  return (
    <div className="p-4">
      <ShadowCard className="p-6">
        <h1 className="text-2xl font-bold mb-2">Workout Plan for {new Date(workoutPlan.date).toDateString()}</h1>
        <p className="text-gray-600 mb-4">
          Status: <span className="font-semibold">{workoutPlan.status}</span>
        </p>

        {workoutPlan.targetMuscles?.length > 0 && (
          <div className="mb-4">
            <h2 className="font-semibold">Target Muscles:</h2>
            <div className="flex gap-2 flex-wrap">
              {workoutPlan.targetMuscles.map((muscle, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-lg font-semibold mb-2">Exercises:</h2>
        <div className="space-y-3">
          {workoutPlan.exercises.map((exercise) => (
            <ShadowCard key={exercise.exerciseId._id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{exercise.exerciseId.name}</h3>
                  <p>Sets: {exercise.sets} | Reps: {exercise.reps} | Rest: {exercise.rest}</p>
                  <p>Status: {exercise.completed ? "✅ Completed" : "⏳ Pending"}</p>
                </div>
                {!exercise.completed && (
                  <Btn onClick={() => handleExerciseComplete(exercise.exerciseId._id)}>
                    Mark Complete
                  </Btn>
                )}
              </div>
            </ShadowCard>
          ))}
        </div>

        {workoutPlan.status !== "Completed" && (
          <div className="mt-6">
            <Btn onClick={handleCompleteWorkout} className="bg-green-500 text-white">
              Complete Workout
            </Btn>
          </div>
        )}
      </ShadowCard>
    </div>
  );
};

export default WorkoutPlanDetails;
