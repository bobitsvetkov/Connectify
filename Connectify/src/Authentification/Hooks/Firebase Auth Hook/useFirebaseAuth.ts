import { ref, set, get } from 'firebase/database';
import { auth } from '../../../config/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SignUpData, User } from '../../../types/interfaces';
import { database } from '../../../config/firebaseConfig';

const useFirebaseHandler = () => {
    const checkUsernameExists = async (username: string) => {
        const usernameRef = ref(database, `usernames/${username}`);
        const usernameSnap = await get(usernameRef);
        const exists = usernameSnap.exists();

        console.log(`Checking if username "${username}" exists: ${exists}`);

        return exists;
    };


    const checkPhoneNumberExists = async (phoneNumber: string) => {
        const phoneNumberRef = ref(database, `phoneNumbers/${phoneNumber}`);
        const phoneNumberSnap = await get(phoneNumberRef);
        const exists = phoneNumberSnap.exists();

        console.log(`Checking if phone number "${phoneNumber}" exists: ${exists}`);

        return exists;
    };

    const createUser = async (signupData: SignUpData) => {
        const { email, password, username, phoneNumber, photoURL, firstName, lastName } = signupData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(database, `users/${userCredential.user.uid}`), { username, email, phoneNumber, photoURL, firstName, lastName, uid:userCredential.user.uid });
        await set(ref(database, `usernames/${username}`), { exists: true });
        await set(ref(database, `phoneNumbers/${phoneNumber}`), { exists: true });
        return userCredential.user.uid;
    };
    

    const getUserData = async (uid: string): Promise<User | null> => {
        const userRef = ref(database, `users/${uid}`);
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const user: User = {
                uid: userData.uid,
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                phoneNumber: userData.phoneNumber,
                photoURL: userData.photoURL,
                status: userData.status,
                latestChats: userData.latestChats,
                events: userData.events,
                notifications: userData.notifications,
            };
            return user;
        }
        return null;
    };

    return { checkUsernameExists, createUser, getUserData, checkPhoneNumberExists };
};

export default useFirebaseHandler;