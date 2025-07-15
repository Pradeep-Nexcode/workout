const workoutPlanTypeDefs = `#graphql
  scalar Upload

  type WorkoutExercise {
    exerciseId: ID!
    sets: Int
    reps: String
    rest: String
  }

  type WorkoutDay {
    day: String!
    focus: String!
    exercises: [WorkoutExercise!]!
  }

  type WorkoutImage {
    url: String
    file: String
    altText: String
  }

  type WorkoutPlan {
    _id: ID!
    name: String!
    slug: String!
    goal: String
    level: String!
    description: String!
    daysPerWeek: Int
    workoutDays: [WorkoutDay!]!
    image: WorkoutImage
    isFeatured: Boolean
    isActive: Boolean
    createdBy: ID
    createdAt: String
    updatedAt: String
  }

  input WorkoutExerciseInput {
    exerciseId: ID!
    sets: Int
    reps: String
    rest: String
  }

  input WorkoutDayInput {
    day: String!
    focus: String!
    exercises: [WorkoutExerciseInput!]!
  }

  input WorkoutImageInput {
    url: String
    file: Upload
    altText: String
  }

  input CreateWorkoutPlanInput {
    name: String!
    slug: String
    goal: String
    level: String!
    description: String!
    daysPerWeek: Int
    workoutDays: [WorkoutDayInput!]!
    image: WorkoutImageInput
    isFeatured: Boolean
    isActive: Boolean
  }

  input UpdateWorkoutPlanInput {
    name: String
    slug: String
    goal: String
    level: String
    description: String
    daysPerWeek: Int
    workoutDays: [WorkoutDayInput!]
    image: WorkoutImageInput
    isFeatured: Boolean
    isActive: Boolean
  }

  type WorkoutPlanResponse {
    success: Boolean!
    message: String!
    data: WorkoutPlan
  }

  type WorkoutPlansResponse {
    success: Boolean!
    message: String!
    data: [WorkoutPlan!]!
  }

  type Query {
    getAllWorkoutPlans: WorkoutPlansResponse!
    getWorkoutPlanById(id: ID!): WorkoutPlanResponse!
  }

  type Mutation {
    createWorkoutPlan(input: CreateWorkoutPlanInput!): WorkoutPlanResponse!
    updateWorkoutPlan(id: ID!, input: UpdateWorkoutPlanInput!): WorkoutPlanResponse!
    deleteWorkoutPlan(id: ID!): WorkoutPlanResponse!
  }
`;

export default workoutPlanTypeDefs;
