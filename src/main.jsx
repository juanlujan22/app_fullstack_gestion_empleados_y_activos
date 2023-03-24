//imports
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// import de redux
import { store } from "./app/store";
import { Provider } from "react-redux";
//import de RTK Query
import {employeesApi} from "./api/employeesApi"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store} api={employeesApi}>
        <App />
      </Provider>
  </React.StrictMode>
);
