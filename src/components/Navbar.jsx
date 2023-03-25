import { Heading, HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <div>
        <HStack
          spacing="24px"
          p={26}
          borderWidth="1px"
          border="solid 2px blueviolet"
          bg="lavender"
          w="100vw"
          justifyContent="space-around"
        >
          <NavLink to="/" fontSize="5xl">
            <Heading as="h1" size="4xl" color="black">
              Vortex Employees List
            </Heading>
          </NavLink>
        </HStack>
      </div>
    </nav>
  );
};
export default NavBar;
