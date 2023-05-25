import { Input, InputGroup, InputRightElement, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchInputProps } from "../../types/interfaces";
import { useState } from "react";
import { useGetUserSearchByUsernameQuery } from "../../api/UsersApi";

const SearchInput: React.FC<SearchInputProps> = ({ size }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } =
    useGetUserSearchByUsernameQuery(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <InputGroup size={size}>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <InputRightElement>
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>
      {isLoading && <div>Loading...</div>}
      {data && searchQuery.trim() !== "" && (
        <div>
          {Object.values(data)
            .filter((user) =>
              user.username.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user) => (
              <Box
                key={user.uid}
                border="1px solid gray"
                borderRadius="md"
                p={2}
                mb={2}
              >
                <p>Username: {user.username}</p>
              </Box>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
