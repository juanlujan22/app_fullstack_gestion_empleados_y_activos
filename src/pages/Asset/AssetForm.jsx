import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useCreateAssetMutation, useUpdateAssetMutation} from '../../api/employeesApi'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
const AssetForm = () => {
  
  const navigate = useNavigate();
  const params = useParams();
  const [updateAsset] = useUpdateAssetMutation()
  const [createAsset] = useCreateAssetMutation()

  const assetList = useSelector((state) => state.assets);
  
  const [asset, setAsset] = useState( {
    name: "",
    type: "",
    code: "",
    marca: "",
    description: "",
    purchase_date: "",
    employee_id:"",
  });

  useEffect(() => {
    if (params.id) {
      setAsset(assetList.find((asset) => asset.asset_id === params.id));
    }
  }, []);


  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!asset.name || !asset.type || !asset.code || !asset.marca || !asset.description || !asset.purchase_date) {
        alert("Los campos requeridos deben ser completados");
        return;
      }
      
    if (params.id) {
        updateAsset(asset);
        alert("Asset edited successfully!!");
        navigate("/");
    } else {
        createAsset(asset)      
        alert("Asset added successfully!!");
        navigate("/");
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <VStack p={7} justifyContent="center">
        <FormControl
          borderRadius={10}
          isRequired
          bgColor="lavender"
          border="solid blueviolet"
          p={40}
        >
          <form onSubmit={handleSubmit}>
            <FormLabel mt={10}>Name</FormLabel>
            <Input
              placeholder="Name"
              onChange={handleChange}
              type="text"
              value={asset.name}
              name="name"
            />
            <FormLabel mt={10}>Type</FormLabel>
            <Input
              placeholder="Type"
              onChange={handleChange}
              type="text"
              value={asset.type}
              name="type"
            />
            <FormLabel mt={10}>Code</FormLabel>
            <Input
              placeholder="Code"
              onChange={handleChange}
              type="number"
              value={asset.code}
              name="code"
            />
            <FormLabel mt={10}>Marca</FormLabel>
            <Input
              placeholder="Marca"
              onChange={handleChange}
              type="text"
              value={asset.marca}
              name="marca"
            />
            <FormLabel mt={10}>Description</FormLabel>
            <Input
              placeholder="Description"
              onChange={handleChange}
              type="text"
              value={asset.description}
              name="description"
            />
            <FormLabel mt={10}>Purchase Date</FormLabel>
            <Input
              placeholder="Purchase Date"
              onChange={handleChange}
              type="date"
              value={asset.purchase_date}
              name="purchase_date"
            />
            <FormLabel mt={10}>Employee Id</FormLabel>
            <Input
              placeholder="Employee id"
              onChange={handleChange}
              type="number"
              value={asset.employee_id}
              name="employee_id"
            />
            <HStack mt={20}>
              <Button
                borderRadius={15}
                h={40}
                w={70}
                bg="blueviolet"
                type="submit"
              >
                Agregar
              </Button>
              <Button
                borderRadius={15}
                h={40}
                w={70}
                bg="yellow"
                onClick={handleCancel}
              >
                Salir
              </Button>
            </HStack>
            <HStack mt={20}></HStack>
          </form>
        </FormControl>
      </VStack>
    </>
  );
};
export default AssetForm;
