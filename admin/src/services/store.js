import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/CategorySlice'
export const store = configureStore({
  reducer: {
    category: categoryReducer
  },

});