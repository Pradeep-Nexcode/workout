import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './category/CategorySlice';
import exerciseReducer from './exercise/exerciseSlice';
// import workoutPlanReducer from './workoutplans/workoutplansSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    exercise: exerciseReducer,
    // workoutplan: workoutPlanReducer,
  },

});