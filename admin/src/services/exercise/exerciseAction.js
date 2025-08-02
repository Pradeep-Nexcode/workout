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

// Mutation placeholders — assuming you use GraphQL mutation handlers
export const createExercise = createAsyncThunk(
  "exercise/create",
  async (input, { rejectWithValue }) => {
    try {
      // TODO: implement actual mutation
      console.log("Creating exercise with:", input);

      const { data } = await apolloClient.mutate({
        mutation: exerciseQueries.CREATE_EXERCISE,
        variables: { input },
        context: {
          hasUpload: true,
          useMultipartFormData: true,
        },
      });

      return data.createExercise;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create exercise");
    }
  }
);

export const updateExercise = createAsyncThunk(
  "exercise/update",
  async ({ id, input }, { rejectWithValue }) => {
    try {
      // TODO: implement actual mutation
      console.log("Updating exercise with:", id, input);

      const { data } = await apolloClient.mutate({
        mutation: exerciseQueries.UPDATE_EXERCISE,
        variables: { id, input },
      });

      return data.updateExercise;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update exercise");
    }
  }
);

export const deleteExercise = createAsyncThunk(
  "exercise/delete",
  async (id, { rejectWithValue }) => {
    try {
      // TODO: implement actual mutation
      console.log("Deleting exercise with id:", id);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete exercise");
    }
  }
);
