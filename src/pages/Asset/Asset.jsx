import { useNavigate } from "react-router-dom";
import {
  Center,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useDeleteAssetMutation } from "../../api/ApiSlice";
import { DeleteIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";

const Asset = ({ asset }) => {
  //hooks
  const navigate = useNavigate();
  // hook de apiSlice del que extraigo y nombro una funcion, para eliminar
  const [deleteAsset] = useDeleteAssetMutation();

  //handle de botones, para redireccionar a edicion, detalle o realizar eliminación.
  const handleEdit = (id) => {
    navigate(`/edit-asset/${id}`);
  };

  const handleView = (id) => {
    navigate(`/detail-asset/${id}`);
  };

  const handleDelete = (id) => {
    if (confirm(`are you sure you want to delete the id ${id}`)) {
      deleteAsset(id);
      alert(`the Asset was removed!!`);
    }
  };
  // montado de tabla de assets
  return (
    <div>
      <Center>
      <TableContainer border="solid 1px gray" justifyContent="center">
        <Table>
          <Thead>
            <Tr bg="lavender">
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Code</Th>
              <Th>Marca</Th>
              <Th>Description</Th>
              <Th>Purchase Date</Th>
              <Th>Employee id</Th>
              <Th>Asset id</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody border="solid 1px gray">
            {asset.map((asset) => (
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
                  <IconButton
                    onClick={() => {
                      handleDelete(asset.asset_id);
                    }}
                    aria-label="Delete Employee"
                    colorScheme="red"
                    size="md"
                    icon={<DeleteIcon />}
                  />
                  ,
                  <IconButton
                    onClick={() => {
                      handleEdit(asset.asset_id);
                    }}
                    aria-label="Edit Icon"
                    size="lg"
                    icon={<EditIcon />}
                  />
                  ,
                  <IconButton
                    onClick={() => {
                      handleView(asset.asset_id);
                    }}
                    aria-label="View Employee"
                    size="lg"
                    icon={<Search2Icon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Center>
    </div>
  );
};

export default Asset;
