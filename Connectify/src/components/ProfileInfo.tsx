import React from "react";
import { useGetUserByIdQuery } from "../api/databaseApi";
import { getAuth } from "@firebase/auth";

const ProfileInfo: React.FC = () => {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByIdQuery(currUser && currUser.uid);
  return (
    <div>
      {user && (
        <>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <h3>{user.email}</h3>
          <h4>Username: {user.username}</h4>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
