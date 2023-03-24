import { VStack, Button, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import Employee from "../pages/Employee/Employee";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {getEmployees}from "../features/employeeSlice"
//import del hook de apiSlice
import { useGetEmployeesQuery } from "../api/employeesApi";
import AssetListContainer from "./Asset/AssetsListContainer"

const EmployeesListContainer = () => {

   const dispatch = useDispatch()

   const {data, isError, isLoading, isSuccess, error}= useGetEmployeesQuery() 

   const AddEmployeeButton = () => (
    <NavLink to={"/create-employee"}>
      <Button borderRadius={10} bg="blueviolet" w={100} p="20" m="20">
        Add Employee
      </Button>
    </NavLink>
  );
  
  useEffect(() => { 
    if (isSuccess) {
      dispatch(getEmployees(data))
    }
  }, [data]);


  if (isLoading) {
    return (
      <Center>
        <h1>Loading...</h1>
      </Center>
    );
  } else if (isError) {
    return (
      <Center>
        <div>Error {error.message}</div>
      </Center>
    );
  }

  return (
    <>
      <VStack mt={10}>
       <AddEmployeeButton/>
      </VStack>
      {data.length === 0 ? (
        <Center>
          <h2>No Hay RRHH Disponibles</h2>
        </Center>
      ) : (
        <>
        <Employee empl={data.data} />
        <AssetListContainer />
        </>
      )}
    </>
  );
};
export default EmployeesListContainer;