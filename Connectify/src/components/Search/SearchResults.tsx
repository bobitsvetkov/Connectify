import { User } from "../../types/interfaces";
import SingleUser from "../LeftList/SingleUser";
import { Stack, StackDivider, Button, HStack, Spacer, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useGetTeamsQuery, useGetUserByIdQuery, useAddUserToTeamMutation } from "../../api/databaseApi";
import { getAuth } from "firebase/auth";

interface SearchResultsProps {
  results: User[];
  searchQuery: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results, searchQuery }) => {
  const { data: teams, isLoading: areTeamsLoading, isError: isError } = useGetTeamsQuery();
  const [addUserToTeam, { isLoading: isAddingUser }] = useAddUserToTeamMutation();
  const auth = getAuth();
  const curr = auth.currentUser;
  const { data: currUser, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(curr && curr.uid);

  const handleAddToTeam = (userId: string, teamId: string) => {
    if (!isAddingUser) {
      addUserToTeam({ teamId, userId });
    }
  };

  if (!results) return null;

  return (
    <Stack
      spacing="0"
      pr="1"
      divider={<StackDivider w="100%" alignSelf="flex-end" />}
      backgroundColor="pink.100"
    >
      {Object.values(results)
        .filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((user) => (
          <HStack key={user.uid}>
            <SingleUser userUid={user.uid} />
            <Spacer />
            <Menu>
              <MenuButton as={Button}>
                Add
              </MenuButton>
              <MenuList>
                {teams && Object.values(teams).filter(team => team.owner === currUser?.uid).map((team) => (
                  <MenuItem onClick={() => handleAddToTeam(user.uid, team.uid)}>{team.name}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>
        ))}
    </Stack>
  );
};
