import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import tryCatch from "../../utils/functions/tryCatch.js";
import successResponse from "../../utils/response/successResponse.js";
import {
  createWorkoutPlanService,
  deleteWorkoutPlanService,
  getAllWorkoutPlansService,
  getWorkoutPlanByIdService,
  updateWorkoutPlanService,
} from "../../services/workoutPlan.service.js";

const workoutPlanResolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllWorkoutPlans: tryCatch(async () => {
      const data = await getAllWorkoutPlansService();
      return successResponse("Workout plans fetched successfully", data);
    }),

    getWorkoutPlanById: tryCatch(async (_, { id }) => {
      const data = await getWorkoutPlanByIdService(id);
      if (!data) throw new Error("Workout plan not found.");
      return successResponse("Workout plan fetched successfully", data);
    }),
  },

  Mutation: {
    createWorkoutPlan: tryCatch(async (_, { input }, context) => {
      const data = await createWorkoutPlanService(input, context.req);
      return successResponse("Workout plan created successfully", data);
    }),

    updateWorkoutPlan: tryCatch(async (_, { id, input }, context) => {
      const data = await updateWorkoutPlanService(id, input, context.req);
      return successResponse("Workout plan updated successfully", data);
    }),

    deleteWorkoutPlan: tryCatch(async (_, { id }) => {
      const data = await deleteWorkoutPlanService(id);
      return successResponse("Workout plan deleted successfully", data);
    }),
  },
};

export default workoutPlanResolvers;
