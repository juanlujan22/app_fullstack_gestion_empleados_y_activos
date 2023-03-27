import { createSlice } from "@reduxjs/toolkit";

const initialState = [ ];

export const employeesSlice = createSlice({
  name: "EMPLOYEES",
  initialState,
  reducers: {
      //reducer para obtener lista de empleados del server
     getEmployees: (state, action) => {
      // se realiza filtro para id de empleados, para no subir empleados repetidos al store
      const newEmployees = action.payload.data.filter(employee => !state.
        some(existingEmployee => existingEmployee.employee_id === employee.employee_id));
      state.push(...newEmployees);
    },
    // reducer de edicion, el cual no implemente, pero quedo planteado hasta evacuar duda.
    editEmploye: (state, action) => {
      const {
        employee_id,
        first_name,
        last_name,
        cuit,
        team_id,
        join_date,
        rol,
      } = action.payload;
      const findEmpl = state.employees.find((empl) => empl.employee_id === employee_id);
      if (findEmpl) {
        findEmpl.employee_id = employee_id;
        findEmpl.first_name = first_name;
        findEmpl.last_name = last_name;
        findEmpl.cuit = cuit;
        findEmpl.team_id = team_id;
        findEmpl.join_date = join_date;
        findEmpl.rol = rol;
      }
    },
}})

export const { getEmployees, editEmploye } =
  employeesSlice.actions;

export default employeesSlice.reducer;
