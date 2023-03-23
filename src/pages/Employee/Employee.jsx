import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../features/employeeSlice";
import { useDeleteEmployeeMutation } from "../../api/employeesApi";

import {
  IconButton,
  Table,
  Thead,
  Tbody,
 HStack,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, Search2Icon } from "@chakra-ui/icons";
const Employee = ({ empl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteEmployee] = useDeleteEmployeeMutation() // extraigo una funcion, que la nombro como "deleteEmployee"
  
  const handleDelete = (id) => {
    
    if (confirm(`are you sure you want to delete the id ${id}`)) {
      deleteEmployee(id)
      // alert(`the employee was removed!!`)
    }
    
    // dispatch(deleteEmployee(id));
  };

  const handleView = () => {
    navigate(`/detail/${empl.employee_id}`);
  };

  return (
    <div className="table"> 
    <TableContainer  border="solid 1px gray" justifyContent="center">
            <Table >
            <Thead>
                <Tr bg="lavender">
                <Th>Employee Id</Th>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Cuit</Th>
                <Th isNumeric>Team Id</Th>
                <Th>Join Date</Th>
                <Th>Rol</Th>
                <Th>ACTIONS</Th>
                </Tr>
            </Thead>
            <Tbody border="solid 1px gray">
            {empl.map((employee) => 
                <Tr  key={employee.employee_id}>
                <Td border="solid 1px gray">{employee.employee_id}</Td>
                <Td border="solid 1px gray">{employee.first_name}</Td>
                <Td border="solid 1px gray">{employee.last_name}</Td>
                <Td border="solid 1px gray">{employee.cuit}</Td>
                <Td border="solid 1px gray">{employee.team_id}</Td>
                <Td border="solid 1px gray">{employee.join_date}</Td>
                <Td border="solid 1px gray">{employee.rol}</Td>
                <Td border="solid 1px gray">
                  <IconButton onClick={()=>{handleDelete(employee.employee_id)}} aria-label='Delete Employee' colorScheme='red' size='md' icon={<DeleteIcon />}/>, 
                  <IconButton aria-label='Edit Icon' size='lg' icon={<EditIcon />}/>, 
                  <IconButton aria-label='View Employee' size='lg' icon={<Search2Icon />}/>
                </Td>
                </Tr>)}
            </Tbody>
            </Table>
        </TableContainer>
    </div>
  );
};
export default Employee;

{
  /* <Box boxShadow="dark-lg" p="6" rounded="md">
<Card
  p={15}
  m={15}
  borderRadius={20}
  boxShadow="15px 16px lightgray"
  bgColor="white"
  alignItems="center"
  border="solid 3px blueviolet"
>
  <CardHeader>
    <Heading size="md">
      Name: {empl.first_name},
      <br />
      Last name: {empl.last_name}
    </Heading>
  </CardHeader>
  <CardBody>
    <Text>{empl.email} </Text>
    <Text>{empl.phone_number} </Text>
  </CardBody>
  <CardFooter justifyContent="center">
    <Button
      borderRadius={15}
      h={40}
      w={70}
      bg="blueviolet"
      onClick={() => handleView()}
    >
      View here
    </Button>
    <Button
      borderRadius={15}
      h={40}
      w={70}
      bg="yellow"
      onClick={() => handleDelete(empl.employee_id)}
    >
      Delete
    </Button>
  </CardFooter>
</Card>
</Box> */
}
