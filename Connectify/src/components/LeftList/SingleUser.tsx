import { Box, Avatar, HStack, VStack, Text } from "@chakra-ui/react";
import { User } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../features/ActiveUserSlice";
interface SingleUserProps {
  user: User;
}

const SingleUser: React.FC<SingleUserProps> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasPhotoURL = user.photoURL && user.photoURL !== "";

  const onUserClick = (user: User) => {
    dispatch(selectUser(user));
    navigate(`/chat/${user.username}`);
  }

  return (
    <Box
      key={user.uid}
      p={1}
      mb={1}
      _hover={{
        backgroundColor: "#f5f6f6",
        cursor: "pointer",
      }}
      onClick={() => onUserClick(user)}
    >
      <HStack spacing={2} align="start">
        {hasPhotoURL ? (
          <Avatar size="sm" src={user.photoURL} />
        ) : (
          <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
        )}
        <VStack spacing={0} align="start">
          <Text>
            {user.firstName} {user.lastName}
          </Text>
          <Text fontSize="11px">{user.email}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default SingleUser;
