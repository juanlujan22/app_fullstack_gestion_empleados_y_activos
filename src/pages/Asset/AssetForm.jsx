import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useGetAssetByIdQuery,
} from "../../api/ApiSlice";
import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";

const AssetForm = () => {
  //hooks
  const navigate = useNavigate();
  const params = useParams();
  // hooks creados en apiSlice, de servicios crud Edicion, Creación o Traer data de un Asset segun id
  const [updateAsset] = useUpdateAssetMutation();
  const [createAsset] = useCreateAssetMutation();
  const { data, isSuccess } = useGetAssetByIdQuery(parseInt(params.id));
  // hook de estado React
  const [asset, setAsset] = useState({
    asset_id: "",
    name: "",
    type: "",
    code: "",
    marca: "",
    description: "",
    purchase_date: "",
    employee_id: "",
  });
  // hook Effect para carga datos de empleado en estado React, si detecta params p/ realizar edicion
  useEffect(() => {
    if (
      params.id &&
      isSuccess &&
      data &&
      data.data &&
      data.data.purchase_date
    ) {
      setAsset({
        ...asset,
        asset_id: data.data.asset_id,
        name: data.data.name,
        type: data.data.type,
        code: data.data.code,
        marca: data.data.marca,
        description: data.data.description,
        purchase_date: new Date(data.data.purchase_date)
          .toISOString()
          .slice(0, 10),
        employee_id: data.data.employee_id,
      });
    }
  }, [data]);

  // handles para manejo de inputs y estado react
  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !asset.name ||
      !asset.type ||
      !asset.code ||
      !asset.marca ||
      !asset.description ||
      !asset.purchase_date
    ) {
      alert("all fields must be completed");
      return;
    }

    if (params.id) {
      confirm("sure you want to edit?") && updateAsset(asset);
      isSuccess && alert("Asset edited successfully!!");
      navigate("/");
    } else {
      createAsset(asset);
      alert("Asset added successfully!!");
      navigate("/");
    }
  };
  const handleCancel = () => {
    navigate("/");
  };

  // montado del formulario
  return (
    <>
      <Center> <h1> Asset Form </h1> </Center>
      <VStack m="10" p="10" justifyContent="center">
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
                bg="blueviolet"
                type="submit"
              >
                {params.id ? <p>Edit</p> : <p>Create</p>}
              </Button>
              <Button
                borderRadius={15}
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
