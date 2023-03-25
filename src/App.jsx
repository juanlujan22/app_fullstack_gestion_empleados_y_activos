// imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import EmployeesListContainer from "./components/EmployeesListContainer";
import EmployeeDetail from "./pages/Employee/EmployeeDetail";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import AssetForm from "./pages/Asset/AssetForm";
import AssetDetail from "./pages/Asset/AssetDetail"
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<EmployeesListContainer />} />
          <Route path="/detail/:id" element={<EmployeeDetail />} />
          <Route path="/detail-asset/:id" element={<AssetDetail />} />
          <Route path="/create-employee" element={<EmployeeForm />} />
          <Route path="/create-asset" element={<AssetForm />} />
          <Route path="/edit/:id" element={<EmployeeForm />} />
          <Route path="/edit-asset/:id" element={<AssetForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
