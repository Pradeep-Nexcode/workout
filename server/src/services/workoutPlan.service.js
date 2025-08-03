import workoutPlan from "../models/workoutPlan.js";

export const createUserWorkoutPlanService = async (input, userId) => {
  const today = new Date().toISOString().split("T")[0];
  const existing = await workoutPlan.findOne({ user: userId, date: today });

  if (existing) throw new Error("Workout plan for today already exists.");

  return await workoutPlan.create({
    user: userId,
    date: today,
    ...input,
  });
};

export const completeWorkoutPlanService = async (id) => {
  return await workoutPlan.findByIdAndUpdate(
    id,
    {
      status: "Completed",
      completedAt: new Date(),
    },
    { new: true }
  );
};

export const updateWorkoutProgressService = async (planId, exerciseId) => {
  const plan = await workoutPlan.findById(planId);
  if (!plan) throw new Error("Workout plan not found.");

  const exercise = plan.exercises.find((ex) => ex.exerciseId.toString() === exerciseId);
  if (!exercise) throw new Error("Exercise not found in this workout.");

  exercise.completed = true;
  await plan.save();

  return plan;
};

export const getWorkoutPlanByDateService = async (userId, dateStr) => {
  const date = new Date(dateStr).toISOString().split("T")[0];
  return await workoutPlan.findOne({ user: userId, date });
};

export const getWorkoutHistoryService = async (userId) => {
  return await workoutPlan.find({ user: userId }).sort({ date: -1 });
};
