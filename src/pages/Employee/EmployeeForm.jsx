import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useCreateEmployeeMutation, useUpdateEmployeeMutation, useGetEmployeeByIdQuery} from '../../api/employeesApi'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
const EmployeeForm = () => {
  
  const navigate = useNavigate();
  const params = useParams();
  
  const [createEmployee] = useCreateEmployeeMutation()
  const [updateEmployee] = useUpdateEmployeeMutation();

  const {data, isSuccess}= useGetEmployeeByIdQuery(parseInt(params.id))
  // const selectedEmployee =  params.id && useSelector(state => state.employees.find(empl => empl.employee_id === params.id))
  //selectedEmployee || 
//   useEffect(() => {
//    if (params.id && isSuccess) {
//      setEmployee(data.data);
//    }
//  }, [data]);
 
  const [employee, setEmployee] = useState( {
    employee_id: "",
    first_name: "",
    last_name: "",
    cuit: "",
    team_id: "",
    join_date: "",
    rol: "",
  });

  useEffect(() => {
    if (params.id && isSuccess && data && data.data && data.data.join_date) {
      setEmployee({
        ...employee,
        employee_id: data.data.employee_id,
        first_name: data.data.first_name,
        last_name: data.data.last_name,
        cuit: data.data.cuit,
        team_id: data.data.team_id,
        join_date: new Date(data.data.join_date).toISOString().slice(0, 10),
        rol:data.data.rol
      });
    }
  }, [data]);
 
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.first_name || !employee.last_name || !employee.cuit || !employee.team_id || !employee.join_date || !employee.rol) {
      alert("fields cannot be empty");
      return;
    }
    if (params.id) {
      updateEmployee(employee)
      alert("Employee edited successfully!!");
    } else {
      createEmployee(employee)      
      alert("Employee added successfully!!");
    }
    navigate("/");
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
          {params.id ? (<> 
          <FormLabel mt={10}>Employee Id</FormLabel>
            <Input
              placeholder="Employee Id"
              onChange={handleChange}
              type="number"
              value={employee.employee_id}
              name="employee_id"
              disabled
            /></>) : (<> 
            <Input
              placeholder="Employee Id"
              onChange={handleChange}
              type="hidden"
              value={employee.employee_id}
              name="employee_id"
            /></>)
             }
            <FormLabel mt={10}>First Name</FormLabel>
            <Input
              placeholder="First Name"
              onChange={handleChange}
              type="text"
              value={employee.first_name}
              name="first_name"
            />
            <FormLabel mt={10}>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              onChange={handleChange}
              type="text"
              value={employee.last_name}
              name="last_name"
            />
            <FormLabel mt={10}>Cuit</FormLabel>
            <Input
              placeholder="Cuit"
              onChange={handleChange}
              type="number"
              value={employee.cuit}
              name="cuit"
            />
            <FormLabel mt={10}>Team Id</FormLabel>
            <Input
              placeholder="Team Id"
              onChange={handleChange}
              type="number"
              value={employee.team_id}
              name="team_id"
            />
            <FormLabel mt={10}>Join Date</FormLabel>
            <Input
              placeholder="Join date"
              onChange={handleChange}
              type="date"
              value={employee.join_date}
              name="join_date"
            />
            <FormLabel mt={10}>Rol</FormLabel>
            <Input
              placeholder="Rol"
              onChange={handleChange}
              type="text"
              value={employee.rol}
              name="rol"
            />
            <HStack mt={20}>
              <Button
                borderRadius={15}
                h={40}
                w={70}
                bg="blueviolet"
                type="submit"
              >
                {params.id? <p>Edit</p> : <p>Create</p> }
              </Button>
              <Button
                borderRadius={15}
                h={40}
                w={70}
                bg="yellow"
                onClick={handleCancel}
              >
                {" "}
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
export default EmployeeForm;
