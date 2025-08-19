"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthError } from "firebase/auth";
import {
  tryDeleteUserWithDataOrThrowRecentLogin,
  reauthWithPassword,
  reauthWithGoogle,
  reauthWithKakao, // OIDC Kakao 설정 후 사용
  deleteUserWithData,
} from "@/components/utils/firebaseDeleteUser";

export default function WithdrawButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!window.confirm("정말 탈퇴하시겠습니까? 탈퇴 시 모든 데이터가 삭제됩니다.")) return;

    try {
      setLoading(true);
      await tryDeleteUserWithDataOrThrowRecentLogin(); // 🔧 1차 시도
      router.replace("/"); // ✅ 성공 시 메인 이동
    } catch (e) {
      const err = e as AuthError;
      if (err?.code !== "auth/requires-recent-login") {
        console.error(err);
        alert("탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }

      // 🔒 재인증 필요
      // 간단 선택지: 구글/카카오/비번 중 선택 (나중에 모달 UI로 교체 추천)
      const method = window.prompt(
        "보안을 위해 재인증이 필요합니다. 방법을 입력해주세요: google / kakao / password"
      );
      try {
        if (method === "google") {
          await reauthWithGoogle();
        } else if (method === "kakao") {
          await reauthWithKakao(); // 🔧 콘솔 OIDC 설정 필요
        } else if (method === "password") {
          const pwd = window.prompt("비밀번호를 입력하세요.") ?? "";
          if (!pwd.trim()) throw new Error("비밀번호가 필요합니다.");
          await reauthWithPassword(pwd);
        } else {
          alert("재인증이 취소되었습니다.");
          setLoading(false);
          return;
        }

        // 재인증 성공 → 다시 삭제 시도
        await deleteUserWithData();
        router.replace("/"); // ✅ 성공 시 메인 이동
      } catch (reauthErr) {
        console.error(reauthErr);
        alert("재인증 또는 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button onClick={handleWithdraw} disabled={loading}>
      {loading ? "탈퇴 처리중..." : "회원탈퇴"}
    </button>
  );
}
