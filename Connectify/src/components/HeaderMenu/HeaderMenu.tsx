import { Box, Flex, Text } from "@chakra-ui/react";
import AvatarButton from "../AvatarItem/AvatarButton";
import SearchInput from "../Search/SearchInput";

const Header: React.FC = () => {
  return (
    <Box bg="green.800" color="white" px={4}>
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        py={4}
        position="relative"
      >
        <Text fontSize="xl" fontWeight="bold">
          Connectify
        </Text>
        <Flex align="center">
          <SearchInput size="sm" />
        </Flex>
        <Flex>
          <AvatarButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
