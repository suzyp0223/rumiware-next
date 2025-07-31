// 클라이언트: 로그아웃 호출 함수
import { signOut } from "firebase/auth";
import { auth } from "@/firebases/firebase";

export const useLogout = () => {
  const logout = async () => {
    try {
      // 1. Firebase 인증 로그아웃
      await signOut(auth); // Firebase 로그아웃

      // 2. 서버에 쿠키 제거 요청 (쿠키 포함)
      await fetch("/api/sessionLogout", { method: "POST", credentials: "include" }); // 쿠키 제거 요청

      // 3. localStorage 정리
      localStorage.removeItem("autoLogin");
      localStorage.removeItem("storedEmail");

      // 4. 새로고침으로 SSR 반영
      window.location.replace("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return { logout };
};
