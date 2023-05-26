import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  AbsoluteCenter,
  Center,
  Flex,
  Box,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { RootState } from "../store";
import ChatBox from "./ChatBox/ChatBox";

export function RightPanel(props) {
  const activeChatUser = useSelector(
    (state: RootState) => state.activeUser.user
  );

  return (
    <Center
      bg="#f0f2f5"
      borderBottom="6px solid #43c960"
      position="relative"
      {...props}
      w="70%"
    >
      {activeChatUser ? (
        <ChatBox />
      ) : (
        <Flex
          direction="column"
          textAlign="center"
          color="#41525d"
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
            <HStack justifyItems="baseline" color="#8696a0">
              <Text fontSize="sm" fontWeight="medium">
                Supported by Connectify Team
              </Text>
            </HStack>
          </AbsoluteCenter>
        </Flex>
      )}
    </Center>
  );
}

export default RightPanel;
