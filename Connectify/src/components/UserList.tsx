import { useGetUsersQuery } from "../api/UsersApi";
import { User } from "../types/interfaces";
const UserList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !users) {
    return <div>Error loading users</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {Object.values(users).map((user: User, index: number) => (
          <li key={index}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
