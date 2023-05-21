import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const UserList = () => {
  const users = useSelector((state: RootState) => state.users);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {Object.entries(users).map(([id, user]) => (
          <li key={id}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
