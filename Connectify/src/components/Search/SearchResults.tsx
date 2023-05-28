import { User } from "../../types/interfaces";
import SingleUser from "../LeftList/SingleUser";
import { Stack, StackDivider } from "@chakra-ui/react";

interface SearchResultsProps {
  results: User[];
  searchQuery: string;
  //   onUserClick: (user: SearchResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchQuery,
  //   onUserClick,
}) => {
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
          <SingleUser
            key={user.uid}
            user={user}
            // onClick={() => onUserClick(user)}
          />
        ))}
    </Stack>
  );
};
