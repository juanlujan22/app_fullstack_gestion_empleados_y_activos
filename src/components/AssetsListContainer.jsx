import { useGetAssetsQuery } from "../api/ApiSlice";
import { getAssets } from "../features/assetSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Asset from "../pages/Asset/Asset";
import { Button, Center } from "@chakra-ui/react";

const AssetListContainer = () => {
  //hook de apiSlice para obtener todos los Assets
  const { data, isError, isLoading, error, isSuccess } = useGetAssetsQuery();
  // hook dispatch, para cargar data en estado redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getAssets(data));
    }
  }, [data]);

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  else if (isError) return <h1> Error: {error.message} </h1>;

  const AddAssetButton = () => (
    <NavLink to={"/create-asset"}>
      <Button borderRadius={10} bg="blueviolet" w={100} p="20" m="20">
        Add Asset
      </Button>
    </NavLink>
  );

  return (
    <>
      <Center>
        {" "}
        <h2> Asset List </h2>{" "}
      </Center>
      <Center>
        {" "}
        <AddAssetButton />{" "}
      </Center>
      {data.data.length === 0 ? (
        <Box display="flex" justifyContent="center">
          <h2> No Hay Assets Disponibles </h2>
        </Box>
      ) : (
        <Asset asset={data.data} />
      )}
    </>
  );
};
export default AssetListContainer;
