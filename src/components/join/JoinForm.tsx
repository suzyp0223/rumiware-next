"use client";

import { useEffect, useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";

import CarrierChoice from "./CarrierChoice";

const JoinForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("db,", db);
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        createAt: serverTimestamp(),
        isAdmin: false,
      });

      alert("회원가입 및 정보 저장 성공!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("회원가입 오류:", error);
      } else {
        alert("알 수 없는 오류가 발생했습니다");
      }
    }
  };

  return (
    <form className="flex flex-col  px-5">
      <div
        className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto
        border border-gray-200  mt-12"
      >
        <h1 className="text-3xl mb-3">회원가입</h1>
        <ul className="flex flex-row text-center px-4">
          <div className="">
            <li className="mb-4">
              <div className="relative border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="아이디(이메일)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none  px-4 py-2 w-96
                    border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
                <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-4">
                  아이디(이메일) 중복 확인
                </button>
              </div>

              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-blue-500)] ml-2 mt-2 text-left">
                  사용 가능한 아이디(이메일)입니다.
                </span>
                <span className="text-[var(--color-red-500)] mx-2 mt-2 hidden  text-left">
                  아이디(이메일)가 중복입니다. 다시 입력해주세요.
                </span>
              </div>
            </li>

            <li className="mb-4">
              <div className="border border-gray-300 ">
                <input
                  type="text"
                  placeholder="비밀번호"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  className="outline-none  px-4 py-2 w-96
                  border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-col text-xs mb-4">
                <span className="text-[var(--color-blue-500)] mx-2 mt-2 text-left">
                  비밀번호 확인을 입력해주세요.
                </span>
              </div>
              <div className="border border-gray-300 rounded-b">
                <input
                  type="text"
                  placeholder="비밀번호 확인"
                  className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-red-500)] mx-2 mt-2 text-left">
                  비밀번호가 다릅니다.&nbsp; 다시 입력해주세요.
                </span>
              </div>
            </li>

            <li>
              <div className="border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
            </li>

            <li className="pb-2">
              <div className="border border-gray-300 border-y-0">
                <input
                  type="text"
                  placeholder="생년월일 8자리"
                  className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9]  mr-2"
                />
              </div>
              <div className="flex border border-gray-300 rounded-b w-full p-2 text-sm">
                {/* 성별 */}
                <div className="w-1/2 flex mr-2">
                  {["남자", "여자"].map((label, idx) => (
                    <div key={label} className="relative flex-1">
                      <input
                        type="radio"
                        name="gender"
                        value={label}
                        id={`gender-${idx}`}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`gender-${idx}`}
                        className={`block text-center px-4 py-2 border border-gray-300
                          hover:border-blue-600 peer-checked:border-blue-600 cursor-pointer
                          ${idx === 0 ? "rounded-l border-r-0" : ""}
                          ${idx === 1 ? "rounded-r" : "-ml-px"}
                          `}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* 내·외국인 */}
                <div className="w-1/2 flex text-sm">
                  {["내국인", "외국인"].map((label, idx) => (
                    <div key={label} className="relative flex-1">
                      <input
                        type="radio"
                        name="nationality"
                        value={label}
                        id={`nationality-${idx}`}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`nationality-${idx}`}
                        className={`block text-center px-4 py-2 border border-gray-300
                        hover:border-blue-600 peer-checked:border-blue-600 cursor-pointer
                        ${idx === 0 ? "rounded-l border-r-0" : ""}
                        ${idx === 1 ? "rounded-r" : "-ml-px"}
                        `}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li className="py-2">
              <div className="">
                <ul className="text-s">
                  <CarrierChoice />
                </ul>
              </div>
            </li>

            <button
              onClick={handleSignUp}
              className="w-full border border-blue-600 text-blue-600 hover:text-blue-800 hover:border-blue-800 p-2 mt-4 rounded"
            >
              가입하기
            </button>
          </div>
        </ul>
      </div>
    </form>
  );
};

export default JoinForm;
