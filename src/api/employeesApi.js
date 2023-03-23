//import de fetchBaseQuery, para hacer peticiones no manuales
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//aca se definen las funciones de peticiones http
export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => `/api/v1/employees?page=${1}&limit=${20}`,
      providesTags: ["GetEmployees"],
    //  transformResponse: response => response.sort((a, b)=> b.data.data.employee_id - a.data.data.employee_id),
    }),
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: '/api/v1/employees/create',
        method: 'POST',
        body: employee,
        invalidatesTags:["GetEmployees"], // funcion q llama a la peticion getEmployees y actualiza
      }),
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/api/v1/employees/update/${employee.employee_id}`,
        method: 'PUT',
        body: employee,
      }),
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/api/v1/employees/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:["GetEmployees"],
    }),
    // Servicios de Assets
    getAssets: builder.query({
      query: () => `/api/v1/assets?page=${1}&limit=${20}`,
    }),
    createAsset: builder.mutation({
      query: (asset) => ({
        url: '/api/v1/assets/create',
        method: 'POST',
        body: asset,
      }),
    }),
    updateAsset: builder.mutation({
      query: (asset) => ({
        url: `/api/v1/assets/update/${asset.id}`,
        method: 'PUT',
        body: asset,
      }),
    }),
    deleteAsset: builder.mutation({
      query: (id) => ({
        url: `/api/v1/assets/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});


// Hook para poder solicitar datos
export const { 
  useGetEmployeesQuery, 
  useCreateEmployeeMutation, 
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation, 

  useGetAssetsQuery,
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useUpdateAssetMutation } = employeesApi;
