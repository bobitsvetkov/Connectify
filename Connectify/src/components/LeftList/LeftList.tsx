import { Box } from "@chakra-ui/react";
import { SearchResults } from "../Search/SearchResults";
import { User } from "../../types/interfaces";

interface LeftListProps {
  results: User[];
  searchQuery: string;
  // onUserClick: (user: SearchResult) => void;
}

const LeftList: React.FC<LeftListProps> = ({
  results,
  searchQuery,
}) => {
  return (
    <Box>
      <SearchResults
        results={results}
        searchQuery={searchQuery}
        // onUserClick={onUserClick}
      />
    </Box>
  );
};
export default LeftList;
