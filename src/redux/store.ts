import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from "./userSlice";
import appStateReducer from "./appStateSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const RootReducer  = combineReducers({
    appState: appStateReducer,
    user: userReducer
  });

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;