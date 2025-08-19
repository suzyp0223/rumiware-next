// src/utils/firebaseDeleteUser.ts
import { auth, db } from "@/firebases/firebase";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  AuthError,
} from "firebase/auth";
import { collection, doc, getDocs, writeBatch } from "firebase/firestore";

/**
 * (선택) 비밀번호로 재인증
 */
export async function reauthWithPassword(password: string) {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("로그인이 필요합니다.");
  const cred = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, cred);
}

/** 🔐 구글 재인증 */
export async function reauthWithGoogle() {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  const provider = new GoogleAuthProvider();
  // 필요 시 추가 스코프/프롬프트 설정 가능
  await reauthenticateWithPopup(user, provider);
}

/** 🔐 (예정) 카카오 재인증 – Firebase 콘솔에 OIDC 공급자 등록 필요 */
// 콘솔 > Authentication > Sign-in method > Add provider > OIDC > Provider ID: "kakao"
// 그리고 아래 providerId를 'oidc.kakao'로 사용
export async function reauthWithKakao() {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  // 🔧 콘솔에서 OIDC Kakao 설정을 완료한 경우에만 동작
  const provider = new OAuthProvider("oidc.kakao");
  await reauthenticateWithPopup(user, provider);
}

/** 🗑️ Firestore 정리: users/{uid} + addresses 서브컬렉션 전체 삭제 */
async function purgeUserData(uid: string) {
  const batch = writeBatch(db);

  // addresses 서브컬렉션 삭제
  const addrColRef = collection(db, "users", uid, "addresses");
  const addrSnap = await getDocs(addrColRef);
  addrSnap.forEach((d) => batch.delete(d.ref));

  // users/{uid} 문서 삭제
  batch.delete(doc(db, "users", uid));

  await batch.commit();
}

/** 👤 계정 삭제(필요 시 재인증은 호출자에서 처리) */
export async function deleteAccountOnly() {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  await deleteUser(user);
}

/** 🧹 전체 흐름: 데이터 → 계정 삭제 (재인증 에러는 위로 throw) */
export async function deleteUserWithData() {
  const user = auth.currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");
  await purgeUserData(user.uid); // 🔧 Firestore 먼저 정리
  await deleteAccountOnly(); // 🔧 그 다음 계정 삭제
}

/** 🧰 편의 함수: 삭제 시도 → 재인증 요구면 throw 유지 */
export async function tryDeleteUserWithDataOrThrowRecentLogin() {
  try {
    await deleteUserWithData();
  } catch (e) {
    const err = e as AuthError;
    if (err?.code === "auth/requires-recent-login") throw err; // 🔧 호출자에서 재인증 처리
    throw e;
  }
}
