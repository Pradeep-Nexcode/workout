import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import tryCatch from "../../utils/functions/tryCatch.js";
import successResponse from "../../utils/response/successResponse.js";
import {
  createMuscleGroupService,
  deleteMuscleGroupService,
  getAllMuscleGroupsService,
  getMuscleGroupByIdService,
  updateMuscleGroupService,
} from "../../services/muscleGroup.service.js";

const muscleGroupResolvers = {
  Upload: GraphQLUpload,

  Query: {
    getAllMuscleGroups: tryCatch(async () => {
      const data = await getAllMuscleGroupsService();
      return successResponse("Muscle groups fetched successfully", data);
    }),

    getMuscleGroupById: tryCatch(async (_, { id }) => {
      const data = await getMuscleGroupByIdService(id);
      if (!data) throw new Error("Muscle group not found.");
      return successResponse("Muscle group fetched successfully", data);
    }),
  },

  Mutation: {
    createMuscleGroup: tryCatch(async (_, { input }, context) => {
      const data = await createMuscleGroupService(input, context.req);
      return successResponse("Muscle group created successfully", data);
    }),

    updateMuscleGroup: tryCatch(async (_, { id, input }, context) => {
      const data = await updateMuscleGroupService(id, input, context.req);
      return successResponse("Muscle group updated successfully", data);
    }),

    deleteMuscleGroup: tryCatch(async (_, { id }) => {
      const data = await deleteMuscleGroupService(id);
      return successResponse("Muscle group deleted successfully", data);
    }),
  },
};

export default muscleGroupResolvers;
