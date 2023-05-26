import { useState } from "react";
import { useGetUsersQuery } from "../api/UsersApi";
import { selectUser } from "../features/ActiveUserSlice";
import { useDispatch } from "react-redux";
import { User } from "../api/UsersApi";
import { UserListProps } from "../types/interfaces";

const UserList: React.FC<UserListProps> = ({ setUserListOpen }) => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
    setUserListOpen(false);
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !users) {
    return <div>Error loading users</div>;
  }

  return (
    <div
      className={`user-list ${isOpen ? "open" : "closed"}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {isOpen && (
        <>
          <h2>Users</h2>
          <ul>
            {Object.values(users).map((user: User, index: number) => (
              <li
                key={index}
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer" }}
              >
                {user.email}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserList;
