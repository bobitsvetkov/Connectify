import { useState } from 'react';
import { auth, database } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, get, } from 'firebase/database';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    username: string;  // nickname
    phoneNumber: string;
    photoURL: string;
}

interface SignupData extends User { }


const useSignUp = () => {
    const [step, setStep] = useState(1);
    const [signupData, setSignupData] = useState<SignupData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        phoneNumber: '',
        photoURL: '',
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSignupDataChange = (name: keyof User, value: string) => {
        setSignupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Handle sign up start", step); // Add console log

        // Declare these variables at the beginning of the function
        const { firstName, lastName, email, password, confirmPassword, username, phoneNumber, photoURL } = signupData;

        if (step === 1) {
            console.log("Handle sign up step 1", { firstName, lastName, email, password, confirmPassword });

            if (firstName === "" || lastName === "" || email === "" || password === "" || confirmPassword === "") {
                console.log('One of the fields is empty', { firstName, lastName, email, password, confirmPassword });
                setErrorMessage("Please fill all the fields");
                return;
            }

            if (password !== confirmPassword) {
                console.log('Passwords do not match', { password, confirmPassword });
                setErrorMessage('The passwords do not match.');
                return;
            }

            console.log("Handle sign up step 1 passed", { firstName, lastName, email, password, confirmPassword }); // Add console log

            // If all validations pass, go to next step
            setStep(2);
            console.log("Handle sign up step updated to", step); // Add console log
        } else {
            // Now you can use username, phoneNumber, and photoURL in this branch

            if (username === "" || phoneNumber === "") {
                setErrorMessage("Please fill all the fields");
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
                await set(ref(database, `users/${userCredential.user.uid}`),
                    { username, email, phoneNumber, photoURL, firstName, lastName });
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unknown error occurred.");
                }
            }
        }
    };

    return { signupData, errorMessage, handleSignupDataChange, handleSignUp, step, setStep };
};

export default useSignUp;