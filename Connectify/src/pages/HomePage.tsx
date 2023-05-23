import { Flex, Box } from '@chakra-ui/react';
import Header from "../components/HeaderMenu/HeaderMenu";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatBox from "../components/ChatBox/ChatBox";

function HomePage() {
  return (
    <Flex direction="column" height="100vh">
      <Box bg="red.300"><Header /></Box>
      <Flex direction="row" flexGrow="1">
        <Box bg="blue.300" width="250px"><Sidebar /></Box>
        <Box bg="grey" flex="1" ml='20px' mt='20px' height='700px' width='100px'><ChatBox /></Box>
      </Flex>
    </Flex>
  );
}

export default HomePage;
