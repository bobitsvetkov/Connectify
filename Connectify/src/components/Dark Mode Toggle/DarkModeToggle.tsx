import {
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize={["sm", "md", "lg", "xl"]}
      p={[2, 4, 6, 6]}
      aria-label={`Switch to ${useColorModeValue("dark", "light")} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};

export default ColorModeSwitcher;
