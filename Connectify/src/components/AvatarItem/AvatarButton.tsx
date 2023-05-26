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

interface AvatarButtonProps {
  onClick?: () => void;
}

const AvatarButton: React.FC = ({ onClick }) => {
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
    <>
      <Avatar
        size="sm"
        name={`${firstName} ${lastName}`}
        src={auth.currentUser?.photoURL}
        onClick={onClick}
      />
    </>
  );
};

export default AvatarButton;
