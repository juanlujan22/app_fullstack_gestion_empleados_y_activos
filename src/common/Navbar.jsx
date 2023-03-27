import { Heading, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
// montado del navbar, cuyo heading es clickeable y lleva al home
const NavBar = () => {
  return (
    <nav className="navBar">
      <div>
        <HStack
          spacing="24px"
          p={26}
          borderWidth="1px"
          border="solid 2px blueviolet"
          w="100vw"
          justifyContent="space-around"
        >
          <NavLink to="/" fontSize="5xl">
            <Heading as="h1" size="4xl">
              Vortex Employees List
            </Heading>
          </NavLink>
        </HStack>
      </div>
    </nav>
  );
};
export default NavBar;
