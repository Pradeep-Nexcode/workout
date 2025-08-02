import { createAsyncThunk } from "@reduxjs/toolkit";
import { workoutPlanQueries } from "./workoutplans";
import apolloClient from "../apolloClient";

// Fetch All
export const fetchAllWorkoutPlans = createAsyncThunk(
  "workoutPlan/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apolloClient.query({
        query: workoutPlanQueries.GET_ALL_WORKOUT_PLANS,
        fetchPolicy: "no-cache",
      });
      return response.data.getTodayWorkoutPlan.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch workout plans");
    }
  }
);

// Fetch by ID
export const fetchWorkoutPlanById = createAsyncThunk(
  "workoutPlan/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apolloClient.query({
        query: workoutPlanQueries.GET_WORKOUT_PLAN_BY_ID,
        variables: { id },
        fetchPolicy: "no-cache",
      });
      return response.data.getWorkoutPlanById.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch workout plan");
    }
  }
);

// Create
export const createWorkoutPlan = createAsyncThunk(
  "workoutPlan/create",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: workoutPlanQueries.CREATE_WORKOUT_PLAN,
        variables: { input },
      });
      return data.createWorkoutPlan.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create workout plan");
    }
  }
);

// Update
export const updateWorkoutPlan = createAsyncThunk(
  "workoutPlan/update",
  async ({ id, input }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: workoutPlanQueries.UPDATE_WORKOUT_PLAN,
        variables: { id, input },
      });
      return data.updateWorkoutPlan.data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update workout plan");
    }
  }
);

// Delete
export const deleteWorkoutPlan = createAsyncThunk(
  "workoutPlan/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate({
        mutation: workoutPlanQueries.DELETE_WORKOUT_PLAN,
        variables: { id },
      });
      return data.deleteWorkoutPlan;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete workout plan");
    }
  }
);
