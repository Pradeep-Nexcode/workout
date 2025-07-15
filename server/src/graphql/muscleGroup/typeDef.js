const muscleGroupTypeDefs = `#graphql
  scalar Upload

  type MuscleGroupImage {
    url: String
    file: String
    altText: String
  }

  type MuscleGroup {
    _id: ID!
    name: String!
    region: String!
    description: String
    image: MuscleGroupImage
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  input MuscleGroupImageInput {
    url: String
    file: Upload
    altText: String
  }

  input CreateMuscleGroupInput {
    name: String!
    region: String!
    description: String
    image: MuscleGroupImageInput
    isActive: Boolean
  }

  input UpdateMuscleGroupInput {
    name: String
    region: String
    description: String
    image: MuscleGroupImageInput
    isActive: Boolean
  }

  type MuscleGroupResponse {
    success: Boolean!
    message: String!
    data: MuscleGroup
  }

  type MuscleGroupsResponse {
    success: Boolean!
    message: String!
    data: [MuscleGroup!]!
  }

  type Query {
    getAllMuscleGroups: MuscleGroupsResponse!
    getMuscleGroupById(id: ID!): MuscleGroupResponse!
  }

  type Mutation {
    createMuscleGroup(input: CreateMuscleGroupInput!): MuscleGroupResponse!
    updateMuscleGroup(id: ID!, input: UpdateMuscleGroupInput!): MuscleGroupResponse!
    deleteMuscleGroup(id: ID!): MuscleGroupResponse!
  }
`;

export default muscleGroupTypeDefs;
