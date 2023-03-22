import { useSelector } from "react-redux";
import Employee from "../pages/Employee/Employee";
import { SimpleGrid, VStack, Button, Box, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
//import del hook de apiSlice
import { useGetEmployeesQuery } from "../api/apiSlice";

const EmployeesListContainer = () => {
  const employees = useSelector((state) => state.employes);
  //hook de apiSlice que le extraigo los estados que obtenemos al momento de solicitar datos, en la propiedad "data", respuesta de error o propiedad"isError" boolean, propiedad "isLoading" boolean para saber si esta cargando la consulta, propierar "error" que devuelve el error
  const {data, isError, isLoading, error}= useGetEmployeesQuery()
    console.log(data)
  if(isLoading) return <div> <h1>Loading...</h1>  </div>;
  else if(isError) return <div> Error {error.message} </div>; 
  return (
    <>
      <VStack mt={10}>
        <NavLink to={"/create-employee"}>
          <Button borderRadius={10} bg="blueviolet" w={100} p="20" m="20">
            Add Employee
          </Button>
        </NavLink>
      </VStack>
      {data.length === 0 ? (
        <Box display="flex" justifyContent="center">
          <h2> No Hay RRHH Disponibles </h2>
        </Box>
      ) : (
        <SimpleGrid
          columns={3}
          spacingX="40px"
          spacingY="20px"
          textAlign="center"
        >
          {data.data.map((empl) => {
            return <Employee key={empl.employee_id} empl={empl} />;
          })}
        </SimpleGrid> 
      )}
    </>
  );
};
export default EmployeesListContainer;