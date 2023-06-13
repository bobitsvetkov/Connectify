import { useState } from 'react';
import { auth } from '../../../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useToastHandler from '../../../components/Toast/toastHandler';
import { useNavigate } from 'react-router-dom';
import { SignInData } from '../../../types/interfaces';
import useFirebaseHandler from '../Firebase Auth Hook/useFirebaseAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/AuthSlice';
import { User } from '../../../api/databaseApi';

const useSignIn = () => {
    const { getUserData } = useFirebaseHandler();
    const dispatch = useDispatch();
    const [user, setSignInData] = useState<SignInData>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState({ email: '', password: '' });
    const showToast = useToastHandler();
    const navigate = useNavigate();

    const handleUserChange = (name: keyof SignInData, value: string) => {
        setSignInData({
            ...user,
            [name]: value
        });
    };

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const fetchedUserData: User | null = await getUserData(userCredential.user.uid);
            if (fetchedUserData) {
                dispatch(setUser(fetchedUserData));
                navigate('/home');
                showToast("Signed in.", "You've successfully signed in!", "success");
            } else {
                setErrorMessage({ email: 'Unable to fetch user data.', password: '' });
            }
        } catch (error) {
            console.log(error);
            const errorCode = (error as any).code; // TypeScript workaround
            switch (errorCode) {
                case 'auth/user-not-found':
                    setErrorMessage({ email: 'User with this email not found.', password: '' });
                    break;
                case 'auth/wrong-password':
                    setErrorMessage({ email: '', password: 'Invalid password.' });
                    break;
                case 'auth/invalid-email':
                    setErrorMessage({ email: 'The email address is invalid.', password: '' });
                    break;
                default:
                    setErrorMessage({ email: 'An unknown error occurred.', password: 'An unknown error occurred.' });
                    break;
            }
        }
    };

    return { user, errorMessage, handleUserChange, handleSignIn };
};

export default useSignIn;