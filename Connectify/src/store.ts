import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/UsersApi";
import { chatsApi } from "./api/ChatsApi"; // import chatsApi
import activeUserReducer from "./features/ActiveUserSlice";
import { teamsApi } from "./api/TeamsApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    activeUser: activeUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(chatsApi.middleware)
      .concat(teamsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
