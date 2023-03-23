import { useSelector } from "react-redux";
import Employee from "../pages/Employee/Employee";
import { SimpleGrid, VStack, Button, Box, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
//import del hook de apiSlice
import { useGetEmployeesQuery } from "../api/employeesApi";

const EmployeesListContainer = () => {
    // const employees = useSelector((state) => state.employees);
  //hook de apiSlice que le extraigo los estados que obtenemos al momento de solicitar datos, en la propiedad "data", respuesta de error o propiedad"isError" boolean, propiedad "isLoading" boolean para saber si esta cargando la consulta, propierar "error" que devuelve el error
  const {data, isError, isLoading, error}= useGetEmployeesQuery() 
//   const params = useParams();

//   useEffect(() => {
// si hay id en la url, las recibo y las hago llegar a  employeesApi, 
//     if (params.id) {
//       setEmployee(emplList.find((empl) => empl.employee_id == params.id));
//     }
//   }, []);

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
      {data.data.length === 0 ? 
      (<Box display="flex" justifyContent="center">
          <h2> No Hay RRHH Disponibles </h2>
        </Box>
        ) : 
      (< Employee empl={data.data} />)}
    </>
  );
};
export default EmployeesListContainer;