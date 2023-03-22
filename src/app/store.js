import { configureStore } from "@reduxjs/toolkit";
import employesReducer from "../features/employeeSlice";
import { apiSlice } from "../api/apiSlice";
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    employes: employesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

