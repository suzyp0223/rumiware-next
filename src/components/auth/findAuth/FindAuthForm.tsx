"use client";

import { useState } from "react";
import useFindId from "./../../../hooks/useFindId";
import { getNameError } from "@/hooks/useAuthValidation";
import CloseIcon from "@/components/icons/CloseIcon";

const FindAuthForm = () => {
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [result, setResult] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string>("");
  const [emailOrPhoneError, setEmailOrPhoneError] = useState<string>("");

  const { findUserByEmail, findUserByPhone } = useFindId();

  const handleFind = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔐 1. 에러 초기화
    setNameError("");
    setEmailOrPhoneError("");
    setResult("");

    // 🔍 2. 유효성 검사
    let isValid = true;

    const nameValidationMessage = getNameError(name);
    if (nameValidationMessage) {
      setNameError(nameValidationMessage);
      isValid = false;
    }

    if (!emailOrPhone.trim()) {
      if (method === "email") {
        setEmailOrPhoneError(
          method === "email" ? "이메일을 입력해주세요." : "휴대폰 번호를 입력해주세요."
        );
      }
      isValid = false;
    }

    if (!isValid) return;

    // 🔄 3. Firebase에서 찾기
    let user;

    if (method === "email") {
      user = await findUserByEmail(emailOrPhone, name);
    } else {
      user = await findUserByPhone(emailOrPhone, name);
    }

    if (user) {
      setResult(`회원님의 아이디는: ${user.email}`);
    } else {
      setResult("일치하는 정보가 없습니다.");
    }
  };

  return (
    <form onSubmit={handleFind} className="flex flex-col gap-2 px-5">
      <div className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto">
        <div className="w-[400px]">
          <p className="text-xs text-gray-600">
            회원가입 시, 입력하신 이름 + 이메일 또는 휴대폰 번호로 아이디를 확인하실 수 있습니다.
          </p>
        </div>
        <div className="mt-4 mb-2 ml-2 text-xs self-start">
          <label className={`mr-10 ${method === "email" ? "text-[#0073e9]" : "text-black"}`}>
            <input
              type="radio"
              checked={method === "email"}
              onChange={() => setMethod("email")}
              className="align-middle accent-[#0073e9]"
            />
            &nbsp;이메일로 휴대폰 번호 찾기
          </label>
          <label className={` ${method === "phone" ? "text-[#0073e9]" : "text-black"}`}>
            <input
              type="radio"
              checked={method === "phone"}
              onChange={() => setMethod("phone")}
              className="align-middle"
            />
            &nbsp;휴대폰 번호로 찾기
          </label>
        </div>

        <div className="w-96 flex flex-col">
          <ul className="">
            <li className="relative border border-gray-300 p-2 ">
              <label className={`hidden`}>NAME</label>
              <input
                type="text"
                placeholder="이름"
                title="이름"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value.trim())}
                className="outline-none block w-full"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => {
                  setName("");
                }}
              >
                <CloseIcon />
              </span>
            </li>
            {nameError && <div className="text-xs text-red-500 mx-2 mt-1">{nameError}</div>}

            <li className="relative border border-gray-300 p-2 mt-4">
              <label className="hidden">E-MAIL Or PHONE</label>
              <input
                type="text"
                placeholder={method === "email" ? "이메일 주소" : "휴대폰 번호  - 없이 번호만"}
                maxLength={80}
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value.trim())}
                className="outline-none block w-full"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => {
                  setEmailOrPhone("");
                }}
              >
                <CloseIcon />
              </span>
            </li>
            {emailOrPhoneError && (
              <div className="text-xs text-red-500 mx-2 mt-1">{emailOrPhoneError}</div>
            )}
          </ul>
          <div className="mt-4">
            {result && <p className="text-ml mt-4 ">{result}</p>}

            <button
              type="submit"
              className="block mt-8 border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 py-2 rounded w-96 my-2 text-center transition-all duration-30 ease-in"
            >
              아이디 찾기
            </button>
            <button
              type="button"
              className="block bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded w-96 my-2 text-center transition-all duration-30 ease-in"
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

export default FindAuthForm;
