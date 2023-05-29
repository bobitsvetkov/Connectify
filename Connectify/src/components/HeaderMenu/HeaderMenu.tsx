import React, { ReactNode, useEffect, useState } from "react";
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
  Button,
  Divider,
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
import { ref as refDB, onValue } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { auth } from "../../config/firebaseConfig";
import ProfileStatus from "../ProfileStatus";

export const Header: React.FC = ({
  onViewChange,
  onChatClick,
  onTeamsClick,
  setUserListOpen,
  setTeamListOpen,
}) => {
  const [status, setStatus] = useState("available");
  const currUser = auth.currentUser;

  const {
    isOpen: isAvatarOpen,
    onOpen: onAvatarOpen,
    onClose: onAvatarClose,
  } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  useEffect(() => {
    const userStatusRef = refDB(database, `users/${currUser?.uid}/status`);
    const userStatusListener = onValue(userStatusRef, (snapshot) => {
      const userStatus = snapshot.val();
      if (userStatus) {
        setStatus(userStatus);
      }
    });
    return userStatusListener;
  }, [currUser]);

  const handleChatClick = () => {
    onChatClick();
    onViewChange("chat");
    setUserListOpen(true);
  };

  const handleTeamsClick = () => {
    onTeamsClick();
    onViewChange("teams");
    setTeamListOpen(true);
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
      <Menu>
        <Tooltip label={status} placement="right-end">
          <MenuButton
            onClick={onAvatarOpen}
            boxSize="60px"
            display={{ md: "flex" }}
          >
            <AvatarButton status={status} />
          </MenuButton>
        </Tooltip>
        <MenuList>
          <ProfileInfo />
          <MenuDivider />
          <ProfileStatus />
        </MenuList>
      </Menu>
      <HStack spacing="3">
        <IconButton
          variant="ghost"
          onClick={handleChatClick}
          icon={<BsFillChatLeftTextFill />}
        />
        <IconButton
          variant="ghost"
          onClick={handleTeamsClick}
          icon={<AiOutlineTeam />}
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
