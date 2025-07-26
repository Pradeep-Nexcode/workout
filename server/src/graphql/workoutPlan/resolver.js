import tryCatch from "../../utils/functions/tryCatch.js";
import {
  createUserWorkoutPlanService,
  completeWorkoutPlanService,
  updateWorkoutProgressService,
  getWorkoutPlanByDateService,
  getWorkoutHistoryService,
} from "../../services/workoutPlan.service.js";

const userWorkoutPlanResolvers = {
  Query: {
    getMyWorkoutPlan: tryCatch(async (_, { date }, context) => {
      return await getWorkoutPlanByDateService(context.req.user._id, date);
    }),
    getMyWorkoutHistory: tryCatch(async (_, __, context) => {
      return await getWorkoutHistoryService(context.req.user._id);
    }),
  },

  Mutation: {
    createUserWorkoutPlan: tryCatch(async (_, { input }, context) => {
      return await createUserWorkoutPlanService(input, context.req.user._id);
    }),

    completeWorkoutPlan: tryCatch(async (_, { id }) => {
      return await completeWorkoutPlanService(id);
    }),

    updateWorkoutProgress: tryCatch(async (_, { id, exerciseId }) => {
      return await updateWorkoutProgressService(id, exerciseId);
    }),
  },
};

export default userWorkoutPlanResolvers;
