import { upsertGoogleUserService, getUserProfileService, updateUserProfileService } from "../services/user.service.js";

const userResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const profile = await getUserProfileService(user._id);
      return { success: true, message: "User profile fetched", data: profile };
    },
  },
  Mutation: {
    upsertGoogleUser: async (_, { googleId, email, name, profileImage }) => {
      const user = await upsertGoogleUserService(googleId, email, name, profileImage);
      return { success: true, message: "User upserted successfully", data: user };
    },
    updateUserProfile: async (_, args, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const updated = await updateUserProfileService(user._id, args);
      return { success: true, message: "Profile updated", data: updated };
    },
  },
};

export default userResolvers;
