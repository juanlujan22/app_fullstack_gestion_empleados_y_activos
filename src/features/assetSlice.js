import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const assetSlice = createSlice({
  name: "ASSETS",
  initialState,
  reducers: {
    addAssets: (state, action) => {
      return [...state, action.payload];
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

export const { addAssets, editEmploye } =
assetSlice.actions;

export default assetSlice.reducer;