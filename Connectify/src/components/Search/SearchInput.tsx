import {
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  HStack,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchInputProps } from "../../types/interfaces";
import { useState } from "react";
import { useGetUserSearchByUsernameQuery } from "../../api/UsersApi";

const SearchInput: React.FC<SearchInputProps> = ({ size, ...props }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } =
    useGetUserSearchByUsernameQuery(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <HStack
      spacing={2}
      px="4"
      py="2"
      borderBottom="1px"
      borderColor="#e2e8f0"
      {...props}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          _placeholder={{
            opacity: 0.6,
            color: "#3b4a54",
            paddingLeft: "24px",
            fontSize: "15px",
          }}
          h="36px"
          _hover={{ bg: "#f0f2f5" }}
          bg="#f0f2f5"
          variant="filled"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={handleInputChange}
        />
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
    </HStack>
  );
};

export default SearchInput;
