import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addEmployee, editEmploye } from "../../features/employeeSlice";
import { useNavigate } from "react-router-dom";
import {useCreateEmployeeMutation} from '../../api/employeesApi'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    cuit: "",
    team_id: "",
    join_date: "",
    rol: "",
  });
  /*employee_id
  first_name
  last_name
  cuit
  team_id
  join_date
  rol */

  const navigate = useNavigate();
  const params = useParams();

  const [createEmployee, objCreate] = useCreateEmployeeMutation()
  
  const dispatch = useDispatch();
  const emplList = useSelector((state) => state.employes);
  console.log("Error:"+ objCreate.isError)

  useEffect(() => {
    if (params.id) {
      setEmployee(emplList.find((empl) => empl.employee_id == params.id));
    }
  }, []);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee)
    // if (params.id) {
    //   dispatch(editEmploye(employee));
    //   alert("Employee edited successfully!!");
    // } else {
      createEmployee(
        employee
      )
      alert("Employee added successfully!!")
    //   dispatch(addEmployee(employee));
    //   alert("Employee added successfully!!");
    // }
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };

//   const emailRegExp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

//   function handleBlur() {
//     const hasError = !emailRegExp.test(employee.email);
//     setEmployee((prevState) => ({ ...prevState, hasError: true }));
//   }
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
            {/* <FormLabel mt={5}>Employee id</FormLabel>
            <Input
              placeholder="Employee id, No modificable"
              onChange={handleChange}
              type="number"
              value={employee.employee_id}
              disabled="true"
              name="employee_id"
            /> */}
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
                Agregar
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
