import React from "react";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { getAuth } from "@firebase/auth";

interface AvatarButtonProps {
  onClick?: () => void;
  status: string;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ onClick, status }) => {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const { data: user } = useGetUserByIdQuery(currUser && currUser.uid);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "green.400";
      case "Offline":
        return "gray.500";
      case "Away":
        return "yellow.400";
      case "In a meeting":
        return "purple.300";
      case "Busy":
        return "red.600";
      default:
        return "blue.500";
    }
  };

  return (
    <>
      {user && (
        <Avatar
          size="sm"
          name={`${user.firstName} ${user.lastName}`}
          src={user.photoURL || auth.currentUser?.photoURL}
          onClick={onClick}
        >
          <AvatarBadge
            boxSize="1.25em"
            bg={getStatusColor(status)}
            border="2px"
            borderColor="white"
          />
        </Avatar>
      )}
    </>
  );
};

export default AvatarButton;
