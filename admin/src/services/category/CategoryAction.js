import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryQueries } from "./category";
import apolloClient from "../apolloClient";

// Fetch All
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: categoryQueries.GET_ALL_CATEGORIES,
        fetchPolicy: "no-cache", // optional, but ensures fresh data
      });

      return data.getAllCategories.data;
    } catch (err) {
      return rejectWithValue(err.message || "Fetch error");
    }
  }
);

// Fetch One
export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query({
        query: categoryQueries.GET_CATEGORY_BY_ID,
        variables: { id },
      });

      return data.getCategoryById.data;
    } catch (err) {
      return rejectWithValue(err.message || "Fetch error");
    }
  }
);
 
 export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: categoryQueries.CREATE_CATEGORY,
        variables: { input },
        context: {
          hasUpload: true,
          useMultipartFormData: true,
        },
      });

      return data.createCategory;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create category");
    }
  }
);


// Update
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log("Updating category with:", id, updatedData);
      const { data } = await apolloClient.mutate({
        mutation: categoryQueries.UPDATE_CATEGORY,
        variables: { id, input: updatedData },
      });

      return data.updateCategory;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update error");
    }
  }
);

// Delete
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: categoryQueries.DELETE_CATEGORY,
        variables: { id },
      });

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Delete error");
    }
  }
);
