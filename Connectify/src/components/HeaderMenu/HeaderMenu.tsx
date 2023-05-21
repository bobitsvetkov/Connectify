import { Box, Flex, Text } from "@chakra-ui/react";
import AvatarButton from "../AvatarItem/AvatarButton";
import SearchInput from "../Search/SearchInput";

const Header: React.FC = () => {
  return (
    <Box bg="green.800" color="white" px={4} width="100%">
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        py={4}
      >
        <Text fontSize="xl" fontWeight="bold">
          Connectify
        </Text>
        <Flex align="center" ml="auto">
          <SearchInput size="sm" />
        </Flex>
        <Flex ml="auto">
          <AvatarButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
