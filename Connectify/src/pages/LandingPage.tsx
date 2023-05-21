import React from "react";
import {
    Box,
    Text,
    Flex,
    useColorModeValue,
    VStack,
    Grid,
} from "@chakra-ui/react";
import ColorModeSwitcher from "../components/Dark Mode Toggle/DarkModeToggle";
import { MotionBox } from "../components/SignIn/SignInForm";
import { SignInForm } from "../components/SignIn/SignInForm";
export default function SignInPage() {
    const bgImage = useColorModeValue(
        'https://images.unsplash.com/photo-1527181152855-fc03fc7949c8',
        'https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831'
    );

    return (
        <Grid templateColumns="repeat(6, 1fr)" gap={6} h="100vh" width="100vw">
            <Flex alignItems="center" justifyContent="flex-end" gridColumn="span 3" mr={8}>
                <VStack p={8} maxWidth="500px" width="full" spacing={6} boxShadow="lg" rounded="lg" bg={useColorModeValue('white', 'gray.800')}>
                    <Flex justifyContent="flex-end" width="100%">
                        <ColorModeSwitcher />
                    </Flex>
                    <Box textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold">Welcome back</Text>
                        <Text>Let's get started! Please enter your details.</Text>
                    </Box>
                    <Box w="100%">
                        <SignInForm />
                    </Box>
                </VStack>
            </Flex>
            <MotionBox
                key={bgImage}
                bgImage={`url(${bgImage})`}
                bgPos="center"
                bgSize="cover"
                gridColumn="span 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
        </Grid>
    );
}