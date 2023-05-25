import React, { useEffect, useState } from "react";
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
import { ref as refDB, onValue } from "firebase/database";
import UserSettingsModal from "../UserSettings/UserSettingsModal";
import { database } from "../../config/firebaseConfig";
import { auth } from "../../config/firebaseConfig";

const AvatarButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    const userRef = refDB(database, `users/${auth.currentUser?.uid}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setFirstName(userData?.firstName);
      setLastName(userData?.lastName);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={
          <Avatar
            size="sm"
            name={`${firstName} ${lastName}`}
            src={auth.currentUser?.photoURL}
          />
        }
        variant="outline"
        borderColor="purple.800"
        bg="green.100"
        color="white"
      >
        {`${firstName} ${lastName}`}
      </MenuButton>
      <MenuList bg="white" color="black">
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem onClick={handleOpenModal}>Settings</MenuItem>
          <UserSettingsModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </MenuGroup>
        <MenuDivider />
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarButton;
