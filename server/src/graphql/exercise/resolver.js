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
    getAllExercises: tryCatch(async (_, args) => {
      const { page, limit, search, categoryId, isActive } = args;

      const { exercises, pagination } = await getAllExercisesService({
        page,
        limit,
        search,
        categoryId,
        isActive,
      });

      return {
        success: true,
        message: "Exercises fetched successfully",
        data: {
          exercises, // The list of exercises
          total: pagination.total, // Total count
          page: pagination.page, // Current page
          totalPages: pagination.totalPages, // Total pages
        },
      };
    }),

    getExerciseById: tryCatch(async (_, { id }) => {
      const data = await getExerciseByIdService(id);

      if (!data) throw new Error("Exercise not found.");
      return successResponse("Exercise fetched successfully", data);
    }),

    getExercisesByCategory: tryCatch(async (_, args) => {
      const { page, limit, categoryId } = args;
      if (!categoryId) throw new Error("Category ID is required.");

      const { data , pagination} = await getExercisesByCategoryService(categoryId, page, limit);

      return {
        success: true,
        message: "Exercises fetched successfully",
        data: {
          exercises: data, // The list of exercises
          total: pagination.total, // Total count
          page: pagination.page, // Current page
          totalPages: pagination.totalPages, // Total pages
        },
      };
    }),
  },

  Mutation: {
    createExercise: tryCatch(async (_, { input }, context) => {
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
