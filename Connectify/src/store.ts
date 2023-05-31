import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/databaseApi"; // import baseApi instead of individual APIs
import activeUserReducer from "./features/ActiveUserSlice";
import authReducer from "./features/AuthSlice";
import { chatsApi, teamsApi, usersApi } from "./api/databaseApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    activeUser: activeUserReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectActiveUser = (state: RootState) => state.activeUser.user;
