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
