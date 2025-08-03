// src/services/category/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchCategoryById } from "./CategoryAction";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
    isFetched: false,
  },
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    setIsAdded: (state, action) => {
      state.isAdded = action.payload;
    },
    setIsUpdated: (state, action) => {
      state.isUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.isFetched = true;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
        state.isFetched = false;
      })

      // Fetch One
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.isFetched = true;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch category";
        state.isFetched = false;
      });
  },
});

export const { clearCategoryError, setIsAdded, setIsUpdated } =
  categorySlice.actions;
export default categorySlice.reducer;
