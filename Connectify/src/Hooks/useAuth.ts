import { useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { User as FirebaseUser } from 'firebase/auth';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { loading, currentUser };
}
