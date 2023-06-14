import { useState, useEffect } from "react";
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
import { PhotoUploader } from "../UserPhotoUploader/UsersPhotoUploader";
import { onValue, ref as refDB } from "firebase/database";
import { database } from "../../config/firebaseConfig";
import { useCurrentUser } from "../../AuthUtils";

const ProfileInfo: React.FC = () => {
  const { user } = useCurrentUser();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const handleCloseModal = () => {
    setIsUploadOpen(false);
  };

  useEffect(() => {
    if (user) {
      const userRef = refDB(database, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const user = snapshot.val();
        setPhotoUrl(user.photoURL);
      });
    }
  }, [user]);

  const handleAvatarClick = () => {
    setIsUploadOpen(true);
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
