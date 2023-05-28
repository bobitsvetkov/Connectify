import React, { ReactNode } from "react";
import {
  Avatar,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineTeam } from 'react-icons/ai';
import { GrStatusGoodSmall } from "react-icons/gr";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserSetting } from "../UserSettings/UserSettings";
import AvatarButton from "../AvatarItem/AvatarButton";
import ProfileInfo from "../ProfileInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IconData {
  icon: ReactNode;
  label: string;
}

interface CustomTooltipProps extends React.ComponentProps<typeof Tooltip> {
  label: string;
  icon: ReactNode;
}

export const Header: React.FC = ({
  onViewChange,
  onChatClick,
  setUserListOpen,
}) => {
  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();
  const {
    isOpen: isCommunityChatOpen,
    onOpen: onCommunityChatOpen,
    onClose: onCommunityChatClose,
  } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  const handleChatClick = () => {
    onChatClick();
    onViewChange("chat");
    setUserListOpen(true);
  };
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <Flex
      bg="#f0f2f5"
      justify="space-between"
      py="2"
      px="4"
      borderRight="1px solid #f2f2f2"
      color="#54656f"
    >
      <AvatarButton onClick={onAvatarOpen} boxSize="40px" />
      <Drawer placement="left" onClose={onAvatarClose} isOpen={isAvatarOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Profile</DrawerHeader>
          <DrawerBody>
            <ProfileInfo />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <HStack spacing="3">
        <IconButton
          variant="ghost"
          onClick={onCommunityChatOpen}
          icon={<IoIosPeople />}
        />
        <Drawer
          placement="left"
          onClose={onCommunityChatClose}
          isOpen={isCommunityChatOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Community Chat</DrawerHeader>
            <DrawerBody>{/* content */}</DrawerBody>
          </DrawerContent>
        </Drawer>
        <IconButton
          variant="ghost"
          onClick={handleChatClick}
          icon={<BsFillChatLeftTextFill />}
        />

        <Menu>
          <MenuButton
            as={IconButton}
            variant="ghost"
            icon={<GiHamburgerMenu />}
          />
          <MenuList>
            <MenuItem onClick={onSettingsOpen}>Settings</MenuItem>
            <Drawer
              placement="left"
              onClose={onSettingsClose}
              isOpen={isSettingsOpen}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  <UserSetting />
                </DrawerHeader>
                <DrawerBody>{/* content */}</DrawerBody>
              </DrawerContent>
            </Drawer>
            <MenuItem>New Window</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};
