import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/UsersApi";
import chatReducer from "./features/ChatSlice";
import activeUserReducer from "./features/ActiveUserSlice";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    chat: chatReducer,
    activeUser: activeUserReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
