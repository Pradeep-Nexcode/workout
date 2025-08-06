const workoutPlanTypeDefs = `#graphql
  scalar Upload

  type WorkoutExercise {
    exerciseId: ID
    sets: Int
    reps: String
    rest: String
    completed: Boolean
    _id: ID
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
  
  input UpdateWorkoutPlanInput {
    targetMuscles: [String]
    exercises: [WorkoutExerciseInput]
  }


  type WorkoutPlanResponse {
    success: Boolean
    message: String
    data: UserWorkoutPlan
  }

  type WorkoutPlansResponse {
    success: Boolean
    message: String
    data: [UserWorkoutPlan]
  }

  type Query {
    getMyWorkoutPlan(date: String!): UserWorkoutPlan
    getMyWorkoutHistory: [UserWorkoutPlan!]!
    getTodayWorkoutPlan: WorkoutPlansResponse
    getWorkoutPlanById(id: ID!): WorkoutPlanResponse
  }

  type Mutation {
    createWorkoutPlan(input: CreateUserWorkoutPlanInput): WorkoutPlanResponse
    completeWorkoutPlan(id: ID!): WorkoutPlanResponse
    updateWorkoutPlan(id: ID, exerciseId: ID): WorkoutPlanResponse
  }

`;

export default workoutPlanTypeDefs;
