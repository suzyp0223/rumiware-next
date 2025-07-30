"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import usePhoneAuth from "@/hooks/usePhoneAuth";

interface CarrierChoiceProps {
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  setVerified: (val: boolean) => void;
  phoneError: string;
  // setPhoneError: (msg: string) => void;
  submitButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const CarrierChoice = ({
  phoneNumber,
  setPhoneNumber,
  setVerified,
  phoneError,
  // setPhoneError,
  submitButtonRef,
}: CarrierChoiceProps) => {
  const [sendError, setSendError] = useState(""); // 인증요청 오류 메시지
  const [codeError, setCodeError] = useState(""); // 인증확인 오류 메시지

  const { code, setCode, verified, sendCode, verifyCode, confirmationSent } =
    usePhoneAuth(phoneNumber);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    const formatted =
      onlyNumbers.length <= 3
        ? onlyNumbers
        : onlyNumbers.length <= 7
        ? `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`
        : `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;

    setPhoneNumber(formatted);
    setSendError(""); // 입력 중이면 인증요청 에러 초기화
    // setPhoneError(""); // 입력 중이면 상위 에러 초기화
  };

  // 인증요청 유효성 검사
  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) {
      setSendError("유효한 전화번호를 입력해주세요.");
      return;
    }

    setSendError("");
    sendCode();
  };

  // 인증확인 유효성 검사
  const handleVerifyCode = () => {
    if (!code || code.length !== 6) {
      setCodeError("6자리 인증번호를 입력해주세요.");
      return;
    }

    setCodeError("");
    verifyCode();
  };

  useEffect(() => {
    setVerified(verified);

    if (verified) {
      submitButtonRef.current?.focus(); // ✅ 가입 버튼 포커스
    }
  }, [verified]);

  return (
    <>
      {/* reCAPTCHA 위치 */}
      <div id="recaptcha-container" className="hidden"></div>

      <li>
        <div className="border border-gray-300 rounded">
          {/* 전화번호 입력 */}
          <div className="relative px-2 py-2 border-b">
            <input
              id="phone-input"
              value={phoneNumber}
              onChange={handlePhoneChange}
              type="tel"
              placeholder="휴대전화번호"
              className="outline-none w-full max-w-md pl-3 border-b border-transparent focus:border-blue-600"
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={!phoneNumber || verified}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-2"
            >
              인증요청
            </button>
          </div>

          {/* 전화번호 오류 메시지 */}
          {(sendError || phoneError) && (
            <p className="text-sm text-red-500 mt-1 ml-2">{sendError || phoneError}</p>
          )}

          {/* 인증번호 입력 */}
          <div className="relative py-2 px-2">
            <input
              type="text"
              placeholder="인증번호 6자리"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={verified}
              className="outline-none w-full max-w-md pl-3 border-b border-transparent focus:border-blue-600"
            />
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={!confirmationSent || verified}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-2"
            >
              인증확인
            </button>
          </div>

          {/* 인증번호 오류 메시지 */}
          {codeError && <p className="text-sm text-red-500 mt-1 ml-2">{codeError}</p>}
        </div>
      </li>
    </>
  );
};

export default CarrierChoice;
