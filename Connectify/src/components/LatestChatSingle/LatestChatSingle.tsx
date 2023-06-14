import { HStack, VStack, Text, Box, Spacer } from "@chakra-ui/layout";
import {
  useLazyGetUserByIdQuery,
  useLazyGetChannelByIdQuery,
  useLazyGetTeamByIdQuery
} from "../../api/databaseApi";
import { getAuth } from "@firebase/auth";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/react";
import { latestChat, User, Team, Channel } from "../../types/interfaces";
import { useEffect } from 'react';

interface LatestChatSingleProps {
  chat: latestChat;
  handleChatClick: (user: User) => void;
  handleChannelClick: (teamId: string, channelId: string) => void;
}

const LatestChatSingle = ({
  chat,
  handleChatClick,
  handleChannelClick,
}: LatestChatSingleProps) => {

  const hoverBgColor = useColorModeValue("gray.100", "gray.800");

  const [triggerGetAuthor, authorResult] = useLazyGetUserByIdQuery();
  const [triggerGetUserChattingWith, userChattingWithResult] = useLazyGetUserByIdQuery();
  const [triggerGetChannel, channelResult] = useLazyGetChannelByIdQuery();
  const [triggerGetTeam, teamResult] = useLazyGetTeamByIdQuery();

  useEffect(() => {
    if (chat.user) {
      triggerGetAuthor(chat.user);
    }

    if (chat.userChatting) {
      triggerGetUserChattingWith(chat.userChatting);
    }
  }, [chat.user, chat.userChatting, triggerGetAuthor, triggerGetUserChattingWith]);

  useEffect(() => {
    if (chat.teamId && chat.channelId) {
      triggerGetChannel({
        teamId: chat.teamId,
        channelId: chat.channelId,
      });
      triggerGetTeam(chat.teamId);
    }
  }, [chat, triggerGetChannel, triggerGetTeam]);

  let author: User | undefined, userChattingWith: User | undefined, team: Team | undefined, channel: Channel | undefined;

  if (!authorResult.isLoading && !authorResult.isError) {
    author = authorResult.data;
  }

  if (chat.isChat) {
    if (!userChattingWithResult.isLoading && !userChattingWithResult.isError) {
      userChattingWith = userChattingWithResult.data;
    }
  } else {
    if (channelResult && !channelResult.isLoading && !channelResult.isError) {
      channel = channelResult.data;
    }
    if (teamResult && !teamResult.isLoading && !teamResult.isError) {
      team = teamResult.data;
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string | undefined) => {
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

  const formatContent = (content: string) => {
    const maxLength = 25;
    return content.length > maxLength ? content.substring(0, maxLength - 3) + '...' : content;
  };

  const currUserUid = getAuth().currentUser?.uid;

  return chat.isChat ? (
    <Box
      _hover={{ backgroundColor: hoverBgColor }}
      cursor="pointer"
      onClick={() => userChattingWith && handleChatClick(userChattingWith)}
    >
      <HStack ml={2} mb={2}>
        <Avatar
          name={`${userChattingWith?.firstName} ${userChattingWith?.lastName}`}
          src={userChattingWith?.photoURL}
        >
          <AvatarBadge
            boxSize="1.25em"
            bg={getStatusColor(userChattingWith?.status)}
          />
        </Avatar>
        <VStack align="start" spacing={1}>
          <Text>{`${userChattingWith?.firstName} ${userChattingWith?.lastName}`}</Text>
          <HStack width="100%">
            {currUserUid === chat.user ? (
              <Text>You: {formatContent(chat.content)}</Text>
            ) : (
              <Text>{`${formatContent(chat.content)}`}</Text>
            )}
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              {formatDate(chat.date)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  ) : (
    <Box
      _hover={{ backgroundColor: hoverBgColor }}
      cursor="pointer"
      onClick={() => team && channel && handleChannelClick(team.uid, channel.uid)}
    >
      <HStack ml={2} mb={2}>
        <Avatar name={team?.name} src={team?.photoUrl} borderRadius="6" />
        <VStack align="start" spacing={1}>
          <Text>{`${team?.name} #${channel?.name}`}</Text>
          <HStack width="100%">
            {currUserUid === chat.user ? (
              <Text>You: {formatContent(chat.content)}</Text>
            ) : (
              <Text>{`${author?.firstName} ${author?.firstName}: ${formatContent(chat.content)}`}</Text>
            )}
            <Spacer />
            <Text fontSize="sm" color="gray.500">
              {formatDate(chat.date)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default LatestChatSingle;
