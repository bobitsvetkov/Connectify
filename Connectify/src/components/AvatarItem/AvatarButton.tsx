import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";

const AvatarButton: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={
          <Avatar size="sm" name="Radina Georgieva" src="/path/to/avatar.png" />
        }
        variant="outline"
        borderColor="purple.800"
        bg="green.100"
        color="white"
      >
        {/* Radina Georgieva */}
      </MenuButton>
      <MenuList bg="white" color="black">
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Settings</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarButton;
