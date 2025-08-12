"use client";

import { useEffect, useRef, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

import { auth } from "@/firebases/firebase";
import { checkEmailDuplicate } from "@/firebases/checkEmailDuplicate";
import sendEmailVerificationLink from "@/firebases/sendEmailVerificationLink";
import { getEmailValidationMessage, isValidEmail } from "@/hooks/useAuthValidation";

type Options = {
  /** 인증 완료 후 리다이렉트될 경로 (JoinForm: "/join", MyInfo: "/myPage/myInfo") */
  redirectPath?: string;
  /** 이메일 자동 중복검사 디바운스(ms) */
  autoDebounceMs?: number;
  onVerified?: (verifiedEmail: string) => void;
};

export default function useEmailLinkVerification(options?: Options) {
  const redirectPath = options?.redirectPath ?? "/join";
  const autoDebounceMs = options?.autoDebounceMs ?? 300;

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false); // 인증 성공 여부
  const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);

  const [uiMessage, setUiMessage] = useState<string>("");

  // 디바운스 타이머
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- 중복검사
  const handleEmailCheck = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setIsEmailDuplicateChecked(false);
      setIsEmailAvailable(null);
      setUiMessage(getEmailValidationMessage(email, false, null, emailVerified, emailTouched, ""));
      return;
    }

    const isDuplicate = await checkEmailDuplicate(email);
    const available = !isDuplicate;

    setIsEmailDuplicateChecked(true);
    setIsEmailAvailable(available);
    setUiMessage(
      getEmailValidationMessage(email, true, available, emailVerified, emailTouched, "")
    );
  };

  // --- 이메일 인증 링크 전송
  const handleEmailVerify = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setIsEmailDuplicateChecked(false);
      setIsEmailAvailable(null);
      setUiMessage(getEmailValidationMessage(email, false, null, emailVerified, emailTouched, ""));
      return;
    }

    try {
      // ★ 변경: 훅이 내부에서 공통 함수 사용
      const { success } = await sendEmailVerificationLink(email, redirectPath);
      if (success) {
        setIsEmailDuplicateChecked(true);
        setUiMessage("이메일로 인증 링크를 전송했습니다. 메일함을 확인해주세요.");
        window.localStorage.setItem("emailForVerification", email);
      } else {
        setIsEmailDuplicateChecked(false);
        setUiMessage("이메일 인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("이메일 인증 오류:", err);
      setIsEmailDuplicateChecked(false);
      setUiMessage("이메일 인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 주소창으로 돌아왔을 때 링크 소비(인증 완료 처리)
  const consumeLinkFromURL = async (url: string, searchParams?: URLSearchParams) => {
    const storedEmail = window.localStorage.getItem("emailForVerification");
    const queryEmail = searchParams?.get("email");
    const finalEmail = queryEmail || storedEmail;

    if (!finalEmail) return;

    if (isSignInWithEmailLink(auth, url)) {
      try {
        await signInWithEmailLink(auth, finalEmail, url);
        setEmail(finalEmail);
        setEmailVerified(true);
        setIsEmailAvailable(true);
        window.localStorage.removeItem("emailForVerification");
        setUiMessage("이메일 인증이 완료되었습니다.");
        console.log("✅ 이메일 인증 성공 및 로그인 완료");

        options?.onVerified?.(finalEmail);

        if (typeof window !== "undefined" && window.history?.replaceState) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, "", cleanUrl);
        }
      } catch (error) {
        console.error("❌ 링크 인증 실패:", error);
        setUiMessage("링크 인증에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  // --- 이메일 입력 변동 시 자동 중복검사(디바운스)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (isValidEmail(email)) {
        handleEmailCheck();
      }
    }, autoDebounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // --- 유틸: 입력 시작/초기화
  const onEmailChange = (value: string) => {
    setEmail(value);
    setEmailTouched(true); // ★ 변경: touched 처리
    setIsEmailDuplicateChecked(false);
    setIsEmailAvailable(null);
    if (emailVerified) setEmailVerified(false); // 인증 후 재입력 시 다시 편집 가능
  };

  const resetEmailState = () => {
    setEmail("");
    setEmailTouched(false);
    setEmailVerified(false);
    setIsEmailDuplicateChecked(false);
    setIsEmailAvailable(null);
    setUiMessage("");
  };

  return {
    // 상태
    email,
    setEmail: onEmailChange, // ★ 변경: 외부에선 setEmail처럼 사용
    emailVerified,
    isEmailDuplicateChecked,
    isEmailAvailable,
    uiMessage,

    // 파생
    readOnly: emailVerified, // 인증 완료 시 읽기 전용으로 잠글 수 있음

    // 액션
    handleEmailCheck,
    handleEmailVerify,
    consumeLinkFromURL,
    resetEmailState,
  };
}
