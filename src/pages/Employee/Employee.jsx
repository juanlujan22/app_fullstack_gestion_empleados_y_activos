import { useNavigate } from "react-router-dom";
import { useDeleteEmployeeMutation } from "../../api/ApiSlice";
import {
  HStack,
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

const Employee = ({ empl, totalPages }) => {
  //hooks
  const navigate = useNavigate();
  // hook de apiSlice, del que extraigo y nombro una funcion, para eliminar
  const [deleteEmployee] = useDeleteEmployeeMutation();
  //handles de botones para Eliminar, Ver o Editar
  const handleDelete = (id) => {
    if (confirm(`are you sure you want to delete the id ${id}`)) {
      deleteEmployee(id);
      alert(`the employee was removed!!`);
    }
  };

  const handleView = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // montado de tabla de empleados
  return (
    <div className="table">
      <HStack className="table">
        <p>Total Pages: {totalPages}</p>
      </HStack>
      <TableContainer border="solid 1px gray" justifyContent="center">
        <Table>
          <Thead>
            <Tr bg="lavender">
              <Th>Employee Id</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th isNumeric>Cuit</Th>
              <Th isNumeric>Team Id</Th>
              <Th>Join Date</Th>
              <Th>Rol</Th>
              <Th>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody border="solid 1px gray">
            {empl.map((employee) => (
              <Tr key={employee.employee_id}>
                <Td border="solid 1px gray">{employee.employee_id}</Td>
                <Td border="solid 1px gray">{employee.first_name}</Td>
                <Td border="solid 1px gray">{employee.last_name}</Td>
                <Td border="solid 1px gray">{employee.cuit}</Td>
                <Td border="solid 1px gray">{employee.team_id}</Td>
                <Td border="solid 1px gray">{employee.join_date}</Td>
                <Td border="solid 1px gray">{employee.rol}</Td>
                <Td border="solid 1px gray">
                  <IconButton
                    onClick={() => {
                      handleDelete(employee.employee_id);
                    }}
                    aria-label="Delete Employee"
                    colorScheme="red"
                    size="md"
                    icon={<DeleteIcon />}
                  />
                  ,
                  <IconButton
                    onClick={() => {
                      handleEdit(employee.employee_id);
                    }}
                    aria-label="Edit Icon"
                    size="lg"
                    icon={<EditIcon />}
                  />
                  ,
                  <IconButton
                    onClick={() => {
                      handleView(employee.employee_id);
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
    </div>
  );
};
export default Employee;
