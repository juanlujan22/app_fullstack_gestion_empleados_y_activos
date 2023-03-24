// imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import EmployeesListContainer from "./components/EmployeesListContainer";
import EmployeeDetail from "./pages/Employee/EmployeeDetail";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<EmployeesListContainer />} />
          <Route path="/detail/:id" element={<EmployeeDetail />} />
          <Route path="/create-employee" element={<EmployeeForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
