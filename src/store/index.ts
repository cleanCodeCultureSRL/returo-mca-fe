import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import mapSlice from "./slices/mapSlice";
import walletSlice from "./slices/walletSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    map: mapSlice,
    wallet: walletSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
