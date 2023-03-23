/*
cod Antes de bardear--------------------------
//import de fetchBaseQuery, para hacer peticiones no manuales
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//aca se definen las funciones de peticiones http
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/api/v1/employees", //?page=1&limit=20
    }),
  }),
}); *se cambio apiSlice 
// Hook para poder solicitar datos
export const { useGetEmployeesQuery } = apiSlice;
---------------------------------------------
*/

//import de fetchBaseQuery, para hacer peticiones no manuales
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//aca se definen las funciones de peticiones http

export const assetsApi = createApi({
  reducerPath: 'assetsApi', //NOMBRE DEL ESTADO REDUX
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
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
export const { useGetAssetsQuery, useCreateAssetQuery, useUpdateAssetQuery, useDeleteAssetQuery } = assetsApi;
