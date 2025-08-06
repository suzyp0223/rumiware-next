"use client";

import React, { ChangeEvent } from "react";

import { formatPhoneNumber, getPhoneError } from "@/hooks/useAuthValidation";
import useFindUser from "@/hooks/useFindUser";

interface PhoneFormProps {
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  phoneError: string;
  setPhoneError: (msg: string) => void;
}

const PhoneForm = ({ phoneNumber, setPhoneNumber, phoneError, setPhoneError }: PhoneFormProps) => {
  const { findUser } = useFindUser();

  const handlePhoneFormat = async (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setPhoneError("");

    // await validateAndCheckPhone(formatted, name);
  };

  // // 🔽 이름이 변경될 때도 중복 검사 다시 실행
  // useEffect(() => {
  //   if (!phoneNumber || phoneNumber.replace(/\D/g, "").length < 10) return;

  //   // 이름이 비어 있으면 에러 출력
  //   if (!name.trim()) {
  //     setPhoneError("이름을 먼저 입력해주세요.");
  //     return;
  //   }
  //   validateAndCheckPhone(phoneNumber, name);
  // }, [name]);

  // ✅ 중복 확인 버튼 클릭
  const handleCheckDuplicate = async () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, "");

    if (!phoneNumber || cleanedPhone.length < 10) {
      setPhoneError("유효한 전화번호를 입력해주세요.");
      return;
    }

    const validationMessage = getPhoneError(phoneNumber);
    if (validationMessage) {
      setPhoneError(validationMessage);
      return;
    }

    const user = await findUser("byPhone", { phoneNumber: cleanedPhone });

    if (user) {
      if (user.emailVerified === false) {
        setPhoneError("이미 가입된 전화번호입니다.");
      }
    } else {
      setPhoneError("사용 가능한 전화번호입니다.");
    }
  };

  return (
    <>
      <li>
        <div className="border border-gray-300 rounded">
          {/* 전화번호 입력 */}
          <div className="relative px-2 py-2">
            <input
              id="phone-input"
              value={phoneNumber}
              onChange={handlePhoneFormat}
              type="tel"
              placeholder="휴대전화번호"
              className="outline-none w-full max-w-md pl-3 border-b border-transparent focus:border-blue-600"
            />
            <button
              type="button"
              onClick={handleCheckDuplicate}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-4"
            >
              중복 확인
            </button>
          </div>
        </div>

        {/* ✅ 유효성 메시지 - 하단 하나만 표시 */}
        {phoneError && (
          <p
            className={`text-xs text-left mt-2 ml-2 ${
              phoneError.includes("사용 가능") ? "text-blue-500" : "text-red-500"
            }`}
          >
            {phoneError}
          </p>
        )}
      </li>
    </>
  );
};

export default PhoneForm;
