import { createSlice } from '@reduxjs/toolkit';


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  photoURL: string;
}

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as User[],
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    }
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
