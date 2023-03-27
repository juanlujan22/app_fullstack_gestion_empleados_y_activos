import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetEmployeeByIdQuery,
} from "../../api/ApiSlice";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Center,
} from "@chakra-ui/react";

const EmployeeForm = () => {
  // hooks
  const navigate = useNavigate();
  const params = useParams();
  // hooks creados en apiSlice,  para Creacion, Edicion y Traer data de un empleado segun id 
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const { data, isSuccess } = useGetEmployeeByIdQuery(parseInt(params.id));
  // hook de estado react
  const [employee, setEmployee] = useState({
    employee_id: "",
    first_name: "",
    last_name: "",
    cuit: "",
    team_id: "",
    join_date: "",
    rol: "",
  });
  // hook que carga datos de empleado, si detecta params en modo edicion
  useEffect(() => {
    if (params.id && isSuccess && data.data && data.data.join_date) {
      setEmployee({
        ...employee,
        employee_id: data.data.employee_id,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        cuit: data.data.cuit,
        team_id: data.data.team_id,
        join_date: new Date(data.data.join_date).toISOString().slice(0, 10),
        rol: data.data.rol,
      });
    }
  }, [data]);

  //handles de formulario
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !employee.first_name ||
      !employee.last_name ||
      !employee.cuit ||
      !employee.team_id ||
      !employee.join_date ||
      !employee.rol
    ) {
      alert("fields cannot be empty");
      return;
    }
    if (params.id) {
      updateEmployee(employee);
      alert("Employee edited successfully!!");
    } else {
      createEmployee(employee);
      alert("Employee added successfully!!");
    }
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };

  //montado de formulario
  return (
    <>
      <Center> <h1> Employee Form </h1> </Center>
      <VStack p={7} justifyContent="center">
        <FormControl
          borderRadius={10}
          bgColor="lavender"
          border="solid blueviolet"
          p={40}
        >
          <form onSubmit={handleSubmit}>
            {params.id ? (
              <>
                <FormLabel mt={10}>Employee Id</FormLabel>
                <Input
                  placeholder="Employee Id"
                  onChange={handleChange}
                  type="number"
                  value={employee.employee_id}
                  name="employee_id"
                  disabled
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="Employee Id"
                  onChange={handleChange}
                  type="hidden"
                  value={employee.employee_id}
                  name="employee_id"
                />
              </>
            )}
            <FormLabel mt={10}>First Name</FormLabel>
            <Input
              placeholder="First Name"
              isRequired
              onChange={handleChange}
              type="text"
              value={employee.first_name}
              name="first_name"
            />
            <FormLabel mt={10}>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              isRequired
              onChange={handleChange}
              type="text"
              value={employee.last_name}
              name="last_name"
            />
            <FormLabel mt={10}>Cuit</FormLabel>
            <Input
              placeholder="Cuit"
              isRequired
              onChange={handleChange}
              type="number"
              value={employee.cuit}
              name="cuit"
            />
            <FormLabel mt={10}>Team Id</FormLabel>
            <Input
              placeholder="Team Id"
              isRequired
              onChange={handleChange}
              type="number"
              value={employee.team_id}
              name="team_id"
            />
            <FormLabel mt={10}>Join Date</FormLabel>
            <Input
              placeholder="Join date"
              isRequired
              onChange={handleChange}
              type="date"
              value={employee.join_date}
              name="join_date"
            />
            <FormLabel mt={10}>Rol</FormLabel>
            <Input
              placeholder="Rol"
              isRequired
              onChange={handleChange}
              type="text"
              value={employee.rol}
              name="rol"
            />
            <HStack mt={20}>
              <Button
                borderRadius={15}
                w={100}
                bg="blueviolet"
                type="submit"
              >
                {params.id ? <p>Edit</p> : <p>Create</p>}
              </Button>
              <Button
                borderRadius={15}
                w={90}
                bg="orange"
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
export default EmployeeForm;
