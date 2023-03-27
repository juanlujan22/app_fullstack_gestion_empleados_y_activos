import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const assetSlice = createSlice({
  name: "ASSETS",
  initialState,
  reducers: {
    //reducer para obtener lista de assets, de la respuesta que llega del servicio get
    getAssets: (state, action) => {
      // filtro para assets repetidos
      const newAssets = action.payload.data.filter(asset => !state.some(existingAsset => existingAsset.asset_id === asset.asset_id));
      state.push(...newAssets);
    },
    editEmploye: (state, action) => {
      const {
        employee_id,
        name,
        type,
        code,
        marca,
        description,
        purchase_date,
      } = action.payload;
      const findEmpl = state.find((empl) => empl.employee_id === employee_id);
      if (findEmpl) {
        findEmpl. employee_id =  employee_id;
        findEmpl.name = name;
        findEmpl.type = type;
        findEmpl.code = code;
        findEmpl.marca = marca;
        findEmpl.description = description;
        findEmpl.purchase_date = purchase_date;
      }
    },
  },
});

export const { getAssets, addAssets, editEmploye } =
assetSlice.actions;

export default assetSlice.reducer;