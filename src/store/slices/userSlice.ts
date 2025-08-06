// 프로필, 장바구니, 찜목록 등 유저 데이터 관리
// Redux Toolkit 기반으로 Firebase 이메일 회원가입 + Firestore 저장 + 전역 상태 관리를 위한 userSlice
/**
 * createUserWithEmailAndPassword로 Firebase Auth에 계정 생성 →
    Firestore users 컬렉션에 사용자 정보 저장 →
    Redux 상태에 저장하여 로그인 상태 유지
 */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, setDoc, serverTimestamp, FieldValue, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebases/firebase";
import { updatePassword } from "firebase/auth";

// 타입 정의
interface PhoneUser {
  uid: string;
  phoneNumber: string;
  isAdmin: boolean;
  createdAt?: FieldValue | Timestamp | null;
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

// 🔐 회원가입 (이메일 인증 링크 클릭 후 Firestore 저장만 진행)
export const signUpUser = createAsyncThunk(
  "user/signUpUser", // 액션 이름

  async (
    {
      password,
      name,
      birthDate,
      gender,
      nationality,
      phoneNumber,
    }: {
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
      const user = auth.currentUser;

      if (!user || !user.email) {
        return thunkAPI.rejectWithValue(
          "사용자 인증이 필요합니다.  이메일 인증을 먼저 진행해주세요."
        );
      }

      // 🔄 이메일 인증 상태 갱신
      await user.reload();

      // ✅ 비밀번호 설정 시도
      try {
        await updatePassword(user, password);
        console.log("🔐 비밀번호 설정 완료");
      } catch (error) {
        if (error === "auth/requires-recent-login") {
          console.warn("🔐 최근 로그인 필요 - 인증 링크를 다시 클릭해주세요.");
          return thunkAPI.rejectWithValue(
            "비밀번호 설정 시간이 만료되었습니다. 인증 링크를 다시 클릭해주세요."
          );
        } else {
          console.error("❌ 비밀번호 설정 실패:", error);
          return thunkAPI.rejectWithValue("비밀번호 설정 중 오류가 발생했습니다.");
        }
      }

      // ✅ Firestore 문서 확인
      const userDocRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        return thunkAPI.rejectWithValue("이미 가입된 사용자입니다.");
      }

      // ✅ 사용자 정보 구성
      const userData: EmailUser = {
        uid: user.uid,
        email: user.email.toLowerCase(),
        name: name.trim(),
        birthDate,
        gender,
        nationality,
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        emailVerified: user.emailVerified,
        isAdmin: false,
        createdAt: serverTimestamp(), // Firestore에는 저장됨
      };

      // ✅ Firestore 저장
      await setDoc(userDocRef, userData);
      console.log("✅ Firestore 저장 완료");

      //  Redux 상태에 저장할 데이터에서 createdAt 제거
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt: _unused, ...userWithoutTimestamp } = userData;
      return userWithoutTimestamp as EmailUser; // ⚠️ 직렬화 경고 방지
    } catch (error) {
      console.error("❌ Firestore 저장 실패:", error);
      return thunkAPI.rejectWithValue(error || "알 수 없는 오류가 발생했습니다.");
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
