// 로그인 상태 및 로그인 유저 관리
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  displayName?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUser(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
});

export const { setUser, setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
