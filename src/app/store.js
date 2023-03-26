import { configureStore } from '@reduxjs/toolkit';
import { ApiSlice } from '../api/ApiSlice';
import employeesReducer from '../features/employeeSlice';
import assetsReducer from '../features/assetSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    assets: assetsReducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => //middleware de employeesApi que administra la state con solicitudes a la api
    getDefaultMiddleware().concat(ApiSlice.middleware), 
});

