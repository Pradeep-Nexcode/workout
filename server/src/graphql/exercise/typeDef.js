const exerciseTypeDefs = `#graphql
  scalar Upload

  type ExerciseImage {
    url: String!
    altText: String
    file: String!
  }

  type Exercise {
    _id: ID!
    name: String!
    slug: String!
    categoryId: Category!
    type: String!
    primaryMuscles: [String!]!
    equipment: [String!]!
    instructions: [String!]!
    difficulty: String!
    image: ExerciseImage!
    videoUrl: String
    isFeatured: Boolean
    isActive: Boolean
    createdAt: String
    updatedAt: String
  }

  input ExerciseImageInput {
    url: String
    altText: String
    file: Upload
  }

  input CreateExerciseInput {
    name: String!
    slug: String!
    categoryId: ID!
    type: String!
    primaryMuscles: [String!]!
    equipment: [String!]!
    instructions: [String!]!
    difficulty: String
    image: ExerciseImageInput!
    videoUrl: String
    isFeatured: Boolean
    isActive: Boolean
  }

  input UpdateExerciseInput {
    name: String
    slug: String
    categoryId: ID
    type: String
    primaryMuscles: [String]
    equipment: [String]
    instructions: [String]
    difficulty: String
    image: ExerciseImageInput
    videoUrl: String
    isFeatured: Boolean
    isActive: Boolean
  }

  type ExerciseResponse {
    success: Boolean!
    message: String!
    data: Exercise
  }

  type ExercisesResponse {
    success: Boolean!
    message: String!
    data: [Exercise!]!
  }

  type Query {
    getAllExercises: ExercisesResponse!
    getExerciseById(id: ID!): ExerciseResponse!
  }

  type Mutation {
    createExercise(input: CreateExerciseInput!): ExerciseResponse!
    updateExercise(id: ID!, input: UpdateExerciseInput!): ExerciseResponse!
    deleteExercise(id: ID!): ExerciseResponse!
  }
`;

export default exerciseTypeDefs;
