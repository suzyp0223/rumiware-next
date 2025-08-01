"use client";

import { useState, useEffect } from "react";

import useFindUser from "../../../hooks/useFindUser";
import CloseIcon from "@/components/icons/CloseIcon";
import { getNameError } from "@/hooks/useAuthValidation";

const FindAuthForm = () => {
  const { findUser } = useFindUser();

  // 🔁 폼 상태
  const [searchType, setSearchType] = useState<"byPhone" | "byEmail">("byPhone");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [emailResult, setEmailResult] = useState<string | null>(null);
  const [phoneResult, setPhoneResult] = useState<string | null>(null);

  useEffect(() => {
    setPhoneResult(null);
    setEmailResult(null);
  }, [searchType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 초기화
    setNameError(null);
    setPhoneError(null);
    setEmailError(null);
    setError(null);

    if (!name.trim()) {
      setNameError("이름을 입력해주세요.");
      return;
    }

    setError(null); // 초기화

    try {
      let data;
      if (searchType === "byPhone") {
        if (!phoneNumber.trim()) {
          setPhoneError("휴대폰 번호를 입력해주세요.");
          return;
        }
        data = await findUser("byPhone", { name, phoneNumber });
        setPhoneResult(data?.email ?? "일치하는 정보가 없습니다.");
        setEmailResult(null);
      } else {
        if (!email.trim()) {
          setEmailError("이메일을 입력해주세요.");
          return;
        }
        data = await findUser("byEmail", { name, email });
        setEmailResult(data?.phoneNumber ?? "일치하는 정보가 없습니다.");
        setPhoneResult(null);
      }
    } catch {
      setError("검색 중 오류가 발생했습니다.");
    }
  };

  const handleNameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameError(getNameError(value));
  };

  return (
    <div className="w-fit px-4">
      <p className="w-[410px] text-xs text-gray-600 leading-normal py-5 px-2 min-h-[70px] mx-auto">
        회원가입 시, 입력하신 이름 + 휴대폰 번호로 아이디(이메일)를 확인하실 수 있습니다.
      </p>
      {/* 🔘 검색 방식 선택 */}
      <div className="flex gap-4 mt-4 mb-4 ml-3 text-xs">
        <label className={`mr-10 ${searchType === "byPhone" ? "text-[#0073e9]" : "text-black"}`}>
          <input
            type="radio"
            name="searchType"
            value="byPhone"
            checked={searchType === "byPhone"}
            onChange={() => setSearchType("byPhone")}
          />
          <span className="ml-1">휴대폰으로 아이디(이메일) 찾기</span>
        </label>
        <label className={` ${searchType === "byEmail" ? "text-[#0073e9]" : "text-black"}`}>
          <input
            type="radio"
            name="searchType"
            value="byEmail"
            checked={searchType === "byEmail"}
            onChange={() => setSearchType("byEmail")}
          />
          <span className="ml-1">이메일로 휴대폰 찾기</span>
        </label>
      </div>

      {/* 📋 입력 폼 */}
      <form onSubmit={handleSubmit} className="space-y-3 px-3 w-full mb-6 ">
        <ul>
          <li>
            <div className="relative">
              <input
                type="text"
                placeholder="이름"
                value={name}
                onChange={handleNameValid}
                className="outline-none w-full border border-gray-300 p-2 rounded"
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => {
                  setName("");
                }}
              >
                <CloseIcon />
              </span>
            </div>

            {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
          </li>

          {searchType === "byPhone" && (
            <li className="mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="휴대폰 번호 -없이 (예: 01012345678)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="outline-none w-full border border-gray-300 p-2 rounded"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  onClick={() => {
                    setPhoneNumber("");
                  }}
                >
                  <CloseIcon />
                </span>
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </li>
          )}

          {searchType === "byEmail" && (
            <li className="mt-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="이메일 (예: abc@example.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none w-full border border-gray-300 p-2 rounded"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                  onClick={() => {
                    setEmail("");
                  }}
                >
                  <CloseIcon />
                </span>
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </li>
          )}
        </ul>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="pt-6 pb-4">
          <button
            type="submit"
            className="block border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 py-2 rounded w-full my-2 text-center transition-all duration-30 ease-in"
          >
            {searchType === "byPhone" ? "아이디(이메일) 찾기" : "휴대폰 번호 찾기"}
          </button>
          <button
            type="button"
            className="block bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded w-full my-2 text-center transition-all duration-30 ease-in"
            onClick={() => (window.location.href = "/auth")}
          >
            로그인
          </button>
        </div>
      </form>

      {/* 📌 결과 표시 */}
      {(phoneResult || emailResult) && (
        <div className="mt-8 p-3 bg-gray-100 rounded text-center text-sm text-gray-800">
          {searchType === "byPhone" && phoneResult && (
            <p>
              찾은 이메일: <strong>{phoneResult}</strong>
            </p>
          )}
          {searchType === "byEmail" && emailResult && (
            <p>
              찾은 휴대폰 번호: <strong>{emailResult}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FindAuthForm;
