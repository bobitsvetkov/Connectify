import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/interfaces";

const usersSlice = createSlice({
  name: "users",
  initialState: [] as User[],
  reducers: {
    setUsers: (_, action) => {
      return action.payload;
    },
    setStatus: (
      state,
      action: PayloadAction<{ uid: string; status: string }>
    ) => {
      const { uid, status } = action.payload;
      const user = state.find((user) => user.uid === uid);
      if (user) {
        user.status = status;
      }
    },
  },
});

export const { setUsers, setStatus } = usersSlice.actions;
export default usersSlice.reducer;
