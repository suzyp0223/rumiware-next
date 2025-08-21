/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, setDoc, serverTimestamp, FieldValue, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebases/firebase";
import { updatePassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

/* =========================
   타입 정의
========================= */
export interface BaseUser {
  uid: string;
  isAdmin: boolean;
  createdAt?: FieldValue | Timestamp | null;
}

export interface EmailUser extends BaseUser {
  type: "email";
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  emailVerified: boolean;
}

export interface SocialUser extends BaseUser {
  type: "social";
  provider: "google" | "kakao";
  email?: string | null;
  name?: string | null;
  photoURL?: string | null;
  birthDate?: string;
  gender?: string;
  nationality?: string;
  phoneNumber?: string;
  emailVerified?: boolean | null;

  zoneCode?: string;
  address?: string;
  detailAddress?: string;
}

type FirestoreUser = EmailUser | SocialUser;
export type UserState = EmailUser | SocialUser;

export type EmailUserForRedux = Omit<EmailUser, "createdAt">;
export type SocialUserForRedux = Omit<SocialUser, "createdAt">;
export type UserStateForRedux = EmailUserForRedux | SocialUserForRedux | null;

export interface State {
  user: UserStateForRedux;
  initialized: boolean;
  isLoggedIn: boolean;
  loading: boolean;
  error?: string | null;
}

/* =========================
   직렬화 유틸 (any 금지)
========================= */
type Serializable =
  | string
  | number
  | boolean
  | null
  | Serializable[]
  | { [key: string]: Serializable };

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

function normalizeForRedux<T>(obj: T): T | Serializable {
  if (obj == null || typeof obj !== "object") return obj as T;

  const ts = obj as Partial<FirestoreTimestamp>;
  if (
    typeof ts.seconds === "number" &&
    typeof ts.nanoseconds === "number" &&
    Object.keys(obj as object).length === 2
  ) {
    const ms = ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1e6);
    return new Date(ms).toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => normalizeForRedux(v)) as Serializable;
  }

  const out: Record<string, Serializable> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    out[k] = normalizeForRedux(v) as Serializable;
  }
  return out as unknown as T | Serializable;
}

/* =========================
   초기 상태
========================= */
const initialState: State = {
  user: null,
  initialized: false,
  isLoggedIn: false,
  loading: false,
  error: null,
};

/* =========================
   회원가입 (이메일 링크 인증 이후)
========================= */
export const signUpUser = createAsyncThunk<
  EmailUserForRedux,
  {
    email: string;
    password: string;
    name: string;
    birthDate: string;
    gender: string;
    nationality: string;
    phoneNumber: string;
  },
  { rejectValue: string }
>(
  "user/signUpUser",
  async ({ password, name, birthDate, gender, nationality, phoneNumber }, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        return thunkAPI.rejectWithValue(
          "사용자 인증이 필요합니다. 이메일 인증을 먼저 진행해주세요."
        );
      }

      // 최신 인증 상태 반영
      await user.reload();

      // 비밀번호 설정
      try {
        await updatePassword(user, password);
      } catch (err: unknown) {
        const fbErr = err as FirebaseError;
        if (fbErr?.code === "auth/requires-recent-login") {
          return thunkAPI.rejectWithValue(
            "비밀번호 설정 시간이 만료되었습니다. 인증 링크를 다시 클릭해주세요."
          );
        }
        return thunkAPI.rejectWithValue("비밀번호 설정 중 오류가 발생했습니다.");
      }

      // 사용자 문서
      const userDocRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        // 기존 문서가 존재할 때: “소셜 씨드/미완성”인지 검사
        const existing = snapshot.data() as Record<string, unknown>;
        const existingType = existing["type"];
        const looksSeed =
          (existingType === "social" || existingType == null) &&
          !existing["birthDate"] &&
          !existing["gender"] &&
          !existing["nationality"] &&
          !existing["phoneNumber"];

        if (!looksSeed) {
          // 이미 정상 가입된 사용자
          return thunkAPI.rejectWithValue("이미 가입된 사용자입니다.");
        }
        // 씨드/미완성 → 이메일 스키마로 업그레이드(merge)
      }

      const userData: EmailUser = {
        type: "email",
        uid: user.uid,
        email: (user.email ?? "").toLowerCase(),
        name: name.trim(),
        birthDate,
        gender,
        nationality,
        phoneNumber: phoneNumber.replace(/\D/g, ""),
        emailVerified: user.emailVerified,
        isAdmin: false,
        createdAt: serverTimestamp(),
      };

      // 새로 생성이든(없음) 업그레이드든(있음) merge 저장
      await setDoc(userDocRef, userData, { merge: true });

      const { createdAt: _unused, ...userForRedux } = userData;
      return userForRedux as EmailUserForRedux;
    } catch (err: unknown) {
      const fbErr = err as FirebaseError;
      return thunkAPI.rejectWithValue(fbErr?.message || "알 수 없는 오류가 발생했습니다.");
    }
  }
);

/* =========================
   저장된 프로필 조회
   - 존재하지 않으면: Firestore에 쓰지 않고 “반환만” 한다.
========================= */
export const fetchUserProfile = createAsyncThunk<
  EmailUserForRedux | SocialUserForRedux,
  string,
  { rejectValue: string }
>("user/fetchUserProfile", async (uid, thunkAPI) => {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    // 문서가 없으면: Firestore에 생성하지 않고, 안전한 기본 email 형태로 반환
    if (!snap.exists()) {
      const out: EmailUserForRedux = {
        type: "email",
        uid,
        email: "",
        name: "",
        birthDate: "",
        gender: "",
        nationality: "",
        phoneNumber: "",
        emailVerified: false,
        isAdmin: false,
      };
      return out;
    }

    const raw = snap.data() as Record<string, unknown>;
    const normalized = normalizeForRedux(raw);
    if (normalized == null || typeof normalized !== "object") {
      // 정규화 실패 시에도 안전 기본값 반환
      const out: EmailUserForRedux = {
        type: "email",
        uid,
        email: "",
        name: "",
        birthDate: "",
        gender: "",
        nationality: "",
        phoneNumber: "",
        emailVerified: false,
        isAdmin: false,
      };
      return out;
    }

    // createdAt/updatedAt 제외
    const { createdAt: _c, updatedAt: _u, ...rest } = normalized as Record<string, unknown>;

    // type 판정: 있는 값만 신뢰
    const storedType = rest["type"];
    if (storedType === "social") {
      const provider = (rest["provider"] as "google" | "kakao" | undefined) ?? "google"; // ⚠️ 레거시 보호
      const out: SocialUserForRedux = {
        type: "social",
        provider,
        uid: (rest["uid"] as string) ?? uid,
        email: ((rest["email"] as string | null) ?? "") as string,
        name: ((rest["name"] as string | null) ?? "") as string,
        photoURL: ((rest["photoURL"] as string | null) ?? null) as string | null,
        birthDate: (rest["birthDate"] as string) ?? "",
        gender: (rest["gender"] as string) ?? "",
        nationality: (rest["nationality"] as string) ?? "",
        phoneNumber: (rest["phoneNumber"] as string) ?? "",
        emailVerified: (rest["emailVerified"] as boolean | null) ?? null,
        zoneCode: (rest["zoneCode"] as string) ?? "",
        address: (rest["address"] as string) ?? "",
        detailAddress: (rest["detailAddress"] as string) ?? "",
        isAdmin: (rest["isAdmin"] as boolean) ?? false,
      };
      return out;
    }

    // 기본: email로 간주
    const out: EmailUserForRedux = {
      type: "email",
      uid: (rest["uid"] as string) ?? uid,
      email: ((rest["email"] as string) ?? "").toLowerCase(),
      name: (rest["name"] as string) ?? "",
      birthDate: (rest["birthDate"] as string) ?? "",
      gender: (rest["gender"] as string) ?? "",
      nationality: (rest["nationality"] as string) ?? "",
      phoneNumber: (rest["phoneNumber"] as string) ?? "",
      emailVerified: (rest["emailVerified"] as boolean) ?? false,
      isAdmin: (rest["isAdmin"] as boolean) ?? false,
    };
    return out;
  } catch {
    return thunkAPI.rejectWithValue("프로필 조회 중 오류가 발생했습니다.");
  }
});

/* =========================
   Slice
========================= */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.initialized = true;
    },
    setUser(state, action: PayloadAction<EmailUserForRedux | SocialUserForRedux>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.initialized = true;
    },
    setAuthInitialized(state) {
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? action.error.message ?? "회원가입 실패";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        state.initialized = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "프로필 조회 실패";
        state.initialized = true;
      });
  },
});

export const { logoutUser, setUser, setAuthInitialized } = userSlice.actions;
export default userSlice.reducer;
