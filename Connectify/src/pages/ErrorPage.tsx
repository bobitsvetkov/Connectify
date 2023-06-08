import { Image } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

const ErrorPage: React.FC = () => {
  const boxSize = useBreakpointValue({ base: "80%", md: "60%", lg: "40%" });

  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh" px="1em">
      <Box maxW={boxSize}>
        <Image
          src="https://img.freepik.com/free-vector/monster-404-error-concept-illustration_114360-1918.jpg?w=740&t=st=1686246185~exp=1686246785~hmac=301442c73b8c118d13f42f4e41e72fada10e353066e86f66eae33b20f0c80f98"
          objectFit="contain"
        />
      </Box>
    </Flex>
  );
};

export default ErrorPage;
