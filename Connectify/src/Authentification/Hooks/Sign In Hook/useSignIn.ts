import { useState } from 'react';
import { auth, database } from '../../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
    password: string;
}

const useSignIn = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const toast = useToast();
    const navigate = useNavigate();

    const handleUserChange = (name: keyof User, value: string) => {
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            navigate('/home');

            toast({
                title: "Signed in.",
                description: "You've successfully signed in!",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top", 
            });
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred.");
            }
        }
    };

    return { user, errorMessage, handleUserChange, handleSignIn };
};

export default useSignIn;