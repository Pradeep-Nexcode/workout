import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import {
  updateCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
} from "../../services/category.service.js";
import tryCatch from "../../utils/functions/tryCatch.js";
import successResponse from "../../utils/response/successResponse.js";

const categoryResolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllCategories: tryCatch(async () => {
      const data = await getAllCategoriesService();

      return successResponse("Categories fetched successfully", data);
    }),

    getCategoryById: tryCatch(async (_, { id }) => {
      const data = await getCategoryByIdService(id);
      if (!data) throw new Error("Category not found.");
      return successResponse("Category fetched successfully", data);
    }),
  },

  Mutation: {
    createCategory: tryCatch(async (_, { input }, context) => {
      console.log("Creating category, input:", input);
      const data = await createCategoryService(input, context.req);
      console.log("Created category data:", data);
      return successResponse("Category created successfully", data);
    }),

    updateCategory: tryCatch(async (_, { id, input }, context) => {
      const data = await updateCategoryService(id, input, context.req);
      return successResponse("Category updated successfully", data);
    }),

    deleteCategory: tryCatch(async (_, { id }) => {
      const success = await deleteCategoryService(id);
      return {
        success,
        message: success ? "Category deleted" : "Delete failed",
      };
    }),
  },
};

export default categoryResolvers;
