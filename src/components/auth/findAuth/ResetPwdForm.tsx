"use client";

import CloseIcon from "@/components/icons/CloseIcon";
import { useState } from "react";
import { getNameError, getEmailError } from "@/hooks/useAuthValidation";
import useResetPwd from "@/hooks/useResetPwd";

const ResetPwdForm = () => {
  const [checkRadio, setCheckRadio] = useState<"email" | "tempPwd">("email");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  const { sendResetLink } = useResetPwd();

  // ✅ 이름 유효성 검사
  const handleNameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(getNameError(value));
  };

  // ✅ 이메일 유효성 검사
  const handleEmailValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(getEmailError(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setNameError(null);
    setEmailError(null);
    setPhoneError(null);
    setResultMsg(null);

    let hasError = false;

    if (!name.trim()) {
      setNameError(getNameError(name));
      hasError = true;
    }

    if (checkRadio === "email") {
      if (!email.trim()) {
        setEmailError(getEmailError(email));
        hasError = true;
      }
    } else if (checkRadio === "tempPwd") {
      if (!phoneNumber.trim()) {
        setPhoneError("휴대폰 번호를 입력해주세요.");
        hasError = true;
      }
    }

    if (hasError) return;

    if (checkRadio === "email") {
      const errMsg = await sendResetLink(name, email);
      if (errMsg) {
        setResultMsg(errMsg);
      } else {
        setResultMsg("✅ 입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.");
      }
    } else {
      setResultMsg("❗ 휴대폰 번호 발급 기능은 아직 지원되지 않습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-5">
      <div className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto">
        <div className="w-[400px]">
          <p className="text-xs text-gray-600 leading-normal">
            가입하신 아이디+이메일 또는 휴대폰번호를 입력, 본인인증을 통해 이메일 또는 휴대폰번호로
            임시 비밀번호를 보내드립니다. 확인 후 로그인하셔서 반드시 비밀번호를 변경하시기
            바랍니다.
          </p>
        </div>

        {/* 라디오 선택 */}
        <div className="mt-4 ml-2 text-xs self-start">
          <label className={`mr-10 ${checkRadio === "email" ? "text-[#0073e9]" : "text-black"}`}>
            <input
              type="radio"
              checked={checkRadio === "email"}
              onChange={() => setCheckRadio("email")}
              className="align-middle accent-[#0073e9]"
            />
            &nbsp;이메일로 발급
          </label>
          <label className={`${checkRadio === "tempPwd" ? "text-[#0073e9]" : "text-black"}`}>
            <input
              type="radio"
              checked={checkRadio === "tempPwd"}
              onChange={() => setCheckRadio("tempPwd")}
              className="align-middle"
            />
            &nbsp;휴대폰 번호로 발급
          </label>
        </div>

        <div className="w-96 flex flex-col">
          <ul>
            {/* 이름 입력 */}
            <li className="relative border border-gray-300 mb-3 p-2 rounded">
              <label className="hidden">이름</label>
              <input
                type="text"
                placeholder="이름"
                title="이름"
                maxLength={30}
                value={name}
                onChange={handleNameValid}
                className="outline-none block w-full"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setName("")}
              >
                <CloseIcon />
              </span>
            </li>
            {nameError && <p className="text-red-500 text-xs ml-1 mb-2">{nameError}</p>}

            {/* 이메일 입력 */}
            {checkRadio === "email" && (
              <>
                <li className="relative border border-gray-300 mb-1 p-2 rounded">
                  <label className="hidden">이메일</label>
                  <input
                    type="text"
                    title="이메일"
                    placeholder="아이디(이메일)"
                    maxLength={80}
                    value={email}
                    onChange={handleEmailValid}
                    className="outline-none block w-full"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setEmail("")}
                  >
                    <CloseIcon />
                  </span>
                </li>
                {emailError && <p className="text-red-500 text-xs ml-1 mb-2">{emailError}</p>}
              </>
            )}

            {/* 휴대폰 입력 */}
            {checkRadio === "tempPwd" && (
              <>
                <li className="relative border border-gray-300 mb-1 p-2 rounded">
                  <label className="hidden">휴대폰 번호</label>
                  <input
                    type="text"
                    title="휴대폰 번호"
                    placeholder="휴대폰 번호 -없이 (예: 01012345678)"
                    maxLength={15}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="outline-none block w-full"
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPhoneNumber("")}
                  >
                    <CloseIcon />
                  </span>
                </li>
                {phoneError && <p className="text-red-500 text-xs ml-1 mb-2">{phoneError}</p>}
              </>
            )}
          </ul>

          {/* 결과 메시지 */}
          {resultMsg && (
            <p
              className={`text-sm mt-2 mb-1 text-center ${
                resultMsg.startsWith("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {resultMsg}
            </p>
          )}

          {/* 버튼 */}
          <div className="mt-4 pt-6 mb-5">
            <button
              type="submit"
              className="block border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 py-2 rounded w-full text-center transition-all duration-200"
            >
              임시 비밀번호 발급
            </button>
            <button
              type="button"
              className="block bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded w-full mt-2 text-center transition-all duration-200"
              onClick={() => (window.location.href = "/auth")}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ResetPwdForm;
