const workoutPlanTypeDefs = `#graphql
  scalar Upload

  type WorkoutExercise {
    exerciseId: ID
    sets: Int
    reps: String
    rest: String
    completed: Boolean
  }

  type UserWorkoutPlan {
    _id: ID
    user: ID
    date: String
    targetMuscles: [String]
    exercises: [WorkoutExercise]
    status: String
    completedAt: String
    createdAt: String
    updatedAt: String
  }

  input WorkoutExerciseInput {
    exerciseId: ID
    sets: Int
    reps: String
    rest: String
  }

  input CreateUserWorkoutPlanInput {
    targetMuscles: [String]
    exercises: [WorkoutExerciseInput]
  }

  type Query {
    getMyWorkoutPlan(date: String!): UserWorkoutPlan
    getMyWorkoutHistory: [UserWorkoutPlan!]!
  }

  type Mutation {
    createUserWorkoutPlan(input: CreateUserWorkoutPlanInput!): UserWorkoutPlan!
    completeWorkoutPlan(id: ID!): UserWorkoutPlan!
    updateWorkoutProgress(id: ID!, exerciseId: ID!): UserWorkoutPlan!
  }

`;

export default workoutPlanTypeDefs;
