import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/interfaces';


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
