"use client";

import { useState } from "react";
import { auth } from "@/firebases/firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

type Props = {
  /** 소셜 전용 계정이면 true로 넘기면 이 행을 렌더링하지 않습니다. (기본 false) */
  isSocialUser?: boolean | null;

  /** 비밀번호 검증 통과 직후 1회 호출 */
  onVerified?: () => void;

  /** "수정" 클릭 시 호출 (부모에서 폼 전체를 편집 모드로 전환할 때 사용) */
  onEdit?: () => void;

  /** "취소" 클릭 시 호출 (부모에서 편집 모드 해제/리셋할 때 사용) */
  onCancel?: () => void;
};

export default function PasswordEditRow({
  isSocialUser = false,
  onVerified,
  onEdit,
  onCancel,
}: Props) {
  const [pwd, setPwd] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [canEdit, setCanEdit] = useState(false); // 비번 확인 성공 시 true
  const [authErr, setAuthErr] = useState<string | null>(null);

  const social = !!isSocialUser; // ✅ null/undefined도 false로 강제
  if (social) return null;
  if (isSocialUser) return null; // 소셜 계정이면 행 숨김

  const verifyPassword = async () => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      setAuthErr("로그인이 필요합니다.");
      return;
    }
    try {
      setVerifying(true);
      setAuthErr(null);
      const cred = EmailAuthProvider.credential(user.email, pwd);
      await reauthenticateWithCredential(user, cred); // ✅ 재인증(비번 확인)
      setCanEdit(true);
      onVerified?.();
    } catch (e: unknown) {
      // 대표 에러만 친절히 매핑
      const code = (e as { code?: string })?.code;
      if (code === "auth/wrong-password") setAuthErr("비밀번호가 올바르지 않습니다.");
      else if (code === "auth/too-many-requests")
        setAuthErr("시도가 너무 많습니다. 잠시 후 다시 시도하세요.");
      else if (code === "auth/invalid-credential") setAuthErr("자격 증명이 올바르지 않습니다.");
      else setAuthErr("재인증 중 오류가 발생했습니다.");
      setCanEdit(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleCancel = () => {
    setCanEdit(false);
    setPwd("");
    setAuthErr(null);
    onCancel?.();
  };

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">
        <label htmlFor="password1" className="head-cell">
          <span className="text-red-400"></span>&nbsp;비밀번호
        </label>
      </th>

      <td className="p-4 pb-0 align-middle">
        {/* 비밀번호 입력 */}
        <input
          type="password"
          id="password1"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="outline-none border-b w-[200px] border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 text-base"
          size={15}
          maxLength={20}
          disabled={canEdit} // 통과 후엔 잠가두고 싶지 않으면 이 속성 제거
        />

        {/* 버튼 영역 */}
        {!canEdit ? (
          <button
            type="button"
            onClick={verifyPassword}
            disabled={verifying || !pwd.trim()}
            className="ml-4 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded disabled:opacity-50"
          >
            {verifying ? "확인 중..." : "확인"}
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => onEdit?.()}
              className="ml-4 p-2 text-sm border border-blue-600 text-blue-600 hover:bg-blue-50 rounded"
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="ml-2 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
            >
              취소
            </button>
          </>
        )}

        {/* 안내/에러 메시지 */}
        {authErr ? (
          <span className="block text-sm text-red-500 pb-2 pl-2">{authErr}</span>
        ) : (
          !canEdit && (
            <span className="block text-sm text-blue-500 pb-2 pl-2">
              비밀번호를 입력하시면 수정 버튼이 나옵니다.
            </span>
          )
        )}
      </td>
    </tr>
  );
}
