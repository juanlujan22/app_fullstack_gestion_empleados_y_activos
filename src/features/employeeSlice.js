import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
  }
];

export const employesSlice = createSlice({
  name: "EMPLOYEES",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      return [...state, action.payload];
    },
    deleteEmployee: (state, action) => {
      const findEmpl = state.find(
        (elem) => elem.employee_id === action.payload
      );
      if (findEmpl) {
        state.splice(state.indexOf(findEmpl), 1);
      }
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
  },
});

export const { addEmployee, deleteEmployee, editEmploye } =
  employesSlice.actions;

export default employesSlice.reducer;
