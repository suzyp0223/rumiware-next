import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
