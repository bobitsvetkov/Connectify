import { ref, set, get } from 'firebase/database';
import { auth } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SignUpData, User } from '../../../types/interfaces';
import { database } from '../../../config/firebaseConfig';

const useFirebaseHandler = () => {
    const checkUsernameExists = async (username: string) => {
        const usernameRef = ref(database, `usernames/${username}`);
        const usernameSnap = await get(usernameRef);
        return usernameSnap.exists();
    };

    const createUser = async (signupData: SignUpData) => {
        const { email, password, username, phoneNumber, photoURL, firstName, lastName } = signupData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(database, `users/${userCredential.user.uid}`), { username, email, phoneNumber, photoURL, firstName, lastName });
        return userCredential.user.uid;
    };

    const getUserData = async (uid: string): Promise<User | null> => {
        const userRef = ref(database, `users/${uid}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const user: User = {
                uid,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                phoneNumber: userData.phoneNumber,
                photoURL: userData.photoURL
            };
            return user;
        }
        return null;
    };

    return { checkUsernameExists, createUser, getUserData };
};

export default useFirebaseHandler;