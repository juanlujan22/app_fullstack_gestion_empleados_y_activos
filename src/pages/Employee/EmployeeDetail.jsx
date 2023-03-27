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
  //hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // hook para traer el estado Redux employees, que contiene a todos los empleados.
  const employeesList = useSelector((store) => store.employees);

  // busqueda de empleado en el estado, segun id
  const findEmpl = employeesList.find((empl) => empl.employee_id == id);

  // destructuring de empleado encontrado
  const { employee_id, first_name, last_name, cuit, team_id, join_date, rol } =
    findEmpl;

  // handles de botones Edit y Cancel, del formulario.
  const handlerEdit = () => {
    navigate(`/edit/${employee_id}`);
  };

  const handleCancel = () => {
    navigate("/");
  };

  // montado de la card de vista de detalle
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
            <Button
              disabled="true"
              bg="blueviolet"
              borderRadius={15}
              w={100}
              p="20"
              m="20"
              onClick={handlerEdit}
            >
              Edit
            </Button>
            <Button
              bg="yellow"
              borderRadius={15}
              w={100}
              p="20"
              m="20"
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
