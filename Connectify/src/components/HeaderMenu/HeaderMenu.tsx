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
  Box
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineTeam, AiOutlineRobot } from "react-icons/ai";
import { GrStatusGoodSmall } from "react-icons/gr";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiCalendar } from "react-icons/fi";
import { UserSetting } from "../UserSettings/UserSettings";
import AvatarButton from "../AvatarItem/AvatarButton";
import ProfileInfo from "../ProfileInfo";
import { useNavigate } from "react-router-dom";
import { ref as refDB, onValue } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { auth } from "../../config/firebaseConfig";
import ProfileStatus from "../ProfileStatus";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CalendarApp from "../Calendar/Calendar";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { getAuth } from "firebase/auth";
import { useColorMode } from "@chakra-ui/react";

export const Header: React.FC = ({
  onViewChange,
  onChatClick,
  onTeamsClick,
  setUserListOpen,
  setTeamListOpen,
  onAiAssistantClick,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [status, setStatus] = useState("available");
  const auth = getAuth();
  const currUser = auth.currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);

  const [isCalendarOpen, setCalendarOpen] = useState(false);
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
  }, [user]);

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

  const handleCalendarClick = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleAiAssistantClick = () => {
    onAiAssistantClick();
    onViewChange("assistant");
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <Flex
      bg={useColorModeValue("#f0f2f5", "gray.800")}
      justify="space-between"
      py="2"
      px="4"
      borderRight="1px solid #f2f2f2"
      color={useColorModeValue("#54656f", "white")}
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
          onClick={handleAiAssistantClick}
          icon={<Box color={useColorModeValue('black', 'white')} as={AiOutlineRobot} />}
        />
        <IconButton
          variant="ghost"
          onClick={handleChatClick}
          icon={<Box color={useColorModeValue('black', 'white')} as={BsFillChatLeftTextFill} />}
        />

        <IconButton
          variant="ghost"
          onClick={handleTeamsClick}
          icon={<Box color={useColorModeValue('black', 'white')} as={AiOutlineTeam} />}
        />

        <CalendarApp />

        <IconButton
          variant="ghost"
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
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
