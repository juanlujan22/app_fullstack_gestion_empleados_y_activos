import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  const employe = useSelector((store) => store.employes);

  const findEmpl = employe.find((empl) => empl.employee_id == id);
  const {
    first_name,
    last_name,
    phone_number,
    email,
    hire_date,
    salary,
    commission_pct,
    employee_id,
  } = findEmpl;

  const handlerEdit = () => {
    navigate(`/edit-employee/${employee_id}`);
  };

  const handleCancel = () => {
    navigate("/");
  };

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
            <Text> salary: {salary}</Text>
            <Text> commission: {commission_pct}</Text>
            <Text> hire date:{hire_date}</Text>
            <Text> phone: {phone_number} </Text>
            <Text> email: {email} </Text>
          </CardBody>
          <CardFooter justifyContent="center">
            <Button
              bg="blueviolet"
              borderRadius={15}
              h={40}
              w={65}
              onClick={handlerEdit}
            >
              {" "}
              Edit
            </Button>
            <Button
              bg="yellow"
              borderRadius={15}
              h={40}
              w={65}
              onClick={handleCancel}
            >
              {" "}
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </div>
  );
};
export default EmployeeDetail;
