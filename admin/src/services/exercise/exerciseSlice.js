import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllExercises,
  fetchExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
} from "./exerciseAction";


const initialState = {
  exercises: [],
  exercise: null,
  loading: false,
  error: null,
};

const exerciseSlice = createSlice({
  name: "exercise",
  initialState,
  reducers: {
    clearExerciseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(fetchAllExercises.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchAllExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(fetchExerciseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExerciseById.fulfilled, (state, action) => {
        state.loading = false;
        state.exercise = action.payload;
      })
      .addCase(fetchExerciseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createExercise.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExercise.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateExercise.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExercise.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteExercise.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExercise.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExerciseError } = exerciseSlice.actions;
export default exerciseSlice.reducer;
