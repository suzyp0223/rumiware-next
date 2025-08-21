import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  signInWithPopup,
  OAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db, googleProvider } from "@/firebases/firebase";
import { setUser, type SocialUserForRedux } from "@/store/slices/userSlice";

const SocialLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const upsertSocialUser = async ({
    provider,
    uid,
    email,
    name,
    photoURL,
  }: {
    provider: "google" | "kakao";
    uid: string;
    email?: string | null;
    name?: string | null;
    photoURL?: string | null;
  }): Promise<SocialUserForRedux> => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);

    // 공통 스키마에 맞춰 기본값 채움 (소셜도 빈 문자열 허용)
    const data = {
      uid,
      type: "social" as const,
      provider,
      email: (email ?? "").toLowerCase(),
      name: name ?? "소셜유저",
      photoURL: photoURL ?? null,

      // 이메일 전용 필드도 기본값 채워 UI 안전
      birthDate: "",
      gender: "",
      nationality: "",
      phoneNumber: "",
      emailVerified: null as boolean | null,

      // 주소 필드 기본값
      zoneCode: "",
      address: "",
      detailAddress: "",

      isAdmin: false,
      updatedAt: serverTimestamp(),
      ...(snap.exists() ? {} : { createdAt: serverTimestamp() }),
    };

    // 🔴 핵심 수정: 항상 병합 저장해서 기존 문서에도 type/provider 등 채워 넣기
    await setDoc(ref, data, { merge: true });

    const forRedux: SocialUserForRedux = {
      uid: data.uid,
      type: "social",
      provider: data.provider,
      email: data.email,
      name: data.name,
      photoURL: data.photoURL,
      birthDate: "",
      gender: "",
      nationality: "",
      phoneNumber: "",
      emailVerified: null,
      zoneCode: "",
      address: "",
      detailAddress: "",
      isAdmin: false,
    };
    return forRedux;
  };

  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const cred = await signInWithPopup(auth, googleProvider);
      const u = cred.user;

      const userForRedux = await upsertSocialUser({
        provider: "google",
        uid: u.uid,
        email: u.email,
        name: u.displayName,
        photoURL: u.photoURL,
      });
      dispatch(setUser(userForRedux));

      // ✅ 추가: ID 토큰을 서버에 보내 세션 쿠키 생성
      const idToken = await u.getIdToken(/* forceRefresh */ true); // ✅ 변경
      await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      router.replace("/myPage/myInfo");
    } catch (e) {
      console.error("구글 로그인 실패:", e);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const kakao = new OAuthProvider("oidc.kakao");
      kakao.addScope("openid");
      // 콘솔 비즈앱 설정 이전이면 아래 두 줄은 잠시 주석
      // kakao.addScope("profile");
      // kakao.addScope("account_email");
      const cred = await signInWithPopup(auth, kakao);
      const u = cred.user;

      const userForRedux = await upsertSocialUser({
        provider: "kakao",
        uid: u.uid,
        email: u.email,
        name: u.displayName,
        photoURL: u.photoURL,
      });
      dispatch(setUser(userForRedux));

      // ✅ 추가: 세션 쿠키 생성
      const idToken = await u.getIdToken(true);
      await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      router.replace("/myPage/myInfo");
    } catch (e) {
      console.error("카카오 로그인 실패:", e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <button type="button" onClick={handleKakaoLogin}>
        카카오톡 로그인
      </button>
      <button type="button" onClick={handleGoogleLogin}>
        구글 로그인
      </button>
    </div>
  );
};

export default SocialLogin;
