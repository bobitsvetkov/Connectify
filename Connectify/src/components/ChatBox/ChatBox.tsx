import { useSelector } from "react-redux";
import { Box, VStack, useColorModeValue, Flex, Divider } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getAuth } from "firebase/auth";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { useSubscription } from "../../Hooks/useSubscribtion";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";

const ChatBox: React.FC<{ chatType: 'individual' | 'team' }> = ({ chatType }) => {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(currUser && currUser.uid);
  const activeChatUser = useSelector((state: RootState) => state.activeUser.user);
  const { teamId, channelId, chatUserId } = useParams();
  const bg = useColorModeValue("gray.200", "gray.700");
  const isChat = chatType === 'individual' ? true : false;

  const chatData = useSubscription(user, teamId, channelId, chatUserId, isChat);

  if (isUserLoading) return <div>Loading...</div>;
  if (isUserError || !user) return <div>Error loading user</div>;

  return (
        <VStack
          height="100%"
          width="100%"
          borderWidth={1}
          borderRadius="lg"
          padding={5}
          bg={bg}
          boxShadow="xl"
        >
          <Box fontSize="xl">
            {activeChatUser
              ? activeChatUser.firstName + " " + activeChatUser.lastName
              : ""}
          </Box>
          <Divider orientation="horizontal" color="black" />
          <ChatMessages chatData={chatData} userId={user.uid} activeChatUser={activeChatUser} />
          <ChatInput currUser={currUser} user={user} chatUserId={chatUserId} activeChatUser={activeChatUser} isChat={isChat} teamId={teamId} channelId={channelId} />
        </VStack>
  );
};

export default ChatBox;