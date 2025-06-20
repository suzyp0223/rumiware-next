"use client";
import { useState } from "react";

import LoginForm from "./LoginForm";
import NonMemberForm from "./NonMemberForm";
import QrCodeForm from "./QrCodeForm";

const loginTypeList: { key: "email" | "qr" | "nonMember"; label: string }[] = [
  { key: "email", label: "이메일 로그인" },
  { key: "qr", label: "QR코드 로그인" },
  { key: "nonMember", label: "비회원 배송조회" },
];
type LoginType = (typeof loginTypeList)[number]["key"];

// 로그인 그룹
const AuthMainMenu = () => {
  const [activeTab, setActiveTab] = useState<LoginType>("email");

  return (
    <div
      className="flex flex-col items-center justify-center text-lg gap-8 py-5 w-fit mx-auto
        border border-gray-200  mt-12"
    >
      <h1 className="text-3xl mb-3">로그인</h1>

      {/* <AuthHeader /> */}
      <ul className="flex flex-row gap-2 text-center px-4">
        {loginTypeList.map(({ key, label }) => (
          <li key={key} className="px-2" onClick={() => setActiveTab(key)}>
            <div className={`hover:text-[#0073e9] ${activeTab === key ? "text-[#0073e9]" : ""}`}>
              {label}
            </div>
            {activeTab === key && <div className="border-b border-blue-600 pb-2 "></div>}
          </li>
        ))}
      </ul>

      {activeTab === "email" && <LoginForm />}
      {activeTab === "qr" && <QrCodeForm />}
      {activeTab === "nonMember" && <NonMemberForm />}
    </div>
  );
};

export default AuthMainMenu;
