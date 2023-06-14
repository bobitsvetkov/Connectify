import { getAuth } from "@firebase/auth";
import { useGetUserByIdQuery } from "./api/databaseApi";


export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};

export const useCurrentUser = () => {
  const currentUser = getCurrentUser();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = currentUser
      ? useGetUserByIdQuery(currentUser.uid)
      : { data: null, isLoading: false, isError: false };

  return { user, isUserLoading, isUserError };
};