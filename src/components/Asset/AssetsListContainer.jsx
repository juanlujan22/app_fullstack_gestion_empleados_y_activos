import { useSelector } from "react-redux";
import Employee from "../pages/Employee/Employee";
import { SimpleGrid, VStack, Button, Box, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
//import del hook de apiSlice
import { useGetAssetsQuery } from "../../api/assetsApi";

const EmployeesListContainer = () => {
  // const employees = useSelector((state) => state.employes);
  //hook de apiSlice que le extraigo los estados que obtenemos al momento de solicitar datos, en la propiedad "data", respuesta de error o propiedad"isError" boolean, propiedad "isLoading" boolean para saber si esta cargando la consulta, propierar "error" que devuelve el error
  const { data, isError, isLoading, error } = useGetAssetsQuery();
  //   const params = useParams();

  //   useEffect(() => {
  // si hay id en la url, las recibo y las hago llegar a  employeesApi,
  //     if (params.id) {
  //       setEmployee(emplList.find((empl) => empl.employee_id == params.id));
  //     }
  //   }, []);
  if (isLoading)
    return (
      <div>
        {" "}
        <h1>Loading...</h1>{" "}
      </div>
    );
  else if (isError) return <div> Error {error.message} </div>;


  return (
    <>
      {data.data.length === 0 
      ? (<Box display="flex" justifyContent="center">
          <h2> No Hay RRHH Disponibles </h2>
        </Box>) 
      : (<div className="table">
        <TableContainer border="solid 1px gray" justifyContent="center">
          <Table>
            <Thead>
              <Tr bg="lavender">
                <Th>Employee Id</Th>
                <Th>Asset Id</Th>
                <Th>name</Th>
                <Th>type</Th>
                <Th>marca</Th>
                <Th isNumeric>code</Th>
                <Th>purchase_date</Th>
                <Th>description</Th>
                <Th>ACTIONS</Th>
                name
                type
                code
                marca
                description
                purchase_date
                employee_id
              </Tr>
            </Thead>
            <Tbody border="solid 1px gray">
              {data.data.map((asset) => (
                <Tr key={asset.asset_id}>
                  <Td border="solid 1px gray">{asset.name}</Td>
                  <Td border="solid 1px gray">{asset.type}</Td>
                  <Td border="solid 1px gray">{asset.code}</Td>
                  <Td border="solid 1px gray">{asset.marca}</Td>
                  <Td border="solid 1px gray">{asset.description}</Td>
                  <Td border="solid 1px gray">{asset.purchase_date}</Td>
                  <Td border="solid 1px gray">{asset.employee_id}</Td>
                  <Td border="solid 1px gray">{asset.asset_id}</Td>
                  <Td border="solid 1px gray">View, Edit, Delete</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>)}
    </>
  );
};
export default AssetListContainer;
