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
  // hook para traer el estado Redux assets, que contiene a todos los assets.
  const assetsList = useSelector((store) => store.assets);
  // busqueda de asset en el estado, segun id que quiero ver en detalle
  const findAsset = assetsList.find((asset) => asset.asset_id == id);
  const {
    asset_id,
    name,
    type,
    code,
    marca,
    description,
    purchase_date,
    employee_id,
  } = findAsset;

  // handles de botones para editar o cancelar
  const handleEdit = () => {
    navigate(`/edit-asset/${asset_id}`);
  };

  const handleCancel = () => {
    navigate("/");
  };
  //montado de tarjeta de vista de detalle
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
            <Heading size="md">Name:{name}</Heading>
          </CardHeader>
          <CardBody>
            <Text> Asset Id: {asset_id} </Text>
            <Text> Type: {type} </Text>
            <Text> Code: {code} </Text>
            <Text> Marca: {marca} </Text>
            <Text> Description: {description}</Text>
            <Text> Purchase Date:{purchase_date} </Text>
            <Text> Employee Id: {employee_id} </Text>
          </CardBody>
          <CardFooter justifyContent="center">
            <Button
              disabled="true"
              bg="blueviolet"
              borderRadius={15}
              w={100}
              p="20"
              m="20"
              onClick={handleEdit}
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
