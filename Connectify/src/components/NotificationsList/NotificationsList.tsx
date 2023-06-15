import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Box,
  Tooltip,
  useColorModeValue,
  Text,
  Center,
} from "@chakra-ui/react";
import { AiOutlineBell } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import NotificationSingle from "../NotificationSingle/NotificationSingle";
import { database } from "../../config/firebaseConfig";
import { ref, onValue, DataSnapshot } from "firebase/database";
import { useDeleteUserNotificationsMutation } from "../../api/databaseApi";
import { Notification } from "../../types/interfaces";

const NotificationList = () => {
  const currUserUid = getAuth().currentUser?.uid;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [deleteNotifications] = useDeleteUserNotificationsMutation();

  useEffect(() => {
    if (currUserUid) {
      const notificationsRef = ref(
        database,
        `users/${currUserUid}/notifications`
      );

      const handleValueChange = (snapshot: DataSnapshot) => {
        const notificationsArray: Notification[] = Object.values(
          snapshot.val() || {}
        ).map((notification) => notification as Notification);
        notificationsArray.sort(
          (a: Notification, b: Notification) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNotifications(notificationsArray);
      };

      const unsubscribe = onValue(notificationsRef, handleValueChange);

      return () => {
        unsubscribe();
      };
    }
  }, [currUserUid]);
  return (
    <Menu>
      <Tooltip label="Notifications" placement="right-end">
        <IconButton
          variant="ghost"
          aria-label="Notifications"
          icon={
            <Center>
              <Box
                color={useColorModeValue("black", "white")}
                as={AiOutlineBell}
              />
            </Center>
          }
          as={MenuButton}
        />
      </Tooltip>

      <MenuList maxH="400px" overflowY="auto">
        {notifications.length > 0 ? (
          notifications.map((notification: Notification, index: number) => (
            <NotificationSingle key={index} notification={notification} />
          ))
        ) : (
          <Text px={4} py={2}>
            No notifications
          </Text>
        )}
        <MenuDivider />
        {currUserUid && (
          <MenuItem
            onClick={() => deleteNotifications({ userUid: currUserUid })}
          >
            Delete all notifications
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default NotificationList;
