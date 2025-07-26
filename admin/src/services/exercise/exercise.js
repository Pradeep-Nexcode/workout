import { gql } from "@apollo/client";

export const exerciseQueries = {
  GET_ALL_EXERCISES: gql`
    query GetAllExercises {
      getAllExercises {
        success
        message
        data {
          _id
          name
          slug
          category {
            _id
            name
          }
          type
          primaryMuscles
          equipment
          instructions
          difficulty
          
          videoUrl
          isFeatured
          isActive
          createdAt
          updatedAt
        }
      }
    }
  `,

  GET_EXERCISE_BY_ID: gql`
    query GetExerciseById($id: ID!) {
      getExerciseById(id: $id) {
        success
        message
        data {
          _id
          name
          slug
          category {
            _id
            name
          }
          type
          primaryMuscles
          equipment
          instructions
          difficulty
          image {
            url
            altText
          }
          images {
            url
            altText
          }

          videoUrl
          isFeatured
          isActive
        }
      }
    }
  `,
  CREATE_EXERCISE: gql`
    mutation CreateExercise($input: CreateExerciseInput) {
      createExercise(input: $input) {
        success
        message
        data {
          name
          slug
          type
          primaryMuscles
          equipment
          instructions
          difficulty

          videoUrl
          isFeatured
          isActive
        }
      }
    }
  `,

  UPDATE_EXERCISE: gql`
    mutation UpdateExercise($id: ID!, $input: UpdateExerciseInput) {
      updateExercise(id: $id, input: $input) {
        success
        message
        data {
          name
          slug
          type
          primaryMuscles
          equipment
          instructions
          difficulty
          image {
            url
            altText
            file
          }
          videoUrl
          isFeatured
          isActive
        }
      }
    }
  `,
};
