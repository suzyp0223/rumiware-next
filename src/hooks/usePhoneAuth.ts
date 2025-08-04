// 전화번호 인증 로직
"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebases/firebase";
import {
  ConfirmationResult,
  linkWithCredential,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const usePhoneAuth = (phoneNumber: string) => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  useEffect(() => {
    const container = document.getElementById("recaptcha-container");
    if (!container || window.recaptchaVerifier) return;

    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        console.log("✅ reCAPTCHA 성공");
      },
    });

    window.recaptchaVerifier
      .render()
      .then((widgetId) => {
        window.recaptchaWidgetId = widgetId; // 필요할 경우 리셋 등에 사용
      })
      .catch((e) => console.error("reCAPTCHA 렌더 실패", e));
    console.log("window.recaptchaVerifier: ", window.recaptchaVerifier);

    return () => {
      // ✅ 클린업: 리렌더링 시 기존 reCAPTCHA 제거
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
      window.recaptchaWidgetId = undefined;
    };
  }, []);

  // 파이어베이스 전화번호 인증 요청
  const sendCode = async () => {
    try {
      if (!phoneNumber) return;
      if (!document.getElementById("recaptcha-container")) {
        console.error("reCAPTCHA DOM이 아직 준비되지 않았습니다.");
        return;
      }

      auth.languageCode = "ko"; // language set

      const rawPhone =
        "+82" +
        phoneNumber
          .replace(/[^0-9]/g, "")
          .slice(1)
          .trim();

      // const testPhoneNumber = "+821078785656";
      // const testVerificationCode = "123456";

      console.log("📤 인증번호 전송 중:", rawPhone);
      const result = await signInWithPhoneNumber(auth, rawPhone, window.recaptchaVerifier);
      console.log("result: ", result);

      // 🔐 인증 상태 저장
      setConfirmationResult(result);
      setConfirmationSent(true);
      alert("인증번호가 전송되었습니다.");
    } catch (error) {
      console.error("❌ 인증번호 전송 실패:", error);
      alert("인증번호 전송 실패");
    }
  };

  // 인증 코드 확인
  const verifyCode = async () => {
    if (!confirmationResult) return alert("인증번호를 먼저 요청해주세요");

    try {
      // const result = await confirmationResult.confirm(code); // 전화번호로 로그인됨 (주의!)
      const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, code);
      console.log("usePhoneAuth의 credential: ", credential);

      console.log("auth.currentUser: ", auth.currentUser);
      if (auth.currentUser) {
        await linkWithCredential(auth.currentUser, credential);
      } else {
        console.error("❌ 사용자 정보가 없습니다.");
      }

      setVerified(true);
      alert("✅ 인증 성공!");
      return credential; // ✅ user에 연결할 수 있는 credential 반환
    } catch (error) {
      console.error("❌ 인증 실패:", error);
      alert("잘못된 인증번호입니다.");
      return null;
    }
  };

  return {
    code,
    setCode,
    verified,
    sendCode,
    verifyCode,
    confirmationSent,
  };
};

export default usePhoneAuth;
