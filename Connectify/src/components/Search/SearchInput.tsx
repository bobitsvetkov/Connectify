import { Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchInputProps } from "../../types/interfaces";
import { useState } from "react";
import { useGetUsersQuery } from "../../api/UsersApi";

const SearchInput: React.FC<SearchInputProps> = ({
  size,
  onSearch,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useGetUsersQuery();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value) {
      const filteredData = Object.values(data ?? {}).filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(event.target.value.toLowerCase()) ||
          user.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
      onSearch(filteredData);
    } else {
      onSearch(null);
    }
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
    </HStack>
  );
};
export default SearchInput;
