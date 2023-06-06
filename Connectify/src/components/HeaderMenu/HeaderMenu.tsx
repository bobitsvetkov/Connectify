import{ ReactNode, useEffect, useState } from "react";
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
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { AiOutlineTeam, AiOutlineRobot, AiOutlineBell } from "react-icons/ai";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { UserSetting } from "../UserSettings/UserSettings";
import AvatarButton from "../AvatarItem/AvatarButton";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { ref as refDB, onValue, off } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CalendarApp from "../Calendar/Calendar";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { getAuth } from "firebase/auth";
import { useColorMode } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { selectUser } from "../../features/ActiveUserSlice";
import NotificationList from "../NotificationsList/NotificationsList";
import { Toast, toastId } from "@chakra-ui/react";

export const Header: React.FC = ({
  onViewChange,
  onChatClick,
  onTeamsClick,
  setUserListOpen,
  setTeamListOpen,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [status, setStatus] = useState("available");
  const auth = getAuth();
  const currUser = auth.currentUser;
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);
  const { data: mimir } = useGetUserByIdQuery("mimir");
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

  let toastId;

  useEffect(() => {
    const notificationsRef = refDB(database, `users/${currUser?.uid}/notifications`);
    const handleNewNotification = (snapshot) => {
      const notificationsArray = Object.values(snapshot.val() || {});
      const newNotifications = notificationsArray.filter(notification => !notification.isSeen);

      newNotifications.forEach(notification => {
        if (!toast.isActive(toastId)) {
          toastId = toast({
            title: "New Notification",
            description: notification.content,
            status: "info",
            duration: 4000,
            isClosable: true,
          });
        }
      });
    };

    onValue(notificationsRef, handleNewNotification);
    return () => off(notificationsRef, handleNewNotification);
  }, []);

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

  const handleChatBotClick = () => {
    dispatch(selectUser(mimir));
    navigate("/chat/mimir");
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <Flex
      bg={useColorModeValue("#f57c73", "gray.800")}
      justify="space-between"
      py="2"
      px="4"
      color={useColorModeValue("#f57c73", "#f57c73")}
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
          <MenuItem onClick={onSettingsOpen}>Settings</MenuItem>
          <Drawer
            placement="left"
            onClose={onSettingsClose}
            isOpen={isSettingsOpen}
          >
            <DrawerOverlay />
            <DrawerContent bg={useColorModeValue("#f57c73", "#f57c73")}>
              <DrawerHeader borderBottomWidth="1px">
                <UserSetting />
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          <MenuDivider />
          <MenuItem onClick={handleLogOut}>Log out</MenuItem>
        </MenuList>
      </Menu>
      <HStack spacing="3">
        <NotificationList />
        <IconButton
          variant="ghost"
          onClick={handleChatBotClick}
          icon={
            <Box
              color={useColorModeValue("black", "white")}
              as={AiOutlineRobot}
            />
          }
        />
        <IconButton
          variant="ghost"
          onClick={handleChatClick}
          icon={
            <Box
              color={useColorModeValue("black", "white")}
              as={BsFillChatLeftTextFill}
            />
          }
        />

        <IconButton
          variant="ghost"
          onClick={handleTeamsClick}
          icon={
            <Box
              color={useColorModeValue("black", "white")}
              as={AiOutlineTeam}
            />
          }
        />
        <CalendarApp />
        <IconButton
          variant="ghost"
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Flex>
  );
};
