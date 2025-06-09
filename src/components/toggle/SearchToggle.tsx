"use client";

import { useRef } from "react";

import Image from "next/image";
import search from "../../assets/icon/search.svg";
import CloseIcon from "../icons/CloseIcon";

import useClickOutside from "@/hooks/useClickOutside";
import useToggleBtn from "@/hooks/useToggleBtn";
import clsx from "clsx";

const SearchToggle = () => {
  const { isOpen: showInput, toggle, close } = useToggleBtn();

  // 모달 외부 클릭시 모달종료
  const inputRef = useRef<HTMLInputElement | null>(null);

  //외부 클릭 시 닫기
  useClickOutside(inputRef, close, showInput);

  return (
    <div className="flex items-center">
      {/* 🔍 버튼 */}
      <button
        type="button"
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center"
        aria-label={showInput ? "검색 닫기" : "검색 열기"}
      >
        {/* 오류수정
        상황:
          써치버튼 클릭시 x, input 활성화됨 반대로 x 클릭시 써치버튼 활성화 안됨.

        이유: Next.js의 <Image /> 컴포넌트는 최적화를 위해 내부적으로 이미지 캐싱을 강하게 적용합니다.
          그래서 src만 바꿔도 리렌더링이 안 될 수 있어요.
          <Image src={search} /> → <Image src={close} />
          이렇게 하면 src는 바뀌었지만, Next.js가 내부적으로 같은 컴포넌트로 판단해서 업데이트를 생략합니다.

        해결:
          key={showInput ? "close" : "search"} // 🔑 캐시 무효화용 코드 추가
          key 값이 바뀌면 React는 이 컴포넌트를 새로운 컴포넌트로 인식하고 다시 렌더링합니다.
          그래서 close → search 이미지 변경이 정상 반영됩니다.

        */}
        {showInput ? (
          <CloseIcon />
        ) : (
          <Image
            key={showInput ? "close" : "search"} // 🔑 캐시 무효화용
            src={search}
            alt={showInput ? "닫기" : "검색"}
            className="w-10 h-10 bg-peach-pink  hover:bg-[#ffe3dc]"
            unoptimized
          />
        )}
      </button>

      {/* 🔽 input 토글 영역 */}

      <input
        ref={inputRef}
        type="text"
        placeholder="검색어를 입력하세요"
        className={clsx(
          "bg-peach-pink hover:bg-[#ffe3dc] outline-none",
          "h-10 border-b rounded-md border-gray-300 px-4 text-base",
          "transition-all duration-300 ease-in-out",
          showInput ? "opacity-100 w-[240px]" : "opacity-0 w-0 pointer-events-none"
        )}
        autoFocus={showInput}
      />
    </div>
  );
};

export default SearchToggle;
