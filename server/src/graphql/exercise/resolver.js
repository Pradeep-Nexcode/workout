import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
 
import tryCatch from "../../utils/functions/tryCatch.js";
import successResponse from "../../utils/response/successResponse.js";
 

const exerciseResolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllExercises: tryCatch(async () => {
      const data = await getAllExercisesService();
      return successResponse("Exercises fetched successfully", data);
    }),
  }
}