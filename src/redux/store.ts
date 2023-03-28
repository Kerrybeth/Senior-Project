import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./appStateSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    user: userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;