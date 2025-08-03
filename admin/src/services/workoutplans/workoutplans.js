import { gql } from "@apollo/client";

export const workoutPlanQueries = {
  // 🔍 Fetch all workout plans
  GET_ALL_WORKOUT_PLANS: gql`
    query GetAllWorkoutPlans {
      getAllWorkoutPlans {
        success
        message
        data {
          _id
          name
          slug
          goal
          level
          description
          daysPerWeek
          isFeatured
          isActive
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
          name
          slug
          goal
          level
          description
          daysPerWeek
          isFeatured
          isActive
          workoutDays {
            day
            focus
            exercises {
              exerciseId
              sets
              reps
              rest
            }
          }
          image {
            url
            altText
            file
          }
          createdAt
          updatedAt
        }
      }
    }
  `,

  // ➕ Create a workout plan
  CREATE_WORKOUT_PLAN: gql`
    mutation CreateWorkoutPlan($input: CreateWorkoutPlanInput!) {
      createWorkoutPlan(input: $input) {
        success
        message
        data {
          _id
          name
        }
      }
    }
  `,

  // ✏️ Update a workout plan
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
  `
};
