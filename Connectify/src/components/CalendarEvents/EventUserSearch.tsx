import { getAuth } from "firebase/auth";
import { useGetUserByIdQuery } from "../../api/databaseApi";
import { HStack, Stack, Spacer, StackDivider } from "@chakra-ui/react";
import SingleUser from "../LeftList/SingleUser";
import { useCurrentUser } from "../../AuthUtils";
export const EventUserSearch = ({ results, searchQuery, onSelectUser }) => {
  const { user, isUserLoading, isUserError } = useCurrentUser();

  return (
    <>
      <Stack
        spacing="0"
        pr="1"
        divider={<StackDivider w="100%" alignSelf="flex-end" />}
        overflowY="auto"
        maxHeight="100px"
      >
        {results &&
          Object.values(results)
            .filter(
              (user) =>
                user.firstName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                user.lastName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user) => (
              <HStack key={user.uid} onClick={() => onSelectUser(user)}>
                <SingleUser userUid={user.uid} />
                <Spacer />
              </HStack>
            ))}
      </Stack>
    </>
  );
};

export default EventUserSearch;
