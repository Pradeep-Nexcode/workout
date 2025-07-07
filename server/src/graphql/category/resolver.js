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
    getAllCategories: () =>
      tryCatch(async () => {
        const data = await getAllCategoriesService();
        return successResponse("Categories fetched successfully", data);
      }),

    getCategoryById: (_, { id }) =>
      tryCatch(async () => {
        const data = await getCategoryByIdService(id);
        if (!data) throw new Error("Category not found.");
        return successResponse("Category fetched successfully", data);
      }),
  },

  Mutation: {
    createCategory: (_, { input }) =>
      tryCatch(async () => {
        const data = await createCategoryService(input);
        return successResponse("Category created successfully", data);
      }),

    updateCategory: (_, { id, input }) =>
      tryCatch(async () => {
        const data = await updateCategoryService(id, input);
        return successResponse("Category updated successfully", data);
      }),

    deleteCategory: (_, { id }) =>
      tryCatch(async () => {
        const success = await deleteCategoryService(id);
        return {
          success,
          message: success ? "Category deleted" : "Delete failed",
        };
      }),
  },
};

export default categoryResolvers;
