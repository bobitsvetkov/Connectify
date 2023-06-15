import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  Box,
  Center,
  Image,
} from "@chakra-ui/react";
import { getAuth } from "@firebase/auth";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { useCreateTeamMutation } from "../../api/databaseApi";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { database } from "../../config/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { storage } from "../../config/firebaseConfig";
import {
  ref as refSt,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
}) => {
  const auth = getAuth();
  const currUser = auth.currentUser;
  if (!currUser) {
    throw new Error("Current user is null");
  }
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);
  const [createTeam] = useCreateTeamMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const teamName = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedImageURL, setUploadedImageURL] = useState<string | null>(null);
  if (isUserLoading) return <Text>Loading...</Text>;
  if (isUserError) return <Text>An error has occurred.</Text>;
  const placeholderText = user?.username
    ? `${user.username}'s Team`
    : "Enter team name";

  const handleCreate = () => {
    if (!user || !teamName.current) return;
    const teamNameValue = teamName.current.value;
    if (teamNameValue.length < 3 || teamNameValue.length > 40) {
      setErrorMessage("Team name must be between 3 and 40 characters.");
      return;
    }

    const teamsRef = ref(database, "teams");
    let isUnique = true;
    onValue(teamsRef, (snapshot) => {
      const data = snapshot.val();
      for (let teamId in data) {
        if (data[teamId].name === teamNameValue) {
          isUnique = false;
          break;
        }
      }
    });

    if (!isUnique) {
      setErrorMessage(
        "A team with this name already exists. Please choose a different name."
      );
      return;
    }

    if (selectedImage) {
      const storageRef = refSt(storage, `teamIcons/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            const newTeam = {
              name: teamNameValue,
              owner: user.uid,
              uid: uuidv4(),
              participants: { [user.uid]: true },
              messages: {},
              photoUrl: downloadURL,
            };

            createTeam(newTeam);
            setUploadedImageURL(null);
            setSelectedImage(null);
            if (teamName.current) {
              teamName.current.value = "";
            }
            onClose();
          });
        }
      );
    } else {
      const newTeam = {
        name: teamNameValue,
        owner: user.uid,
        uid: uuidv4(),
        participants: { [user.uid]: true },
        messages: {},
        photoUrl: "",
      };

      createTeam(newTeam);
      setUploadedImageURL(null);
      setSelectedImage(null);
      teamName.current.value = "";
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf={"center"}>Create new team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Create a new team and customize it with a name and an icon!
          </Text>
          <Center>
            <Box
              as="label"
              htmlFor="team-icon-upload"
              cursor="pointer"
              bg="#f57c73"
              color="white"
              p={2}
              borderRadius="md"
            >
              Upload Team Icon
            </Box>

            <Input
              id="team-icon-upload"
              type="file"
              hidden
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedImage(e.target.files[0]);
                  setUploadedImageURL(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </Center>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            {uploadedImageURL && (
              <Image
                borderRadius={"20px"}
                src={uploadedImageURL}
                alt="Uploaded Team Icon"
                boxSize="100px"
              />
            )}
          </Box>

          <Text mt={4}>Team Name</Text>
          <Input type="text" placeholder={placeholderText} ref={teamName} />
          {errorMessage && <Text color="red.400">{errorMessage}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button bg="#7072e7" mr={3} onClick={handleCreate}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTeamModal;
