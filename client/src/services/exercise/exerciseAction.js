import { createAsyncThunk } from "@reduxjs/toolkit";
import { exerciseQueries } from "./exercise";
import apolloClient from "../apolloClient";

export const fetchAllExercises = createAsyncThunk(
  "exercise/fetchAll",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    console.log("🚀 fetchAllExercises triggered", page, limit); // ✅ See if this logs
    try {
      const response = await apolloClient.query({
        query: exerciseQueries.GET_ALL_EXERCISES,
        variables: { page, limit },
        fetchPolicy: "no-cache",
      });

      console.log("✅ GraphQL Response", response);
      return response.data.getAllExercises.data;
    } catch (err) {
      console.error("❌ GraphQL Error", err);
      return rejectWithValue(err.message || "Failed to fetch exercises");
    }
  }
);

export const fetchExerciseById = createAsyncThunk(
  "exercise/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apolloClient.query({
        query: exerciseQueries.GET_EXERCISE_BY_ID,
        variables: { id },
      });

      return response.data.getExerciseById.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch exercise by ID");
    }
  }
);

export const fetchExercisesByCategory = createAsyncThunk(
  "exercise/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await apolloClient.query({
        query: exerciseQueries.GET_EXERCISE_BY_CATEGORY,
        variables: { categoryId },
      });

      return response.data.getExercisesByCategory.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch exercises by category");
    }
  }
);
 