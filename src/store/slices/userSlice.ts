// 프로필, 장바구니, 찜목록 등 유저 데이터 관리

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, FieldValue, Timestamp } from "firebase/firestore";
import { auth, db } from "@/firebases/firebase";

// 타입 정의
interface PhoneUser {
  uid: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt: FieldValue | Timestamp | null;
}

interface EmailUser extends PhoneUser {
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  nationality: string;
}

type UserState = PhoneUser | EmailUser;

interface State {
  user: UserState | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

// 초기 상태
const initialState: State = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// 🔐 회원가입 (Firebase + Firestore 저장)
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (
    {
      email,
      password,
      name,
      birthDate,
      gender,
      nationality,
      phoneNumber,
    }: {
      email: string;
      password: string;
      name: string;
      birthDate: string;
      gender: string;
      nationality: string;
      phoneNumber: string;
    },
    thunkAPI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData: UserState = {
        uid: user.uid,
        email: user.email ?? "",
        name,
        birthDate,
        gender,
        nationality,
        phoneNumber,
        isAdmin: false,
        createdAt: serverTimestamp(),
      };

      console.log("📤파이어베이스에 저장 시작");
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
      });
      console.log("✅파이어베이스에 저장 완료...");

      return userData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Firestore 저장 실패:", error.message);
        return thunkAPI.rejectWithValue(error.message);
      } else {
        console.error("❌ Firestore 저장 실패: 알 수 없는 에러");
        return thunkAPI.rejectWithValue("알 수 없는 에러");
      }
    }
  }
);

// Slice 생성
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션과 리듀서 내보내기
export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
