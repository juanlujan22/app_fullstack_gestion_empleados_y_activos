//import de fetchBaseQuery, para hacer peticiones no manuales
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//definicion de las funciones de peticiones http
export const ApiSlice = createApi({
  reducerPath: 'ApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ page = 1, limit = 5, firstName = "", lastName = "", cuit = "" }) => {
        let queryString = `?page=${page}&limit=${limit}`;
        if (firstName) queryString += `&first_name=${firstName}`;
        if (lastName) queryString += `&last_name=${lastName}`;
        if (cuit) queryString += `&cuit=${cuit}`;
        return `/api/v1/employees${queryString}`;
      },
      providesTags: ["GetEmployees"],
    }),
    getEmployeeById: builder.query({
      query: (id) => `/api/v1/employees/${id}`,
    }),
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: '/api/v1/employees/create',
        method: 'POST',
        body: employee,
        invalidatesTags:["GetEmployees"], // funcion q llama a la peticion getEmployees y actualiza. reemplaza a useEffect
      }),
    }),
    updateEmployee: builder.mutation({
      query: (employee) => ({
        url: `/api/v1/employees/update/${employee.employee_id}`,
        method: 'PUT',
        body: employee,
      }),
      invalidatesTags:["GetEmployees"],
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
      providesTags: ["GetAssets"],
    }),
    getAssetById: builder.query({
      query: (asset_id) => `/api/v1/assets/${asset_id}`,
    }),
    createAsset: builder.mutation({
      query: (asset) => ({
        url: '/api/v1/assets/create',
        method: 'POST',
        body: asset,
      }),
      invalidatesTags:["GetAssets"],
    }),
    updateAsset: builder.mutation({
      query: (asset) => ({
        url: `/api/v1/assets/update/${asset.asset_id}`,
        method: 'PUT',
        body: asset,
      }),
      invalidatesTags:["GetAssets"],
    }),
    deleteAsset: builder.mutation({
      query: (id) => ({
        url: `/api/v1/assets/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:["GetAssets"],
    }),
  }),
});


// Hook para poder solicitar datos
export const { 
  useGetEmployeesQuery, 
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation, 
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation, 

  useGetAssetsQuery,
  useGetAssetByIdQuery,
  useCreateAssetMutation,
  useDeleteAssetMutation,
  useUpdateAssetMutation } = ApiSlice;