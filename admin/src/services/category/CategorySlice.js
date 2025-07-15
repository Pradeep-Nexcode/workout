// src/services/category/categorySlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
} from "./CategoryAction";

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
      })

      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.isAdded = false;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.isAdded = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
        state.isAdded = false;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.isUpdated = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update category";
        state.isUpdated = false;
      })

      // Delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.isDeleted = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
        state.isDeleted = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete category";
        state.isDeleted = false;
      });
  },
});

export const { clearCategoryError, setIsAdded, setIsUpdated } = categorySlice.actions;
export default categorySlice.reducer;
