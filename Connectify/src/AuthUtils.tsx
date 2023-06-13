import { getAuth } from "@firebase/auth";
import { useGetUserByIdQuery } from "./api/databaseApi";

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};

export const useCurrentUser = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return { user: null, isUserLoading: false, isUserError: false };
  }

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currentUser && currentUser.uid);

  return { user, isUserLoading, isUserError };
};
