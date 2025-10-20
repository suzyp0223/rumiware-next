// // 프로필, 장바구니, 찜목록 등 유저 데이터 관리
// // Redux Toolkit 기반으로 Firebase 이메일 회원가입 + Firestore 저장 + 전역 상태 관리를 위한 userSlice
// /**
//  * createUserWithEmailAndPassword로 Firebase Auth에 계정 생성 →
//     Firestore users 컬렉션에 사용자 정보 저장 →
//     Redux 상태에 저장하여 로그인 상태 유지
//  */
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import {
//   doc,
//   setDoc,
//   serverTimestamp,
//   FieldValue,
//   Timestamp,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import {
//   FirestoreUser as FSUser,
//   EmailUserForRedux as EmailUserRedux,
//   SocialUserForRedux as SocialUserRedux,
// } from "../../components/types/firestoreUser";

// import { auth, db } from "@/firebases/firebase";
// import { updatePassword } from "firebase/auth";
// import { FirebaseError } from "firebase/app";
// import { UserProfile } from "@/store/types";

// // 타입 정의
// export interface BaseUser {
//   uid: string;
//   isAdmin: boolean;
//   createdAt?: FieldValue | Timestamp | null;
// }

// // 이메일 유저
// export interface EmailUser extends BaseUser {
//   type: "email";
//   email: string;
//   name: string;
//   birthDate: string;
//   gender: string;
//   nationality: string;
//   phoneNumber: string;
//   emailVerified: boolean;
// }

// // 소셜 유저
// export interface SocialUser extends BaseUser {
//   type: "social";
//   provider: "google" | "kakao";
//   email?: string;
//   name?: string;
//   photoURL?: string;
// }

// // ✨ Redux에 직렬화 경고가 나지 않도록 createdAt을 제거한 형태를 상태로 사용
// type EmailUserForRedux = Omit<EmailUser, "createdAt">;
// type SocialUserForRedux = Omit<SocialUser, "createdAt">;
// type FirestoreUser = EmailUser | SocialUser;
// export type UserState = EmailUser | SocialUser;

// // Redux Slice
// export interface State {
//   user: EmailUserForRedux | SocialUserForRedux | UserProfile | null;
//   initialized: boolean;
//   isLoggedIn: boolean;
//   loading: boolean;
//   error?: string | null;
// }

// // 초기 상태
// const initialState: State = {
//   user: null,
//   initialized: false,
//   isLoggedIn: false,
//   loading: false,
//   error: null,
// };

// const mapGender = (label: string): "male" | "female" | "non" => {
//   // JoinForm은 "남자"/"여자"를 씁니다 → 표준값으로 매핑
//   if (label === "남자") return "male";
//   if (label === "여자") return "female";
//   return "non";
// };

// const onlyDigits = (s: string) => (s ?? "").replace(/\D/g, "");

// // 🔐 회원가입 (이메일 인증 링크 클릭 후 Firestore 저장만 진행)
// export const signUpUser = createAsyncThunk<
//   EmailUserForRedux,
//   {
//     email: string;
//     password: string;
//     name: string;
//     birthDate: string;
//     gender: string;
//     nationality: string;
//     phoneNumber: string;
//     zoneCode: string;
//     address: string;
//     detailAddress: string;
//   },
//   { rejectValue: string } // ✨ 변경: reject payload 타입 명시
// >(
//   "user/signUpUser", // 액션 이름

//   async (
//     {
//       password,
//       name,
//       birthDate,
//       gender,
//       nationality,
//       phoneNumber,
//       zoneCode,
//       address,
//       detailAddress,
//     },
//     thunkAPI
//   ) => {
//     try {
//       const user = auth.currentUser;

//       if (!user || !user.email) {
//         return thunkAPI.rejectWithValue(
//           "사용자 인증이 필요합니다.  이메일 인증을 먼저 진행해주세요."
//         );
//       }

//       // 🔄 이메일 인증 상태 갱신
//       await user.reload();

//       // ✅ 비밀번호 설정 시도
//       try {
//         await updatePassword(user, password);
//         console.log("🔐 비밀번호 설정 완료");
//       } catch (err: unknown) {
//         const fbErr = err as FirebaseError; // ✨ 변경
//         if (fbErr?.code === "auth/requires-recent-login") {
//           // ✨ 변경: 코드 비교 방식 수정
//           console.warn("🔐 최근 로그인 필요 - 인증 링크를 다시 클릭해주세요.");
//           return thunkAPI.rejectWithValue(
//             "비밀번호 설정 시간이 만료되었습니다. 인증 링크를 다시 클릭해주세요."
//           );
//         }
//         console.error("❌ 비밀번호 설정 실패:", fbErr);
//         return thunkAPI.rejectWithValue("비밀번호 설정 중 오류가 발생했습니다.");
//       }

//       // ✅ Firestore 문서 확인
//       const userDocRef = doc(db, "users", user.uid);
//       const snapshot = await getDoc(userDocRef);
//       if (snapshot.exists()) {
//         return thunkAPI.rejectWithValue("이미 가입된 사용자입니다.");
//       }

//       // ✅ Firestore 저장 데이터 (createdAt 포함)
//       const userData: FirestoreUser = {
//         type: "email",
//         uid: user.uid,
//         email: (user.email ?? "").toLowerCase(),
//         name: name.trim(),
//         birthDate,
//         gender,
//         nationality,
//         phoneNumber: phoneNumber.replace(/\D/g, ""),

//         zoneCode,
//         address,
//         detailAddress,

//         emailVerified: user.emailVerified,
//         isAdmin: false,
//         createdAt: serverTimestamp(), // Firestore에는 저장됨
//       };

//       // ✅ Firestore 저장
//       await setDoc(userDocRef, userData);
//       console.log("✅ 이메일 유저 Firestore 저장 완료");

//       //  Redux 상태에 저장할 데이터에서 createdAt 제거

//       // const { createdAt: _unused, ...userForRedux } = userData;

//       // ✅ 여기서 직접 Redux에 저장!
//       // thunkAPI.dispatch(setUser(userForRedux));

//       return userData; // ⚠️ 직렬화 경고 방지
//     } catch (err: unknown) {
//       const fbErr = err as FirebaseError; // ✨ 변경
//       console.error("❌ Firestore 저장 실패:", fbErr);
//       return thunkAPI.rejectWithValue(fbErr?.message || "알 수 없는 오류가 발생했습니다."); // ✨ 변경
//     }
//   }
// );

// // ✅ 추가: 저장된 프로필 조회 Thunk
// export const fetchUserProfile = createAsyncThunk<
//   EmailUserForRedux | SocialUserForRedux,
//   string,
//   { rejectValue: string }
// >("user/fetchUserProfile", async (uid, thunkAPI) => {
//   try {
//     const ref = doc(db, "users", uid); //       Firestore 문서 참조
//     const snap = await getDoc(ref); //       1회 조회
//     if (!snap.exists()) {
//       return thunkAPI.rejectWithValue("프로필 문서가 없습니다.");
//     }

//     const raw = snap.data() as FirestoreUser;

//     // createdAt 같은 비직렬화 필드 제거
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { createdAt: _unused, ...userForRedux } = raw;
//     return userForRedux as EmailUserForRedux | SocialUserForRedux; //       Redux에 넣을 순수 객체 반환
//   } catch {
//     return thunkAPI.rejectWithValue("프로필 조회 중 오류가 발생했습니다.");
//   }
// });

// export const updateUserField = createAsyncThunk<
//   { field: string; value: any },
//   { uid: string; field: string; value: any },
//   { rejectValue: string }
// >("user/updateUserField", async ({ uid, field, value }, { rejectWithValue }) => {
//   try {
//     await updateDoc(doc(db, "users", uid), { [field]: value });
//     return { field, value };
//   } catch (err: any) {
//     return rejectWithValue(err?.message ?? "updateUserField failed");
//   }
// });

// // Slice 생성
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     // 로그아웃 처리
//     logoutUser(state) {
//       state.user = null;
//       state.isLoggedIn = false;
//       state.initialized = true;
//     },

//     // 사용자 정보를 수동으로 설정
//     setUser(state, action: PayloadAction<EmailUserForRedux | SocialUserForRedux>) {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//       state.initialized = true;
//     },

//     // ✨ 추가: onAuthStateChanged 첫 콜백 시 호출
//     setAuthInitialized(state) {
//       state.initialized = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 회원가입 요청 중
//       .addCase(signUpUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       // 회원가입 성공
//       // .addCase(signUpUser.fulfilled, (state, action: PayloadAction<EmailUserForRedux>) => {
//       .addCase(signUpUser.fulfilled, (state) => {
//         state.loading = false;
//         // state.user = action.payload;
//         state.isLoggedIn = false;
//       })
//       // 회원가입 실패
//       .addCase(signUpUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = (action.payload as string) ?? action.error.message ?? "회원가입 실패";
//       })
//       // 프로필 가져오기 성공 시 전역 상태 갱신
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.user = action.payload; //  전역 유저 상태 갱신
//         state.isLoggedIn = true; //  로그인 유지 표식
//         state.loading = false; //  로딩 종료
//         state.error = null; //  에러 초기화
//       })
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload ?? "프로필 조회 실패";
//       })
//       .addCase(updateUserField.fulfilled, (state, action) => {
//         if (state.user) {
//           const { field, value } = action.payload;
//           (state.user as any)[field] = value; // 낙관적 동기화
//         }
//       });
//   },
// });

// // 액션과 리듀서 내보내기
// export const { logoutUser, setUser, setAuthInitialized } = userSlice.actions;
// export default userSlice.reducer;
