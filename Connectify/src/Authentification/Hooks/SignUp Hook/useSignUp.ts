import { useState } from 'react';
import { auth, database } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, } from 'firebase/database';

interface User {
    username: string;
    email: string;
    photoURL: string;
    phoneNumber: string;
}

interface SignupData extends User {
    password: string;
}

const useSignUp = () => {
    const [signupData, setSignupData] = useState<SignupData>({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        photoURL: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSignupDataChange = (name: keyof SignupData, value: string) => {
        setSignupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, email, password, phoneNumber, photoURL } = signupData;

        if (username.length < 5 || username.length > 35) {
            setErrorMessage('Username must be between 5 and 35 characters.');
            return;
        }

        const usernameRef = ref(database, `usernames/${username}`);
        const usernameSnap = await get(usernameRef);
        if (usernameSnap.exists()) {
            setErrorMessage('This username is already taken.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await set(usernameRef, { exists: true });
            await set(ref(database, `users/${userCredential.user.uid}`), { username, email, phoneNumber, photoURL });
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred.");
            }
        }
    };

    return { signupData, errorMessage, handleSignupDataChange, handleSignUp };
};

export default useSignUp;