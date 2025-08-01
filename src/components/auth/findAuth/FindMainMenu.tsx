"use client";

import { useState } from "react";
import FindAuthForm from "./FindAuthForm";
import ResetPwdForm from "./ResetPwdForm";

const findAuthTypeList = [
  { key: "email", label: "아이디 찾기" },
  { key: "tempPwd", label: "임시 비밀번호 발급" },
] as const; // as const로 불변 튜플로 고정.
type FindAuthType = (typeof findAuthTypeList)[number]["key"];

const FindMainMenu = () => {
  const [activeTab, setActiveTab] = useState<FindAuthType>("email");

  return (
    <div
      className="flex flex-col items-center justify-center text-lg gap-8 py-5 w-fit mx-auto
        border border-gray-200  mt-12"
    >
      <h1 className="text-3xl mb-3">아이디/비밀번호 찾기</h1>

      {/* <Find AuthHeader /> */}
      <ul className="flex flex-row gap-2 text-center px-4">
        {findAuthTypeList.map(({ key, label }) => (
          <li key={key} className="px-2" onClick={() => setActiveTab(key)}>
            <div className={`hover:text-blue-600 ${activeTab === key ? "text-blue-600" : ""}`}>
              {label}
            </div>
            {activeTab === key && <div className="border-b border-blue-600 pb-2"></div>}
          </li>
        ))}
      </ul>

      {activeTab === "email" && <FindAuthForm />}
      {activeTab === "tempPwd" && <ResetPwdForm />}
    </div>
  );
};

export default FindMainMenu;
