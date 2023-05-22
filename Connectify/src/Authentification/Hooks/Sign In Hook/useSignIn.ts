import { useState } from 'react';
import { auth, database } from '../../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useToastHandler from '../../../components/Toast/toastHandler';
import { useNavigate } from 'react-router-dom';
import { SignInData } from '../../../types/interfaces';

const useSignIn = () => {
    const [user, setUser] = useState<SignInData>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const showToast = useToastHandler();
    const navigate = useNavigate();

    const handleUserChange = (name: keyof SignInData, value: string) => {  
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

            showToast("Signed in.", "You've successfully signed in!", "success");
        } catch (error) {
            console.log(error);
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