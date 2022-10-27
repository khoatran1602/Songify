import { configureStore } from "@reduxjs/toolkit";
import { ShazamApi } from "./songApi.slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import playerReducer from "./playerSlice";
import userReducer from "./user.slice";
import { userAPI } from "./userapi.slice";

export const store = configureStore({
  reducer: {
    [ShazamApi.reducerPath]: ShazamApi.reducer,
    player: playerReducer,
    user: userReducer,
		[userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ShazamApi.middleware, userAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
