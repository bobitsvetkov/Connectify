import { useState } from 'react';
import { auth, database } from '../../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface User {
    email: string;
    password: string;
}

const useSignIn = () => {
    const [user, setUser] = useState<User>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            alert("User is signed in successfully.");
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