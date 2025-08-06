import tryCatch from "../../utils/functions/tryCatch.js";
import successResponse from "./../../utils/response/successResponse.js";
import {
  completeWorkoutPlanService,
  updateWorkoutProgressService,
  getWorkoutPlanByDateService,
  getWorkoutHistoryService,
  createWorkoutPlanService,
  getWorkoutPlansService,
  getWorkoutPlanByIdService,
} from "../../services/workoutPlan.service.js";

const userWorkoutPlanResolvers = {
  Query: {
    getMyWorkoutPlan: tryCatch(async (_, { date }, context) => {
      return await getWorkoutPlanByDateService(context.req.user._id, date);
    }),
    getMyWorkoutHistory: tryCatch(async (_, __, context) => {
      return await getWorkoutHistoryService(context.req.user._id);
    }),
    getTodayWorkoutPlan: tryCatch(async (_, __) => {
      const data = await getWorkoutPlansService(
        new Date().toISOString().split("T")[0]
      );
      return {
        success: true,
        message: "Today's workout plan fetched successfully",
        data,
      };
    }),

    getWorkoutPlanById: tryCatch(async (_, { id }, context) => {
      const data = await getWorkoutPlanByIdService(id);
      return successResponse("Workout plan fetched successfully", data);
    }),
  },

  Mutation: {
    createWorkoutPlan: tryCatch(async (_, { input }, context) => {
      const data = await createWorkoutPlanService(input);
      return successResponse("Workout plan created successfully", data);
    }),

    completeWorkoutPlan: tryCatch(async (_, { id }) => {

      console.log('ghjk')
      const data = await completeWorkoutPlanService(id);
      // return successResponse("Workout plan completed successfully", data);
      return  {
        success: true,
        message: "Workout plan completed successfully",
        data
      }
    }),

    updateWorkoutPlan: tryCatch(async (_, { id, exerciseId }) => {
      const data = await updateWorkoutProgressService(id, exerciseId);
      return successResponse("Workout plan updated successfully", data);
    }),
  },
};

export default userWorkoutPlanResolvers;
