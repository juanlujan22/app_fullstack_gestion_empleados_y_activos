import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../features/employeeSlice";
import {
  Box,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
const Employee = ({ empl }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };
  const handleView = () => {
    navigate(`/detail/${empl.employee_id}`);
  };

  return (
    <>
      <Box boxShadow="dark-lg" p="6" rounded="md">
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
      </Box>
    </>
  );
};
export default Employee;
