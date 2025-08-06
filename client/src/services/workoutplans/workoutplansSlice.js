import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllWorkoutPlans,
  fetchWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  completeWorkoutPlan,
} from "./workoutplansAction";

const initialState = {
  workoutPlans: [],
  workoutPlan: null,
  loading: false,
  error: null,
};

const workoutPlanSlice = createSlice({
  name: "workoutPlan",
  initialState,
  reducers: {
    clearWorkoutPlanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All 
      .addCase(fetchAllWorkoutPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllWorkoutPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutPlans = action.payload;
      })
      .addCase(fetchAllWorkoutPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(fetchWorkoutPlanById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkoutPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutPlan = action.payload;
      })
      .addCase(fetchWorkoutPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createWorkoutPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkoutPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateWorkoutPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkoutPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //complete
      .addCase(completeWorkoutPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(completeWorkoutPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(completeWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteWorkoutPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWorkoutPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWorkoutPlanError } = workoutPlanSlice.actions;
export default workoutPlanSlice.reducer;
