// 클라이언트: 로그아웃 호출 함수
import { signOut } from "firebase/auth";
import { auth } from "@/firebases/firebase";
import { logoutUser } from "@/store/slices/userSlice"; // Redux 액션 임포트
import { useRouter } from "next/navigation";
import { stopAddressesListener, clearAddresses } from "@/store/slices/addressesSlice";
import { useAppDispatch } from "./hooks";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    try {
      // 1. 서버 세션 쿠키 먼저 폐기 (중요)
      await fetch("/api/sessionLogout", { method: "POST", credentials: "include" }); // 쿠키 제거 요청

      await dispatch(stopAddressesListener()).unwrap(); // <-- 중요

      // 2. Firebase 인증 세션 종료
      await signOut(auth); // Firebase 로그아웃
      dispatch(clearAddresses());

      // 3 Redux 상태 즉시 비우기
      dispatch(logoutUser());

      // 4. localStorage 정리
      localStorage.removeItem("autoLogin");
      localStorage.removeItem("storedEmail");

      // (프로젝트에서 사용 중이면 같이 정리)
      localStorage.removeItem("rememberId");
      localStorage.removeItem("emailForVerification");

      // 5. 새로고침으로 SSR 반영
      router.replace("/");
      router.refresh();
      // window.location.replace("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return { logout };
};
