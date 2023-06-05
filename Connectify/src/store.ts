import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/databaseApi"; // import baseApi instead of individual APIs
import activeUserReducer from "./features/ActiveUserSlice";
import authReducer from "./features/AuthSlice";
import { chatsApi, teamsApi, usersApi } from "./api/databaseApi";
import { openaiApi } from "./api/openAiApi";


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [openaiApi.reducerPath]: openaiApi.reducer, 
    activeUser: activeUserReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(openaiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectActiveUser = (state: RootState) => state.activeUser.user;
