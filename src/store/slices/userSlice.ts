// 프로필, 장바구니, 찜목록 등 유저 데이터 관리
// Redux Toolkit 기반으로 Firebase 이메일 회원가입 + Firestore 저장 + 전역 상태 관리를 위한 userSlice
/**
 * createUserWithEmailAndPassword로 Firebase Auth에 계정 생성 →
    Firestore users 컬렉션에 사용자 정보 저장 →
    Redux 상태에 저장하여 로그인 상태 유지
 */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, FieldValue, Timestamp } from "firebase/firestore";
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
  emailVerified: boolean;
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
  "user/signUpUser", // 액션 이름

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
      // 1) Firebase Auth 회원 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2) 유저 데이터 구성
      const userData: UserState = {
        uid: user.uid,
        email: email.replace(/\s/g, "").toLowerCase() ?? "", // **?? "" (null 병합 연산자)** 결과가 null 또는 undefined인 경우 빈 문자열로 대체
        name: name.replace(/\s/g, ""),
        birthDate,
        gender,
        nationality,
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        emailVerified: user.emailVerified,
        isAdmin: false,
        createdAt: serverTimestamp(),
      };

      // 3) Firestore 저장
      console.log("📤파이어베이스에 저장 시작");
      await setDoc(doc(db, "users", user.uid), {
        ...userData,
        isAdmin: false,
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
    // 로그아웃 처리
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },

    // 사용자 정보를 수동으로 설정
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입 요청 중
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 회원가입 성공
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      // 회원가입 실패
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 액션과 리듀서 내보내기
export const { logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
