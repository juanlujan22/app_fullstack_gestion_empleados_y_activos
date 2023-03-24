import { useGetAssetsQuery, useDeleteAssetMutation } from "../../api/employeesApi";
import {
  IconButton,
  Table,
  Thead,
  Tbody,
  Center,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
const AssetListContainer = () => {
  //hook de apiSlice que le extraigo los estados que obtenemos al momento de solicitar datos, en la propiedad "data", respuesta de error o propiedad"isError" boolean, propiedad "isLoading" boolean para saber si esta cargando la consulta, propierar "error" que devuelve el error
  const { data, isError, isLoading, error } = useGetAssetsQuery();
  const [deleteAsset] = useDeleteAssetMutation()
  if (isLoading)
    return (
      <div>
        {" "}
        <h1>Loading...</h1>{" "}
      </div>
    );
  else if (isError) return <div> Error {error.message} </div>;

  const handleDelete = (id) => {
    if (confirm(`are you sure you want to delete the id ${id}`)) {
      deleteAsset(id)
      alert(`the Asset was removed!!`)
    }
  };

const handleView = ()=>{}

  return (
    <>
      <Center> <h3> Asset List </h3> </Center>
      {data.data.length === 0 
      ? (<Box display="flex" justifyContent="center">
          <h2> No Hay Assets Disponibles </h2>
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
                  <Td border="solid 1px gray">
                    <IconButton onClick={()=>{handleDelete(asset.asset_id)}} aria-label='Delete Employee' colorScheme='red' size='md' icon={<DeleteIcon />}/>, 
                    <IconButton aria-label='Edit Icon' size='lg' icon={<EditIcon />}/>, 
                    <IconButton onClick={()=>{handleView(employee.employee_id)}} aria-label='View Employee' size='lg' icon={<Search2Icon />}/>
                  </Td>
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
