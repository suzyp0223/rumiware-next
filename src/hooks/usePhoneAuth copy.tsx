"use client";

import { useState, useEffect } from "react";
import { auth } from "@/firebases/firebase";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const usePhoneAuth = (phoneNumber: string) => {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(false);

  // useEffect(() => {
  //   console.log("✅ usePhoneAuth useEffect 진입");

  //   if (typeof window !== "undefined" && !window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         // window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  //         size: "invisible",
  //         callback: (response: any) => {
  //           console.log("✅ reCAPTCHA 성공", response);
  //         },
  //       },
  //       auth
  //     );
  //     window.recaptchaVerifier.render().then((widgetId) => {
  //       window.recaptchaWidgetId = widgetId;
  //     });
  //   }
  // }, []);

  // 파이어베이스 전화번호 인증 요청
  const sendCode = async () => {
    try {
      if (!phoneNumber) return;
      if (!document.getElementById("recaptcha-container")) {
        console.error("reCAPTCHA DOM이 아직 준비되지 않았습니다.");
        return;
      }

      const rawPhone = "+82" + phoneNumber.replace(/[^0-9]/g, "").slice(1);

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            console.log("✅ reCAPTCHA 성공");
          },
        });
        await window.recaptchaVerifier.render();
      }

      console.log("📤 인증번호 전송 중:", rawPhone);
      const result = await signInWithPhoneNumber(auth, rawPhone, window.recaptchaVerifier);
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
    if (!confirmationResult) return alert("인증번호 먼저 요청해주세요");
    try {
      const result = await confirmationResult.confirm(code);
      console.log("usePhoneAuth의 result: ", result);
      setVerified(true);
      alert("✅ 인증 성공!");
    } catch (error) {
      console.error("❌ 인증 실패:", error);
      alert("잘못된 인증번호입니다.");
    }
  };

  return {
    code,
    setCode,
    verified,
    sendCode,
    verifyCode,
    // confirmationSent: !!confirmationResult,
    confirmationSent,
  };
};

export default usePhoneAuth;
