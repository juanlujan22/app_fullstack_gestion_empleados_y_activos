import { configureStore } from '@reduxjs/toolkit';
import { employeesApi } from '../api/employeesApi';
import employeesReducer from '../features/employeeSlice';
import assetsReducer from '../features/assetSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    assets: assetsReducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => //middleware de employeesApi que administra la state con solicitudes a la api
    getDefaultMiddleware().concat(employeesApi.middleware), 
});

