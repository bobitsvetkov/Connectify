import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchInputProps } from "../../types/interfaces";

const SearchInput: React.FC<SearchInputProps> = ({ size }) => {
  return (
    <InputGroup size={size}>
      <Input placeholder="Search" />
      <InputRightElement>
        <SearchIcon color="gray.500" />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
