import { useState, useEffect, ChangeEvent, ReactElement } from "react";
import {
  sendEmailVerification,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import {
  useColorModeValue,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useGetUserByIdQuery } from "../../api/UsersApi";
import { PhotoUploader } from "../UserPhotoUploader/UsersPhotoUploader";

export const UserSetting: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] =
    useState<string>("");
  const [currentPasswordForPassword, setCurrentPasswordForPassword] =
    useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [updatingEmail, setUpdatingEmail] = useState<boolean>(false);
  const [updatingPassword, setUpdatingPassword] = useState<boolean>(false);

  const { data: currentUser, isSuccess } = useGetUserByIdQuery(
    auth.currentUser?.uid || ""
  );

  useEffect(() => {
    if (isSuccess && currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
    }
  }, [currentUser, isSuccess]);

  const handleUpdateEmail = () => {
    const credential = EmailAuthProvider.credential(
      email,
      currentPasswordForEmail
    );

    setUpdatingEmail(true);

    reauthenticateWithCredential(auth.currentUser as FirebaseUser, credential)
      .then(() => {
        updateEmail(auth.currentUser as FirebaseUser, newEmail)
          .then(() => {
            console.log("Email updated!");
            setEmail(newEmail);
            setNewEmail("");
            sendEmailVerification(auth.currentUser as FirebaseUser)
              .then(() => {
                console.log("Email verification sent!");
              })
              .catch((error) => {
                console.error(error);
              });
            setUpdatingEmail(false);
          })
          .catch((error) => {
            console.error(error);
            setUpdatingEmail(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setUpdatingEmail(false);
      });
  };

  const handleUpdatePassword = () => {
    setUpdatingPassword(true);

    updatePassword(auth.currentUser as FirebaseUser, newPassword)
      .then(() => {
        console.log("Password updated!");
        setNewPassword("");
        setUpdatingPassword(false);
      })
      .catch((error) => {
        console.error(error);
        setUpdatingPassword(false);
      });
  };

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };
  return (
    <Box
      className="container"
      bg={useColorModeValue("gray.100", "gray.900")}
      p={5}
      borderRadius="lg"
    >
      {currentUser ? (
        <VStack align="start">
          <Heading>
            Welcome, {firstName} {lastName}
          </Heading>
          <p>Email: {email}</p>
          <PhotoUploader />
          <FormControl id="newEmail" mt={4}>
            <FormLabel>New Email</FormLabel>
            <Input
              type="text"
              placeholder="New email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="currentPasswordForEmail" mt={4}>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              placeholder="Current password"
              value={currentPasswordForEmail}
              onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            mt={4}
            onClick={handleUpdateEmail}
            width="200px"
          >
            Update Email
          </Button>
          <FormControl id="newPassword" mt={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="currentPasswordForPassword" mt={4}>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              placeholder="Current password"
              value={currentPasswordForPassword}
              onChange={(e) => setCurrentPasswordForPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="blue"
            mt={4}
            onClick={handleUpdatePassword}
            width="200px"
          >
            Update Password
          </Button>
          <Button
            colorScheme="red"
            mt={4}
            onClick={handleResetPassword}
            width="200px"
          >
            Reset Password
          </Button>
        </VStack>
      ) : (
        <Heading>Please sign in.</Heading>
      )}
    </Box>
  );
};
