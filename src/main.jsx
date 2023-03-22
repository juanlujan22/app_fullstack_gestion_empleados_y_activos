import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

//import de apiSlice de RTK Query
import {apiSlice} from "./api/apiSlice"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store} api={apiSlice}>
        <App />
      </Provider>
  </React.StrictMode>
);
