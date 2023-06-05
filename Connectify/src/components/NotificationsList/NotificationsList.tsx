import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, IconButton, Box, Tooltip } from "@chakra-ui/react";
import { AiOutlineBell } from "react-icons/ai";
import { useColorModeValue } from "@chakra-ui/react";

const NotificationList = () => {

  const notifications = ["Notification 1", "Notification 2", "Notification 3"];
  
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
          <MenuItem key={index}>{notification}</MenuItem>
        ))}
        <MenuDivider />
        <MenuItem>See all notifications</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NotificationList;
