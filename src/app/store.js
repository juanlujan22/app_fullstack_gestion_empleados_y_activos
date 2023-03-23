// import { configureStore } from "@reduxjs/toolkit";
// //import employesReducer from "../features/employeeSlice";
// import employeesReducer from "../features/employeeSlice";
// import { apiSlice } from "../api/employeesApi";
// import { setupListeners } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeesApi } from '../api/employeesApi';
import { assetsApi } from '../api/assetsApi';
import employeesReducer from '../features/employeeSlice';
import assetsReducer from '../features/assetSlice';

export const store = configureStore({
    /*
    {
    employees: employesReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer  
    }
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
    */
// assets: assetsReducer,
//[employeesApi.reducerPath]:employeesApi.reducer
  reducer: {
    employees: employeesReducer,
    assets: assetsReducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeesApi.middleware, assetsApi.middleware),
});

