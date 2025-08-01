import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebases/firebase";

// 클라이언트 → 서버로 ID 토큰 전송 → 서버에서 세션 쿠키 생성 방식
export const useLogin = () => {
  const login = async (
    email: string,
    password: string,
    autoLogin: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // 🔐 Firebase에서 로그인 → 사용자 객체 반환
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 🔑 Firebase 사용자로부터 ID 토큰을 받아옴
      const idToken = await userCredential.user.getIdToken();

      // 🛰️ 서버 API (/api/sessionLogin)에 토큰을 전달 → 세션 쿠키 생성 요청
      await fetch("/api/sessionLogin", {
        method: "POST",
        body: JSON.stringify({ idToken, autoLogin }),
        headers: { "Content-Type": "application/json" },
      });

      // 🔁 쿠키 발급 완료 후, 메인 페이지로 이동
      window.location.href = "/";
      return { success: true };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("로그인 오류 코드:", error.code);

      // Firebase 에러 메시지 핸들링
      let message = "로그인 중 알 수 없는 오류가 발생했습니다.";
      if (error.code === "auth/user-not-found") message = "존재하지 않는 사용자입니다.";
      if (["auth/wrong-password", "auth/invalid-credential"].includes(error.code)) {
        message = "비밀번호가 틀렸습니다.";
      }
      if (error.code === "auth/invalid-email") message = "올바른 이메일 형식이 아닙니다.";
      if (error.code === "auth/network-request-failed") message = "네트워크 오류입니다.";

      return { success: false, error: message };
    }
  };

  return { login };
};
