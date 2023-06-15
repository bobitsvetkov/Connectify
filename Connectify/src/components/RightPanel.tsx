import { useSelector } from "react-redux";
import {
  AbsoluteCenter,
  Center,
  Flex,
  Box,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RootState } from "../store";
import { RightPanelProps } from "../types/interfaces";
import { motion } from "framer-motion"; // import framer motion

const MotionImage = motion(Image);

export const RightPanel: React.FC<RightPanelProps> = ({ children }) => {
  const activeChatUser = useSelector(
    (state: RootState) => state.activeUser.user
  );

  const bgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("#41525d", "#f0f2f5");
  const subTextColor = useColorModeValue("#8696a0", "#a0aec0");
  const fontSize = useBreakpointValue({ base: "xl", md: "3xl" });

  return (
    <Center bg={bgColor} position="relative" w={["100%", "70%"]}>
      {activeChatUser ? (
        <>{children}</>
      ) : (
        <Flex
          direction="column"
          textAlign="center"
          color={textColor}
          align="center"
          p="4"
        >
          <Box pt="8">
            <Heading fontSize={fontSize} fontWeight="bold">
              {" "}
              Welcome to Connectify
            </Heading>
            <Box boxSize={["sm", "lg"]}>
              <MotionImage
                borderRadius={"20px"}
                animate={{ y: ["0px", "10px", "0px"] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  loop: Infinity,
                  repeatDelay: 1,
                }}
                src="https://i.ibb.co/p3sbtWy/20945188-removebg-preview-1.png"
              />
              <Text fontSize={["sm", "md"]} mt="2">
                Bridging Distances, Connecting Minds!
                <br />
              </Text>
            </Box>
          </Box>
          <AbsoluteCenter axis="horizontal" bottom="10" flex="1" mt="10">
            <HStack justifyItems="baseline" color={subTextColor}>
              <Text fontSize={["xs", "sm"]} fontWeight="medium">
                Supported by Connectify Team
              </Text>
            </HStack>
          </AbsoluteCenter>
        </Flex>
      )}
    </Center>
  );
};

export default RightPanel;
