import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";

import {
  VStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employeesList = useSelector((store) => store.employees);

  const findEmpl = employeesList.find((empl) => empl.employee_id == id);
 
  const {
    employee_id,
    first_name,
    last_name,
    cuit,
    team_id,
    join_date,
    rol
  } = findEmpl;

  const handlerEdit = () => {
    navigate(`/edit/${employee_id}`);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const EditEmployee = () => (
    <NavLink to={`/edit/${employee_id}`}>
      <Button borderRadius={10} bg="blueviolet" w={100} p="20" m="20">
        Edit Employee
      </Button>
    </NavLink>
  );
  
  return (
    <div>
      <VStack mt="20">
        <Card
          borderRadius={15}
          w="fit-content"
          p="25"
          boxShadow="xs"
          bgColor="lavender"
          alignItems="center"
          border="solid 3px blueviolet"
        >
          <CardHeader>
            <Heading size="md">
              Name: {first_name},
              <br />
              Last name: {last_name}
            </Heading>
          </CardHeader>    
          <CardBody>
            <Text> cuit: {cuit}</Text>
            <Text> team id: {team_id}</Text>
            <Text> join date:{join_date}</Text>
            <Text> rol: {rol} </Text>
            <Text> employee id: {employee_id} </Text>
          </CardBody>
          <CardFooter justifyContent="center">
          <EditEmployee />
            <Button
              disabled="true"
              bg="blueviolet"
              borderRadius={15}
              h={40}
              w={65}
              onClick={handlerEdit}
            >
              Edit
            </Button>
            <Button
              bg="yellow"
              borderRadius={15}
              h={40}
              w={65}
              onClick={handleCancel}
            >

              Cancel
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </div>
  );
};
export default EmployeeDetail;
