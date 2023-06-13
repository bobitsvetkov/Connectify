import { useEffect, useState } from "react";
import {
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
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { AiOutlineTeam, AiOutlineRobot } from "react-icons/ai";
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
import {
  useGetUserByIdQuery,
  useUpdateUserNotificationsMutation,
} from "../../api/databaseApi";
import { getAuth } from "firebase/auth";
import { useColorMode } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { selectUser } from "../../features/ActiveUserSlice";
import NotificationList from "../NotificationsList/NotificationsList";
import {
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import NotificationSingle from "../NotificationSingle/NotificationSingle";
import notificationSound from "../../assets/notification-sound.mp3";
import { DataSnapshot } from "firebase/database";
import { HeaderProps } from "../../types/interfaces";

export const Header: React.FC<HeaderProps> = ({
  onViewChange,
  onChatClick,
  onTeamsClick,
  setUserListOpen,
  setTeamListOpen,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [status, setStatus] = useState("Available");
  const auth = getAuth();
  const currUser = auth.currentUser;
  const dispatch = useDispatch();
  const { data: user } = useGetUserByIdQuery(currUser && currUser.uid);
  const { data: mimir } = useGetUserByIdQuery("mimir");
  const [updateUserNotifications] = useUpdateUserNotificationsMutation();
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  const { onOpen: onAvatarOpen } = useDisclosure();
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

  const notificationAudio = new Audio(notificationSound);

  useEffect(() => {
    const notificationsRef = refDB(
      database,
      `users/${currUser?.uid}/notifications`
    );
    const handleNewNotification = (snapshot: DataSnapshot) => {
      const notificationsArray = Object.values(snapshot.val() || {});
      const newNotifications = notificationsArray.filter(
        (notification) => !notification.wasShown
      );

      newNotifications.forEach((notification) => {
        setNotificationData(notification);
        setShowPopover(true);
        updateUserNotifications({
          userUid: currUser.uid,
          notificationUid: notification.uid,
          notification: { ...notification, wasShown: true },
        });
        notificationAudio.play();
        setTimeout(() => setShowPopover(false), 2000);
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
      <Popover isOpen={showPopover} closeOnBlur={false}>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            {notificationData && (
              <NotificationSingle notification={notificationData} />
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
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
          aria-label="ChatBot Button"
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
          aria-label="Chat Button"
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
          aria-label="Teams Button"
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
