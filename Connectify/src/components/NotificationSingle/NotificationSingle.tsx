import { HStack, VStack, Text, Box, Avatar } from "@chakra-ui/react";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { useColorModeValue } from "@chakra-ui/react";

interface NotificationSingleProps {
  notification: any;
  handleClick: (notificationId: string) => void;
}

const NotificationSingle: FC<NotificationSingleProps> = ({
  notification,
  handleClick,
}) => {
  const hoverBgColor = useColorModeValue("gray.100", "gray.800");
  const { data: user, isLoading, isError } = useGetUserByIdQuery(notification.user);

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <Box _hover={{ backgroundColor: hoverBgColor }} cursor="pointer" onClick={() => handleClick(notification.uid)}>
      <HStack ml={2} mb={2}>
        <Avatar name={`${user.firstName} ${user.lastName}`} src={user.photoURL} />
        <VStack align="start" spacing={1}>
          <Text>{`${user.firstName} ${user.lastName}`}</Text>
          <HStack width="100%">
            <Text>{notification.content}</Text>
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