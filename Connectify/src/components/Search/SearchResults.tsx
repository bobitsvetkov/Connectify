import SingleUser from "../LeftList/SingleUser";
import {
  Stack,
  StackDivider,
  Button,
  HStack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  useGetUserByIdQuery,
  useAddUserToTeamMutation,
} from "../../api/databaseApi";
import { getAuth } from "firebase/auth";
import { onValue, ref, off, DataSnapshot } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../config/firebaseConfig";
import { Team } from "../../types/interfaces";
import { SearchResultsProps } from "../../types/interfaces";

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchQuery,
}) => {
  const [addUserToTeam, { isLoading: isAddingUser }] =
    useAddUserToTeamMutation();
  const auth = getAuth();
  const curr = auth.currentUser;
  const { data: currUser } = useGetUserByIdQuery(curr?.uid ?? "");
  const [teams, setTeams] = useState({});

  useEffect(() => {
    const teamsRef = ref(database, `teams/`);
    const handleValueChange = (snapshot: DataSnapshot) => {
      setTeams(snapshot.val());
    };

    onValue(teamsRef, handleValueChange);

    return () => {
      off(teamsRef, "value", handleValueChange);
    };
  }, []);

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
      overflowY="auto"
      bg={useColorModeValue("#EDF3F5", "	#3C4256")}
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
              <MenuButton variant="ghost" as={Button}>
                Add
              </MenuButton>
              <MenuList>
                {teams &&
                  (Object.values(teams) as Team[])
                    .filter((team) => team.owner === currUser?.uid)
                    .map((team) => (
                      <MenuItem
                        onClick={() => handleAddToTeam(user.uid, team.uid)}
                      >
                        {team.name}
                      </MenuItem>
                    ))}
              </MenuList>
            </Menu>
          </HStack>
        ))}
    </Stack>
  );
};
