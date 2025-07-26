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

  GET_EXERCISE_BY_CATEGORY: gql`
    query getExercisesByCategory($categoryId: ID!) {
      getExercisesByCategory(categoryId: $categoryId) {
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
        }
      }
    }
  `,
};
