import { Box, VStack, useColorModeValue, Flex, Divider, HStack, Button, Icon, Spacer, Slide, Drawer, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getAuth } from "firebase/auth";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { useSubscription } from "../../Hooks/useSubscribtion";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import { FaUsers } from "react-icons/fa";
import { useDebugValue, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MemberList from "../MemberList/MemberList";
import { selectUser } from "../../features/ActiveUserSlice";

const ChatBox: React.FC<{ chatType: 'individual' | 'team' }> = ({ chatType }) => {
  const [showMembers, setShowMembers] = useState(false);
  const auth = getAuth();
  const currUser = auth.currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
  let activeChatUser = useSelector((state: RootState) => state.activeUser.user);
  const { teamId, channelId, chatUserId } = useParams();
  const bg = useColorModeValue("gray.200", "gray.700");
  const isChat = chatType === 'individual' ? true : false;
  const dispatch = useDispatch();

  if (isChat === false) {
    activeChatUser = null;
  }

  const { chatData, activeChatId } = useSubscription(user, teamId, channelId, chatUserId, isChat);

  if (isUserLoading) return <div>Loading...</div>;
  if (isUserError || !user) return <div>Error loading user</div>;

  return (
    <Flex
      height="100%"
      width="100%"
      borderWidth={1}
      borderRadius="lg"
      bg={bg}
      boxShadow="xl"
    >
      <VStack
        flex="1"
        padding={5}
      >
        <Flex width="100%">
          <Box fontSize="xl">
            <Box fontSize="xl">
              {isChat
                ? activeChatUser.firstName + " " + activeChatUser.lastName
                : (chatData && chatData.name) || "Loading..."}
            </Box>
          </Box>
          {isChat ||
            <>
              <Spacer />
              <Button rightIcon={<Icon as={FaUsers} />} onClick={() => setShowMembers(!showMembers)}>Team Members</Button>
            </>}
        </Flex>
        <Divider orientation="horizontal" color="black" />
        <ChatMessages chatData={chatData} userId={user.uid} activeChatUser={activeChatUser} activeChatId={activeChatId} />
        <ChatInput currUser={currUser} user={user} chatUserId={chatUserId} activeChatUser={activeChatUser} isChat={isChat} teamId={teamId} channelId={channelId} />
      </VStack>
      {showMembers && (
        <VStack
          width="200px"
          padding={5}
          bg={bg}
          boxShadow="xl"
          borderLeftWidth={1}
        >
          <MemberList teamId={teamId} />
        </VStack>
      )}
    </Flex>
  );
};

export default ChatBox;
