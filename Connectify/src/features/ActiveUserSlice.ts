
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/databaseApi';
interface ActiveUserState {
  user: User | null;
}

const initialState: ActiveUserState = {
  user: null,
};

export const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { selectUser } = activeUserSlice.actions;

export default activeUserSlice.reducer;
