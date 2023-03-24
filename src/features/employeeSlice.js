import { createSlice } from "@reduxjs/toolkit";

const initialState = [ ];

export const employeesSlice = createSlice({
  name: "EMPLOYEES",
  initialState,
  reducers: {
     getEmployees: (state, action) => {
      // filtro para empleados repetidos
      const newEmployees = action.payload.data.filter(employee => !state.
        some(existingEmployee => existingEmployee.employee_id === employee.employee_id));
      state.push(...newEmployees);
    },
    editEmploye: (state, action) => {
      const {
        first_name,
        last_name,
        phone_number,
        email,
        hire_date,
        salary,
        commission_pct,
        employee_id,
      } = action.payload;
      console.log(employee_id);
      const findEmpl = state.find((empl) => empl.employee_id === employee_id);
      if (findEmpl) {
        findEmpl.first_name = first_name;
        findEmpl.last_name = last_name;
        findEmpl.phone_number = phone_number;
        findEmpl.email = email;
        findEmpl.hire_date = hire_date;
        findEmpl.salary = salary;
        findEmpl.commission_pct = commission_pct;
      }
    },
}})

export const { getEmployees, editEmploye } =
  employeesSlice.actions;

export default employeesSlice.reducer;
