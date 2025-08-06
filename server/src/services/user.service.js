import User from "../models/user.js";
export const upsertGoogleUserService = async (
  googleId,
  email,
  name,
  profileImage
) => {
  let user = await User.findOne({ googleId });

  if (!user) {
    user = new User({
      googleId,
      email,
      name,
      profileImage,
      lastActive: new Date(),
    });
  } else {
    user.lastActive = new Date();
    user.name = name;
    user.profileImage = profileImage || user.profileImage;
  }

  await user.save();
  return user;
};

export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUserProfileService = async (userId, updates) => {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};
