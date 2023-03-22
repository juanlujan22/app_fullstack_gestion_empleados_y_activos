import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addEmployee, editEmploye } from "../../features/employeeSlice";
import { useNavigate } from "react-router-dom";
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
    employee_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    hire_date: "",
    salary: "",
    commission_pct: "",
    hasError: false,
  });

  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useDispatch();
  const emplList = useSelector((state) => state.employes);

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
    if (params.id) {
      dispatch(editEmploye(employee));
      alert("Employee edited successfully!!");
    } else {
      dispatch(addEmployee(employee));
      alert("Employee added successfully!!");
    }
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };

  const emailRegExp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

  function handleBlur() {
    const hasError = !emailRegExp.test(employee.email);
    setEmployee((prevState) => ({ ...prevState, hasError: true }));
  }
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
            <FormLabel mt={5}>Employee id</FormLabel>
            <Input
              placeholder="Employee id"
              onChange={handleChange}
              type="number"
              value={employee.employee_id}
              name="employee_id"
            />
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
            <FormLabel mt={10}>Email</FormLabel>
            <Input
              onBlur={handleBlur}
              placeholder="Email"
              onChange={handleChange}
              type="email"
              value={employee.email}
              name="email"
              aria-errormessage="emailErrorID"
              aria-invalid={employee.hasError}
            />
            <p
              id="msgID"
              aria-live="assertive"
              style={{ visibility: employee.hasError ? "visible" : "hidden" }}
            >
              This email is not valid
            </p>
            <FormLabel mt={10}>Phone Number</FormLabel>
            <Input
              placeholder="Phone Number"
              onChange={handleChange}
              type="number"
              value={employee.phone_number}
              name="phone_number"
            />
            <FormLabel mt={10}>Hire Date</FormLabel>
            <Input
              placeholder="Hire Data"
              onChange={handleChange}
              type="text"
              value={employee.hire_date}
              name="hire_date"
            />
            <FormLabel mt={10}>Salary</FormLabel>
            <Input
              placeholder="Salary"
              onChange={handleChange}
              type="number"
              value={employee.salary}
              name="salary"
            />
            <FormLabel mt={10}>Commission</FormLabel>
            <Input
              placeholder="Commission"
              onChange={handleChange}
              type="number"
              value={employee.commission_pct}
              name="commission_pct"
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
