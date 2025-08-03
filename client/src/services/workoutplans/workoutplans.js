import { gql } from "@apollo/client";

export const workoutPlanQueries = {
  // 🔍 Fetch all workout plans (admin templates)
  GET_ALL_WORKOUT_PLANS: gql`
    query getTodayWorkoutPlan {
      getTodayWorkoutPlan {
        success
        message
        data {
          _id
          targetMuscles
          exercises {
            exerciseId
            sets
            reps
            rest
          }
          createdAt
          updatedAt
        }
      }
    }
  `,

  // 🔍 Fetch single workout plan by ID
  GET_WORKOUT_PLAN_BY_ID: gql`
    query GetWorkoutPlanById($id: ID!) {
      getWorkoutPlanById(id: $id) {
        success
        message
        data {
          _id
          targetMuscles
          exercises {
            exerciseId
            sets
            reps
            rest
          }
          createdAt
          updatedAt
        }
      }
    }
  `,

  // ➕ Create a workout plan (template)
  CREATE_WORKOUT_PLAN: gql`
    mutation CreateWorkoutPlan($input: CreateUserWorkoutPlanInput) {
      createWorkoutPlan(input: $input) {
        success
        message
      }
    }
  `,

  // ✏️ Update a workout plan (template)
  UPDATE_WORKOUT_PLAN: gql`
    mutation UpdateWorkoutPlan($id: ID!, $input: UpdateWorkoutPlanInput!) {
      updateWorkoutPlan(id: $id, input: $input) {
        success
        message
        data {
          _id
          name
        }
      }
    }
  `,

  // ❌ Delete a workout plan
  DELETE_WORKOUT_PLAN: gql`
    mutation DeleteWorkoutPlan($id: ID!) {
      deleteWorkoutPlan(id: $id) {
        success
        message
      }
    }
  `,

  // ===============================
  // 👤 USER WORKOUT PLAN QUERIES
  // ===============================

  // 🔍 Get today's workout plan for logged-in user
  GET_MY_WORKOUT_PLAN: gql`
    query GetMyWorkoutPlan($date: String!) {
      getMyWorkoutPlan(date: $date) {
        _id
        date
        targetMuscles
        status
        completedAt
        exercises {
          exerciseId
          sets
          reps
          rest
          completed
        }
        createdAt
        updatedAt
      }
    }
  `,

  // 📜 Get workout history for logged-in user
  GET_MY_WORKOUT_HISTORY: gql`
    query GetMyWorkoutHistory {
      getMyWorkoutHistory {
        _id
        date
        targetMuscles
        status
        completedAt
      }
    }
  `,

  // ===============================
  // 👤 USER WORKOUT PLAN MUTATIONS
  // ===============================

  // ➕ Create daily workout plan for user
  CREATE_USER_WORKOUT_PLAN: gql`
    mutation CreateUserWorkoutPlan($input: CreateUserWorkoutPlanInput!) {
      createUserWorkoutPlan(input: $input) {
        _id
        date
        targetMuscles
        exercises {
          exerciseId
          sets
          reps
          rest
          completed
        }
        status
      }
    }
  `,

  // ✅ Mark workout as completed
  COMPLETE_WORKOUT_PLAN: gql`
    mutation CompleteWorkoutPlan($id: ID!) {
      completeWorkoutPlan(id: $id) {
        _id
        status
        completedAt
      }
    }
  `,

  // 🔄 Toggle progress of a single exercise
  UPDATE_WORKOUT_PROGRESS: gql`
    mutation UpdateWorkoutProgress($id: ID!, $exerciseId: ID!) {
      updateWorkoutProgress(id: $id, exerciseId: $exerciseId) {
        _id
        exercises {
          exerciseId
          completed
        }
        status
      }
    }
  `,
};
