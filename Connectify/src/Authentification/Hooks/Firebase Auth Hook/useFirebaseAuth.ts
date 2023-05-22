import { ref, set, get } from 'firebase/database';
import { auth } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SignupData } from '../../../types/interfaces';
import { database } from '../../../config/firebaseConfig';
const useFirebaseHandler = () => {
    const checkUsernameExists = async (username: string) => {
        const usernameRef = ref(database, `usernames/${username}`);
        const usernameSnap = await get(usernameRef);
        return usernameSnap.exists();
    };

    const createUser = async (signupData: SignupData) => {
        const { email, password, username, phoneNumber, photoURL, firstName, lastName } = signupData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(database, `users/${userCredential.user.uid}`), { username, email, phoneNumber, photoURL, firstName, lastName });
        return userCredential.user.uid;
    };

    return { checkUsernameExists, createUser };
};

export default useFirebaseHandler;