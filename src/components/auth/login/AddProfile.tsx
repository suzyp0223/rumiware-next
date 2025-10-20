"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebases/firebase";

const AddProfile = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const userData = {
      uid: user.uid,
      email: user.email ?? "",
      name,
      birthDate,
      phoneNumber: phone.replace(/\D/g, ""),
      emailVerified: user.emailVerified,
      isAdmin: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userData);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-[360px] mx-auto mt-10 border border-gray-300 rounded-lg shadow-md p-6 flex flex-col bg-white"
    >
      {/* 이름 입력 */}
      <div className="mb-4 border-b border-gray-300 focus-within:border-blue-500 transition-colors">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          className="w-full outline-none py-2 px-1 text-base focus:border-b-blue-500"
        />
      </div>

      {/* 생년월일 입력 */}
      <div className="mb-4 border-b border-gray-300 focus-within:border-blue-500 transition-colors">
        <input
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          placeholder="생년월일 (예: 19910301)"
          className="w-full outline-none py-2 px-1 text-base focus:border-b-blue-500"
        />
      </div>

      {/* 전화번호 입력 */}
      <div className="mb-6 border-b border-gray-300 focus-within:border-blue-500 transition-colors">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호"
          className="w-full outline-none py-2 px-1 text-base focus:border-b-blue-500"
        />
      </div>

      {/* ✅ 완료 버튼 — 맨 아래 고정 느낌 */}
      <div className="mt-auto pt-4 border-gray-200">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          완료
        </button>
      </div>
    </form>
  );
};

export default AddProfile;
