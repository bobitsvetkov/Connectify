import { IconButton, useColorMode, useColorModeValue, Box } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = () => {
    const { toggleColorMode } = useColorMode();
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <Box textAlign="right" mb={4}>
            <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${useColorModeValue('dark', 'light')} mode`}
                variant="ghost"
                color="current"
                marginLeft="2"
                onClick={toggleColorMode}
                icon={<SwitchIcon />}
            />
        </Box>
    );
};

export default ColorModeSwitcher;