import { useGetUsersQuery } from "../api/UsersApi";
import { selectUser } from "../features/ActiveUserSlice";
import { useDispatch } from "react-redux";
import { User } from '../api/UsersApi';

const UserList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !users) {
    return <div>Error loading users</div>;
  }
  
  const handleUserClick = (user: User) => {
    dispatch(selectUser(user));
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {Object.values(users).map((user: User, index: number) => (
          <li key={index} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer'}} >
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
