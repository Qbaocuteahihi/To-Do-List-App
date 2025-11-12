// store.js
import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});
