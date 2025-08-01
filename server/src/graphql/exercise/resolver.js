import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import tryCatch from "../../utils/functions/tryCatch.js";
import successResponse from "../../utils/response/successResponse.js";
import {
  createExerciseService,
  deleteExerciseService,
  getAllExercisesService,
  getExerciseByIdService,
  getExercisesByCategoryService,
  updateExerciseService,
} from "../../services/exercies.service.js";

const exerciseResolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllExercises: tryCatch(async (_, { page, limit }) => {
      const result = await getAllExercisesService(page, limit);
      return successResponse("Exercises fetched successfully", result);
    }),

    getExerciseById: tryCatch(async (_, { id }) => {
      const data = await getExerciseByIdService(id);

      if (!data) throw new Error("Exercise not found.");
      return successResponse("Exercise fetched successfully", data);
    }),

    getExercisesByCategory: tryCatch(async (_, { categoryId }) => {
      const data = await getExercisesByCategoryService(categoryId);

      return successResponse("Exercises fetched successfully", data);
    }),
  },

  Mutation: {
    createExercise: tryCatch(async (_, { input }, context) => {
      console.log(input, "input");
      const data = await createExerciseService(input, context.req);
      return successResponse("Exercise created successfully", data);
    }),

    updateExercise: tryCatch(async (_, { id, input }, context) => {
      const data = await updateExerciseService(id, input, context.req);
      return successResponse("Exercise updated successfully", data);
    }),

    deleteExercise: tryCatch(async (_, { id }) => {
      const data = await deleteExerciseService(id);
      return successResponse("Exercise deleted successfully", data);
    }),
  },
};

export default exerciseResolvers;
