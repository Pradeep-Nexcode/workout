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

  CREATE_CATEGORY: gql`
    mutation CreateCategory($input: CreateCategoryInput) {
      createCategory(input: $input) {
        success
        message
        data {
          _id
          name
          slug
          description
          images {
            url
            altText
          }
          isActive
          createdAt
          updatedAt
        }
      }
    }
  `,

  UPDATE_CATEGORY: gql`
    mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
      updateCategory(id: $id, input: $input) {
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

  DELETE_CATEGORY: gql`
    mutation DeleteCategory($id: ID!) {
      deleteCategory(id: $id) {
        success
        message
        data {
          _id
        }
      }
    }
  `,
};
