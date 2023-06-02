import { useState, useEffect } from "react";
import { useGetUserByIdQuery } from "../api/databaseApi";
import { getAuth } from "@firebase/auth";
import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import { PhotoUploader } from "./UserPhotoUploader/UsersPhotoUploader";
import { onValue, ref as refDB } from "firebase/database";
import { database } from "../config/firebaseConfig";

const ProfileInfo: React.FC = ({ status }) => {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleAvatarClick = () => {
    setIsUploadOpen(true);
  };

  useEffect(() => {
    if (currUser) {
      const userRef = refDB(database, `users/${currUser.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setPhotoUrl(data.photoURL);
      });
    }
  }, [currUser]);

  const handleCloseModal = () => {
    setIsUploadOpen(false);
  };

  return (
    <Flex direction="column" align="center">
      <div>
        {user && (
          <>
            <Flex justify="center">
              <Box
                position="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={handleAvatarClick}
              >
                <Avatar
                  size={"lg"}
                  name={`${user.firstName} ${user.lastName}`}
                  src={photoUrl}
                />
                {isHovering && (
                  <Flex
                    align="center"
                    justify="center"
                    position="absolute"
                    bottom={0}
                    right={0}
                    w="100%"
                    h="100%"
                  >
                    <Icon as={FaCamera} boxSize={6} color="white" />
                  </Flex>
                )}
              </Box>
            </Flex>
            <Text align="center" fontSize="sm" fontWeight="bold" mt={4}>
              {user.firstName} {user.lastName}
            </Text>
            <Text align="center" fontSize={"xs"}>
              {user.email}
            </Text>
            <Text align="center" fontSize={"xs"}>
              @{user.username}
            </Text>
            <Modal isOpen={isUploadOpen} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Upload Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <PhotoUploader />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
      </div>
    </Flex>
  );
};

export default ProfileInfo;
