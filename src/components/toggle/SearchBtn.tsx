"use client";

import { useState } from "react";

import clsx from "clsx";
import Image from "next/image";

import search from "../../assets/icon/search.svg";

export default function SearchBtn() {
  const [showInput, setShowInput] = useState(false);

  const toggleSearch = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <>
      <div className="hidden md:flex items-center">
        {/* 🔍 검색 input + 버튼 */}
        <button
          type="button"
          onClick={toggleSearch}
          className="w-12 h-12 flex items-center justify-center bg-peach-100 "
        >
          <Image src={search} alt="검색" className="w-15 h-15 outline-none" />
        </button>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className={clsx(
            "bg-peach-100 hover:bg-peach-100 ",
            "h-10 border-b rounded-md border-gray-300 outline-none focus:outline-none px-4 text-base",
            "transition-all duration-300 ease-in-out origin-left", // 부드럽게
            showInput ? "opacity-100 scale-x-100 w-[240px]" : "opacity-0 scale-x-0 w-0" // 토글 효과
          )}
        />
      </div>
    </>
  );
}
