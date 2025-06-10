"use client";
import CloseIcon from "@/components/icons/CloseIcon";
import PasswordToggle from "@/components/toggle/PasswordToggle";
import Link from "next/link";
import { useState } from "react";

const AuthMenu = () => {
  const [activeTab, setActiveTab] = useState<"email" | "qr" | "nonMember">("email");

  return (
    <div className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto border border-gray-200">
      <h1 className="text-3xl mb-3">로그인</h1>

      <ul className="flex flex-row gap-2 text-center px-4">
        <li className="px-2 cursor-pointer" onClick={() => setActiveTab("email")}>
          <div
            className={`hover:underline hover:text-[#0073e9] ${
              activeTab === "email" ? "text-[#0073e9]" : ""
            }`}
          >
            이메일 로그인
          </div>
          {activeTab === "email" && <div className="border-b border-blue-600 pb-2"></div>}
        </li>
        <li className="px-2 cursor-pointer" onClick={() => setActiveTab("qr")}>
          <div
            className={`hover:underline hover:text-[#0073e9] ${
              activeTab === "qr" ? "text-[#0073e9]" : ""
            }`}
          >
            QR코드 로그인
          </div>
          {activeTab === "qr" && <div className="border-b border-blue-600 pb-2"></div>}
        </li>
        <li className="px-2 cursor-pointer" onClick={() => setActiveTab("nonMember")}>
          <div
            className={`hover:underline hover:text-[#0073e9] ${
              activeTab === "nonMember" ? "text-[#0073e9]" : ""
            }`}
          >
            비회원 배송조회
          </div>
          {activeTab === "nonMember" && <div className="border-b border-blue-600 pb-2"></div>}
        </li>
      </ul>

      {activeTab === "nonMember" ? (
        <div className="flex flex-col gap-4 px-5 w-full items-center">
          {/* 구매자 이름 */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="구매자 이름"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <CloseIcon />
            </span>
            <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
              구매자 이름을 입력해주세요.
            </div>
          </div>

          {/* 구매번호 */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="구매번호"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <CloseIcon />
            </span>
            <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
              구매번호를 입력해주세요.
            </div>
          </div>

          {/* 비회원 구매 비밀번호 */}
          <div className="relative w-96">
            <input
              type="text"
              placeholder="비회원 구매 비밀번호"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <CloseIcon />
            </span>
            <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
              비회원 구매 비밀번호를 입력해주세요.
            </div>
          </div>

          <div className="flex flex-col w-96">
            <button className="bg-[var(--color-gray-300)] text-white py-2 rounded my-2 text-center">
              비회원 배송조회
            </button>
            <div className="m-4 border-b border-gray-200"></div>
            <div className="text-center border border-[var(--color-blue-600)] text-[var(--color-blue-600)] py-2 rounded cursor-pointer">
              회원가입
            </div>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-2 px-5">
          <div className="mb-2">
            <div className="relative border border-gray-300 rounded-t">
              <input
                type="text"
                placeholder="아이디(이메일)"
                className="outline-none px-4 py-2 w-96 border-b-2 border-transparent focus:border-[#0073e9] rounded-t"
              />
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <CloseIcon />
              </span>
            </div>
            <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
              아이디(이메일)를 입력해주세요.
            </div>
          </div>

          <div className="mb-4">
            <div className="relative border border-gray-300 rounded-t">
              <input
                type="text"
                placeholder="비밀번호"
                className="outline-none px-4 py-2 border-b-2 border-transparent focus:border-[#0073e9] rounded-t w-96"
              />
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <PasswordToggle />
              </span>
            </div>
            <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
              비밀번호를 입력해주세요.
            </div>
          </div>

          <div className="text-xs flex flex-row items-center space-evenly w-96">
            <label htmlFor="" className="flex items-center" aria-checked="false">
              <input type="checkbox" className="w-5 h-5 custom-checkbox" />
              <span className="mx-2">자동 로그인</span>
            </label>
            <label htmlFor="" className="flex items-center mr-2" aria-checked="false">
              <input type="checkbox" className="w-5 h-5 custom-checkbox" />
              <span className="mx-2">아이디 저장</span>
            </label>
            <a
              href="/login/accountInfoFind"
              className="text-[var(--color-blue-600)] ml-16 mr-4 right-arrow"
            >
              아이디∙비밀번호 찾기
            </a>
          </div>

          <div className="flex flex-col">
            <button className="bg-[var(--color-blue-600)] text-white border py-2 rounded w-96 my-2 text-center">
              로그인
            </button>
            <div className="flex flex-col items-center justify-center">
              <Link href="/login/social">카톡소셜</Link>
              <div>
                <button>네이버소셜</button>
              </div>
              <div>
                <button>구글소셜</button>
              </div>
              <div>
                <button>애플소셜</button>
              </div>
            </div>
            <div className="m-4 border-b border-gray-200"></div>
            <Link href="/login/memberJoin" className="w-96 my-2">
              <div className="text-center border border-[var(--color-blue-600)] text-[var(--color-blue-600)] py-2 rounded">
                회원가입
              </div>
            </Link>
            <p className="text-center text-xs text-gray-500 py-4">
              &copy; &nbsp;박수지. All Rights Reserved.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthMenu;
