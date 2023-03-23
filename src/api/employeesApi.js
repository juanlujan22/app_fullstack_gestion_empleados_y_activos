
// cod Antes de bardear--------------------------
// import de fetchBaseQuery, para hacer peticiones no manuales
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//aca se definen las funciones de peticiones http
// export const apiSlice = createApi({
  //   reducerPath: "api",
  //   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
//   endpoints: (builder) => ({
//     getEmployees: builder.query({
//       query: () => "/api/v1/employees", //?page=1&limit=20
//     }),
//   }),
// });

// // Hook para poder solicitar datos
// export const { useGetEmployeesQuery } = apiSlice;

//import de fetchBaseQuery, para hacer peticiones no manuales
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//aca se definen las funciones de peticiones http
export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => `/api/v1/employees?page=${1}&limit=${20}`,
    }),
    createEmployee: builder.mutation({
      query: (employee) => ({
        url: '/api/v1/employees/create',
        method: 'POST',
        body: employee,
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
    }),
  }),
});

// Hook para poder solicitar datos
export const { useGetEmployeesQuery, useCreateEmployeeQuery, useUpdateEmployeeQuery, useDeleteEmployeeQuery } = employeesApi;
