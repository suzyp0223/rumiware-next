"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser, type UserState } from "@/store/slices/userSlice";
import useEmailLinkVerification from "@/hooks/useEmailLinkVerification";

type Props = { user: UserState | null; redirectPath?: string };

const EmailEditRow = ({ user, redirectPath = "/myPage/myInfo" }: Props) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);

  // 이메일 링크 인증 훅 사용
  const {
    email,
    setEmail,
    isEmailAvailable,
    uiMessage,
    readOnly,
    handleEmailCheck,
    handleEmailVerify,
    consumeLinkFromURL,
    resetEmailState,
  } = useEmailLinkVerification({
    redirectPath,
    onVerified: (verifiedEmail) => {
      // 인증 완료 시 전역 반영
      if (user) dispatch(setUser({ ...user, email: verifiedEmail }));
    },
  });

  // 돌아왔을 때 URL 소비
  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(window.location.search);
    consumeLinkFromURL(url, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayEmail = user?.email ?? "";

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 text-left whitespace-nowrap">
        아이디 <br />
        (이메일)
      </th>
      <td className="p-2 align-middle">
        {!editing ? (
          <>
            <span className="inline-block px-4 py-2">{displayEmail}</span>
            <button
              type="button"
              onClick={() => {
                resetEmailState();
                setEmail(""); // (선택) 새 이메일 입력을 위해 비우기
                setEditing(true);
              }}
              className="m-2 p-2 text-sm border border-gray-300 hover:border-peach-300 rounded"
            >
              이메일 변경
            </button>
          </>
        ) : (
          <>
            <div className="inline-flex items-center py-2 px-2">
              <input
                type="email"
                placeholder={displayEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailCheck}
                readOnly={readOnly}
                className="outline-none w-80 pl-3 border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
              />
              <button
                type="button"
                onClick={handleEmailVerify}
                disabled={isEmailAvailable === false}
                className={`ml-4 text-xs px-3 py-2 border rounded ${
                  isEmailAvailable === false
                    ? "bg-gray-300 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                이멜링크보내기
              </button>
              <button
                type="button"
                onClick={() => {
                  resetEmailState();
                  setEditing(false);
                }}
                className="ml-2 text-xs px-3 py-2 border rounded hover:bg-gray-200"
              >
                취소
              </button>
            </div>

            {!!uiMessage && (
              <p
                className={`mt-2 text-xs ${
                  /완료|성공|전송|인증되었습니다/.test(uiMessage) ? "text-blue-500" : "text-red-500"
                }`}
              >
                {uiMessage}
              </p>
            )}
          </>
        )}
      </td>
    </tr>
  );
};

export default EmailEditRow;
