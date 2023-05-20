import { signInWithPopup } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { database, facebookProvider } from "../../config/firebaseConfig";
import { auth } from "../../common/constants";
export const signInWithGithub = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        if (user) {
            const userData = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
            };
            await set(ref(database, `users/${user.uid}`), userData);
        }
    } catch (error) {
        console.error("Error signing in with Github: ", error);
    }
}