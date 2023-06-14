import { useEffect, useState } from "react";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { getAuth } from "@firebase/auth";
import { onValue, ref as refDB } from "firebase/database";
import { database } from "../../config/firebaseConfig";

interface AvatarButtonProps {
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  status: string;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ onClick, status }) => {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const user = currUser ? useGetUserByIdQuery(currUser.uid) : null;

  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (currUser) {
      const userRef = refDB(database, `users/${currUser?.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setPhotoUrl(data.photoURL);
      });
    }
  }, [currUser]);
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
      {user?.data && (
        <Avatar
          size="sm"
          name={`${user.data.firstName} ${user.data.lastName}`}
          src={photoUrl}
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
