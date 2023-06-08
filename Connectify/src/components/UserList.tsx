import { useState } from "react";
import { useGetUsersQuery, User } from "../api/databaseApi";
import { selectUser } from "../features/ActiveUserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserListProps } from "../types/interfaces";

const UserList: React.FC<UserListProps> = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
    // setIsOpen(false);
    navigate(`/chat/${user.username}`);
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
