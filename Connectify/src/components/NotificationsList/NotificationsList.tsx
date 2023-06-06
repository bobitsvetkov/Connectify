import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton, Box, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineBell } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from 'react';
import NotificationSingle from "../NotificationSingle/NotificationSingle";
import { database } from "../../config/firebaseConfig";
import { ref, onValue, off } from "firebase/database";

const NotificationList = () => {
  const currUserUid = getAuth().currentUser?.uid;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const teamsRef = ref(database, `users/${currUserUid}/notifications`);
    const handleValueChange = (snapshot) => {
      const notificationsArray = Object.values(snapshot.val() || {});
      notificationsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotifications(notificationsArray);
    };
    onValue(teamsRef, handleValueChange);
    return () => {
      off(teamsRef, handleValueChange);
    };
  }, []);

  const handleClick = (notificationId) => {
    console.log(`Notification ${notificationId} clicked!`);
  };


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
        {notifications.map((notification, index) => (
          <NotificationSingle key={index} notification={notification} handleClick={handleClick} />
        ))}
        <MenuDivider />
        <MenuItem>See all notifications</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NotificationList;
