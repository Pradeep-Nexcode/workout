const userTypeDefs = `#graphql
  type User {
    _id: ID!
    googleId: String!
    email: String!
    name: String!
    profileImage: String
    level: String
    goal: String
    totalWorkouts: Int
    completedWorkouts: Int
    lastActive: String
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  type UserResponse {
    success: Boolean
    message: String
    data: User
  }

  type Query {
    me: UserResponse
  }

  type Mutation {
    upsertGoogleUser(googleId: String!, email: String!, name: String!, profileImage: String): UserResponse
    updateUserProfile(level: String, goal: String): UserResponse
  }
`;

export default userTypeDefs;
