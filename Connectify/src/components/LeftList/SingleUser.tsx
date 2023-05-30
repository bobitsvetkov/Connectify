import { Box, Avatar, HStack, VStack, Text } from "@chakra-ui/react";
import { User } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../features/ActiveUserSlice";
import { useGetUserByIdQuery } from "../../api/databaseApi";
interface SingleUserProps {
  userUid: string;
}

const SingleUser: React.FC<SingleUserProps> = ({ userUid }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: user, isLoading: isUserLoading, isError: isError } = useGetUserByIdQuery(userUid);

  // const hasPhotoURL = user.photoURL && user.photoURL !== "";
  if (isUserLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Error loading user</div>;

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
          <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} src={user.photoURL} />
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
