import { gql } from "@apollo/client";

export const categoryQueries = {
  GET_ALL_CATEGORIES: gql`
    query {
      getAllCategories {
        success
        message
        data {
          _id
          name
          slug
        }
      }
    }
  `,

  GET_CATEGORY_BY_ID: gql`
    query GetCategoryById($id: ID!) {
      getCategoryById(id: $id) {
        success
        message
        data {
          _id
          name
          slug
          description
          isActive
          images {
            url
            file
            altText
            type
          }
          createdAt
          updatedAt
        }
      }
    }
  `,

  
};
