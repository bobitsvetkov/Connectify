import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/databaseApi";
import { RootState } from "../store";

interface AuthState {
    user: User | null | undefined;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null | undefined>) => {
            state.user = action.payload;
        },
    },
});
export const selectIsLoggedIn = (state: RootState) => state.auth.user !== null && state.auth.user !== undefined;

export const { setUser } = authSlice.actions;

export default authSlice.reducer;