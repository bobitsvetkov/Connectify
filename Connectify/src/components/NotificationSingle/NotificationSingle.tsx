import { HStack, VStack, Text, Box, Avatar } from "@chakra-ui/react";
import { useUpdateUserNotificationsMutation, useLazyGetTeamByIdQuery, useLazyGetUserByIdQuery } from "../../api/databaseApi";
import { useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../features/ActiveUserSlice";
import { Notification } from "../../types/interfaces";
import { useEffect } from "react";

type NotificationSingleProps = {
  notification: Notification;
};

const NotificationSingle = ({ notification }: NotificationSingleProps) => {
  const hoverBgColor = useColorModeValue("gray.100", "gray.800");
  const [getUserById, { data: user, isLoading, isError }] = useLazyGetUserByIdQuery();
  const [getTeamById, { data: team }] = useLazyGetTeamByIdQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateNotificationSeenStatus] = useUpdateUserNotificationsMutation();

  useEffect(() => {
    if (notification?.user) {
      getUserById(notification.user);
    }
    if (notification?.teamId) {
      getTeamById(notification.teamId);
    }
  }, [notification, getUserById, getTeamById]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  const handleChatClick = () => {
    if (user) {
      dispatch(selectUser(user));
      navigate(`/chat/${user?.username}`);
    }
  }
  const handleChannelClick = () => {
    navigate(`/${notification?.teamId}/${notification?.channelId}`);
  }

  const handleClick = () => {
    updateNotificationSeenStatus({ userUid: notification.owner, notificationUid: notification.uid, notification: { ...notification, isSeen: true } });
    if (notification.isChat) {
      handleChatClick();
    } else {
      handleChannelClick();
    }
  }

  const formatContent = (content: string) => {
    const maxLength = 10;
    return content.length > maxLength ? content.substring(0, maxLength - 3) + '...' : content;
  };

  return (
    <Box _hover={{ backgroundColor: hoverBgColor }} cursor="pointer" onClick={handleClick}>
      <HStack ml={2} mb={2}>
        {notification.isChat ?
          <Avatar name={user ? `${user.firstName} ${user.lastName}` : ''} src={user?.photoURL} /> :
          <Avatar name={team?.name} src={team?.photoUrl} borderRadius="6" />
        }
        <VStack align="start" spacing={1}>
          {notification.isChat ?
            <Text fontWeight={notification.isSeen ? "normal" : "bold"}>{user ? `${user.firstName} ${user.lastName}` : ''}</Text> :
            <Text fontWeight={notification.isSeen ? "normal" : "bold"}>{`${team?.name}`}</Text>
          }
          <HStack width="100%">
            {notification.isChat ?
              <Text fontWeight={notification.isSeen ? "normal" : "bold"}>{formatContent(notification.content)}</Text> :
              <Text fontWeight={notification.isSeen ? "normal" : "bold"}>{user ? `${user.firstName} ${user.lastName}: ${formatContent(notification.content)}` : ''}</Text>
            }
            <Text fontSize="sm" color="gray.500">
              {formatDate(notification.date)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default NotificationSingle;
