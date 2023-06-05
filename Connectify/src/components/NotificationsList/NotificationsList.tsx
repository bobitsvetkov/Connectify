import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton, Box, Tooltip } from "@chakra-ui/react";
import { AiOutlineBell } from "react-icons/ai";
import { useColorModeValue } from "@chakra-ui/react";
import { useGetNotificationsByIdQuery } from "../../api/databaseApi";
import { getAuth } from "firebase/auth";
import NotificationSingle from "../NotificationSingle/NotificationSingle";

const NotificationList = () => {
  const currUserUid = getAuth().currentUser?.uid;
  const { data: notifications, isLoading: areNotificationsLoading, isError: isError } = useGetNotificationsByIdQuery(currUserUid);

  const handleClick = (notificationId) => {
    console.log(`Notification ${notificationId} clicked!`);
  };

  const sortedNotifications = !areNotificationsLoading && !isError 
    ? Object.values(notifications).sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <Menu>
      <Tooltip label="Notifications" placement="right-end">
        <MenuButton>
          <IconButton
            variant="ghost"
            icon={
              <Box color={useColorModeValue("black", "white")} as={AiOutlineBell} />
            }
          />
        </MenuButton>
      </Tooltip>
      <MenuList>
        {areNotificationsLoading && <div>Loading...</div>}
        {isError && <div>Error occurred.</div>}
        {!areNotificationsLoading && !isError && sortedNotifications.map((notification, index) => (
          <NotificationSingle key={index} notification={notification} handleClick={handleClick} />
        ))}
        <MenuDivider />
        <MenuItem>See all notifications</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NotificationList;
