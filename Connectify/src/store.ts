import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/UsersApi";
import { chatsApi } from "./api/ChatsApi"; // import chatsApi
import activeUserReducer from "./features/ActiveUserSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    activeUser: activeUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(chatsApi.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
