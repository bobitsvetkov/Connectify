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
} from "@chakra-ui/react";
import { RootState } from "../store";
import { RightPanelProps } from "../types/interfaces";

export const RightPanel: React.FC<RightPanelProps> = ({ children }) => {
  const activeChatUser = useSelector(
    (state: RootState) => state.activeUser.user
  );

  const bgColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("#41525d", "#f0f2f5");
  const subTextColor = useColorModeValue("#8696a0", "#a0aec0");

  return (
    <Center bg={bgColor} position="relative" w="70%">
      {activeChatUser ? (
        <>{children}</>
      ) : (
        <Flex
          direction="column"
          textAlign="center"
          color={textColor}
          align="center"
        >
          <Box pt="8">
            <Heading fontWeight="light">Connectify</Heading>
            <Text fontSize="sm" mt="4">
              Send and receive messages without keeping your phone online.{" "}
              <br /> Use Connectify
            </Text>
          </Box>
          <AbsoluteCenter axis="horizontal" bottom="10" flex="1" mt="10">
            <HStack justifyItems="baseline" color={subTextColor}>
              <Text fontSize="sm" fontWeight="medium">
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
