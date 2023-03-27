import { useEffect, useState } from "react";
import Employee from "../pages/Employee/Employee";
import { useDispatch } from "react-redux";
import { getEmployees } from "../features/employeeSlice";
import { useGetEmployeesQuery } from "../api/ApiSlice";
import AssetListContainer from "./AssetsListContainer";
import { useNavigate, NavLink } from "react-router-dom";
import { VStack, HStack, Button, Center } from "@chakra-ui/react";

const EmployeesListContainer = () => {
  // hooks
  const navigate = useNavigate()
  // hook dispatch, para cargar data en estado redux
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ firstName: '', lastName: '', cuit: '' });

  //hook para servicio get, que recibe parametros de filtrado
  const { data, isError, isLoading, isSuccess, error } = useGetEmployeesQuery(filter);

  //useEffect escucha a data y si el resultado es succes, realiza dispatch de lista de empleados.
  useEffect(() => {
    if (isSuccess) {
      // dispatch de toda la lista de empleados que llegan del servidor
      dispatch(getEmployees(data));
    }
  }, [data]);

  //manejo de estados del GetEmployees
  if (isLoading) {
    return (
      <Center>
        <h1>Loading...</h1>
      </Center>
    );
  } else if (isError) {
    return (
      <Center>
        <h1>Error {error.message}</h1>
      </Center>
    );
  }
  // funcion que genera boton de agregar empleado
  const AddEmployeeButton = () => (
    <NavLink to={"/create-employee"}>
      <Button border="solid 3px black" borderRadius={10} bg="blueviolet" w={100} p="20" m="20">
        Add Employee
      </Button>
    </NavLink>
  );


    //handle de formulario de filtro
    const handleChange = (e) => {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };

  //funcion formulario de filtrado
    const FormFilter =()=>( 
    <div className="table">
    <Center>
    <h2>TABLA DE EMPLEADOS</h2>
    </Center> 
    <HStack>
    <form onSubmit={handleSubmit}>
    <input type="text" name="firstName"  value={filter.firstName} placeholder="firstName" onChange={handleChange} />
    <input type="text" name="lastName" value={filter.lastName} placeholder="Apellido" onChange={handleChange} />
    <input type="text" name="cuit" value={filter.cuit} placeholder="Cuit" onChange={handleChange} />
    <button type="submit">Apply Filter</button>
   </form>
    </HStack>
  </div>)

  //montado de formulario
  return (
    <>
      <VStack mt={10}>
        <AddEmployeeButton />
      </VStack>
      {data.length === 0 ? (
        <Center>
          <h2>No Hay RRHH Disponibles</h2>
        </Center>
      ) : (
        <>
          <FormFilter />
          <Employee empl={data.data} totalPages={data.totalPages} />
          <AssetListContainer />
        </>
      )}
    </>
  );
};
export default EmployeesListContainer;
