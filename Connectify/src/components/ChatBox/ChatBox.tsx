import {
  Box,
  VStack,
  useColorModeValue,
  Flex,
  Divider,
  HStack,
  Button,
  Icon,
  Spacer,
  Slide,
  Drawer,
  Text,
  Avatar,
  AvatarBadge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { getAuth } from "firebase/auth";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { useGenerateMessageQuery } from "../../api/openaiApi";
import { useSubscription } from "../../Hooks/useSubscribtion";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import CreateRoom from "../Video Call/CreateRoom";
import { FaUsers } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MemberList from "../MemberList/MemberList";
import { ref, onValue } from "@firebase/database";
import { database } from "../../config/firebaseConfig";

const ChatBox: React.FC<{ chatType: "individual" | "team" }> = ({
  chatType,
}) => {
  const [showMembers, setShowMembers] = useState(false);
  const [activeChatUserStatus, setActiveChatUserStatus] = useState("");
  const [isStatusLoading, setIsStatusLoading] = useState(true);
  const auth = getAuth();
  const currUser = auth.currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);
  let activeChatUser = useSelector((state: RootState) => state.activeUser.user);
  const { teamId, channelId, chatUserId } = useParams();
  const bg = useColorModeValue("gray.200", "gray.700");
  const isChat = chatType === "individual" ? true : false;
  const isBot = chatUserId === 'mimir' ? true : false;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  useEffect(() => {
    if (chatType === "individual" && showMembers) {
      setShowMembers(false);
    }
  }, [chatType, showMembers]);

  if (isChat === false) {
    activeChatUser = null;
  }

  useEffect(() => {
    if (activeChatUser?.uid) {
      const userStatusRef = ref(database, `users/${activeChatUser.uid}/status`);
      const unsubscribe = onValue(userStatusRef, (snapshot) => {
        const status = snapshot.val();
        if (status) {
          setActiveChatUserStatus(status);
          setIsStatusLoading(false);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [activeChatUser?.uid]);

  const { chatData, activeChatId } = useSubscription(
    user,
    teamId,
    channelId,
    chatUserId,
    isChat
  );

  if (isUserLoading) return <div>Loading...</div>;
  if (isUserError || !user) return <div>Error loading user</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green.400";
      case "Offline":
        return "gray.500";
      case "Away":
        return "yellow.400";
      case "In a meeting":
        return "purple.300";
      case "Busy":
        return "red.600";
      default:
        return "blue.500";
    }
  };

  return (
    <Flex height="100%" width="100%" borderWidth={1} bg={bg} boxShadow="xl">
      <VStack flex="1" padding={5}>
        <Flex width="100%">
          <Box fontSize="xl">
            <Box fontSize="xl" mr={3}>
              {isChat ? (
                <HStack>
                  <Avatar
                    size="sm"
                    name={`${activeChatUser?.firstName} ${activeChatUser?.lastName}`}
                    src={activeChatUser?.photoURL}
                    marginRight="0.5rem"
                  >
                    {!isStatusLoading && (
                      <AvatarBadge
                        boxSize="1.25em"
                        bg={getStatusColor(activeChatUserStatus)}
                        border="2px"
                        borderColor="white"
                      />
                    )}
                  </Avatar>
                  <Text>
                    {activeChatUser.firstName + " " + activeChatUser.lastName}
                  </Text>
                </HStack>
              ) : (
                (chatData && chatData.name) || "Loading..."
              )}
            </Box>
          </Box>
          {isBot ||
            <Flex direction="row" justify="flex-end">
              <Button onClick={onOpen}>Create Room</Button>
              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create Room</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <CreateRoom />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Flex>
          }
          {isChat || (
            <>
              <Spacer />
              <Flex direction="row" alignItems="center">
                <Button onClick={onOpen}>Create Room</Button>
                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Create Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <CreateRoom />
                    </ModalBody>
                  </ModalContent>
                </Modal>
                <Button
                  onClick={() => setShowMembers(!showMembers)}
                  style={{ fontSize: "24px", marginLeft: "8px" }}
                >
                  <FaUsers />
                </Button>
              </Flex>
            </>
          )}
        </Flex>

        <Divider orientation="horizontal" color="black" />
        <ChatMessages
          chatData={chatData}
          userId={user.uid}
          activeChatUser={activeChatUser}
          activeChatId={activeChatId}
          activeChatUserStatus={activeChatUserStatus}
          getStatusColor={getStatusColor}
          isChat={isChat}
          teamId={teamId}
          channelId={channelId}
        />
        <ChatInput
          currUser={currUser}
          user={user}
          chatUserId={chatUserId}
          activeChatUser={activeChatUser}
          isChat={isChat}
          teamId={teamId}
          channelId={channelId}
          isBot={isBot}
        />
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
