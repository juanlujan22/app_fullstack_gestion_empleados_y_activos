import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useCreateAssetMutation, useUpdateAssetMutation, useGetAssetByIdQuery} from '../../api/employeesApi'
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
  const [updateAsset, objUpdate] = useUpdateAssetMutation()
  const [createAsset] = useCreateAssetMutation()

  const { data, isSuccess } = useGetAssetByIdQuery(parseInt(params.id));
  console.log(objUpdate)
  console.log(objUpdate.isError)
  console.log(updateAsset)





  
  const [asset, setAsset] = useState( {
    asset_id: "",
    name: "",
    type: "",
    code: "",
    marca: "",
    description: "",
    purchase_date: "",
    employee_id:"",
  });
  console.log(asset)
  useEffect(() => {
    if (params.id && isSuccess && data && data.data && data.data.purchase_date) {
      setAsset({
        ...asset,
        asset_id:data.data.asset_id,
        name: data.data.name,
        type: data.data.type,
        code: data.data.code,
        marca: data.data.marca,
        description: data.data.description,
        purchase_date: new Date(data.data.purchase_date).toISOString().slice(0, 10),
        employee_id: data.data.employee_id,
      });
    }
  }, [data]);
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
      confirm("sure you want to edit?")&&
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
          {params.id ? (
              <>
                <FormLabel mt={10}>Asset Id</FormLabel>
                <Input
                  placeholder="Asset Id"
                  onChange={handleChange}
                  type="number"
                  value={asset.asset_id}
                  name="asset_id"
                  disabled
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="Asset Id"
                  onChange={handleChange}
                  type="hidden"
                  value={asset.asset_id}
                  name="asset_id"
                />
              </>
            )}
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
                {params.id ? <p>Edit</p> : <p>Create</p>}
              </Button>
              <Button
                borderRadius={15}
                h={40}
                w={70}
                bg="yellow"
                onClick={handleCancel}
              >
                Cancel
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
