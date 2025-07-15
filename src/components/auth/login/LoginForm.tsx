/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CloseIcon from "../../icons/CloseIcon";
import PasswordToggle from "../../toggle/PasswordToggle";
import SocialLogin from "./SocialLogin";
import { useLogin } from "../../../hooks/useLogin";

import {
  isValidEmail,
  isValidPassword,
  getEmailError,
  getPasswordError,
} from "@/hooks/useAuthValidation";
import { getStoredEmail, storeEmail, removeStoredEmail } from "../../utils/emailStorage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [storedId, setStoredId] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const { login } = useLogin();

  // 저장된 아이디(email) 불러오기
  useEffect(() => {
    const saved = getStoredEmail();
    if (saved) {
      setEmail(saved);
      setStoredId(true);
    }
  }, []);

  // storeId 변경 시 로컬 저장/삭제
  useEffect(() => {
    if (storedId) {
      storeEmail(email);
    } else {
      removeStoredEmail();
    }
  }, [storedId, email]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(getEmailError(value));
  };
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    setPasswordError(getPasswordError(value));
  };
  const handleEmailBlur = () => {
    setEmailError(getEmailError(email));
  };
  const handlePasswordBlur = () => {
    setPasswordError(getPasswordError(pwd));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    let hasError = false;

    const emailErr = getEmailError(email);
    const pwdErr = getPasswordError(pwd);

    setEmailError(emailErr);
    setPasswordError(pwdErr);

    if (emailErr || pwdErr) {
      hasError = true;
    }

    if (hasError) return;

    setErrorMsg("");

    const result = await login(email, pwd, autoLogin);
    if (!result.success) {
      setErrorMsg(result.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <form className="flex flex-col gap-2 px-5" onSubmit={(e) => e.preventDefault()}>
      {/* 이메일 입력 */}
      <div className="mb-2">
        <div className="relative border border-gray-300 rounded-t">
          <input
            type="text"
            placeholder="아이디(이메일)"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9] rounded-t"
          />
          {email && (
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() => {
                setEmail("");
                setEmailError("아이디(이메일)를 입력해주세요.");
              }}
            >
              <CloseIcon />
            </span>
          )}
        </div>

        {emailError && (
          <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">{emailError}</div>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div className="mb-4">
        <div className="relative border border-gray-300 rounded-t">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호"
            value={pwd}
            onChange={handlePwdChange}
            onBlur={handlePasswordBlur}
            className="outline-none px-4 py-2 w-96
                border-b  border-transparent focus:border-[#0073e9] rounded-t"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 mr-2">
            <PasswordToggle visible={showPwd} onToggle={() => setShowPwd((prev) => !prev)} />
          </span>
        </div>

        {passwordError && (
          <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">{passwordError}</div>
        )}
      </div>

      {/* 자동 로그인 체크박스 */}
      <div className="text-xs flex flex-row items-center space-evenly">
        <label htmlFor="" className="flex items-center" arial-checked="false">
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
            className="w-5 h-5 custom-checkbox"
          />
          <span className="mx-2">자동 로그인</span>
        </label>
        <label htmlFor="" className="flex items-center mr-2" arial-checked="false">
          <input
            type="checkbox"
            checked={storedId}
            onChange={(e) => setStoredId(e.target.checked)}
            className="w-5 h-5 custom-checkbox"
          />
          <span className="mx-2">아이디 저장</span>
        </label>

        <Link href="/auth/findAuth" className="text-[var(--color-blue-600)] ml-16 mr-6 right-arrow">
          아이디∙비밀번호 찾기
        </Link>
      </div>

      <div className="flex flex-col">
        <button
          type="submit"
          className="bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded w-96 my-2 text-center"
          onClick={handleLogin}
        >
          로그인
        </button>
        {errorMsg && <div className="text-red-500 text-sm mb-4 text-center">{errorMsg}</div>}

        <SocialLogin />

        <div className="m-4 border-b border-gray-200"></div>

        <Link href="/join" className="w-96 my-2">
          <div className="text-center border border-[var(--color-blue-600)] text-[var(--color-blue-600)] hover:bg-[var(--color-blue-600)] hover:text-white py-2 rounded">
            회원가입
          </div>
        </Link>
        <p className="text-center text-xs text-gray-500 py-4">
          &copy; &nbsp;박수지. All Rights Reserved.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
