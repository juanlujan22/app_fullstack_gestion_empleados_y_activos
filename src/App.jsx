// imports
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./common/Navbar";
import EmployeesListContainer from "./components/EmployeesListContainer";
import EmployeeDetail from "./pages/Employee/EmployeeDetail";
import EmployeeForm from "./pages/Employee/EmployeeForm";
import AssetForm from "./pages/Asset/AssetForm";
import AssetDetail from "./pages/Asset/AssetDetail";
import "./App.css";
import { Center } from "@chakra-ui/react";
//funcion de render de error, en url que no existan
const ErrorNotFound = () => (
  <Center>
    <h1>Page Not Found, 404!!</h1>
  </Center>
);
// montado de app, con routes a los distintos componentes crud
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
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
