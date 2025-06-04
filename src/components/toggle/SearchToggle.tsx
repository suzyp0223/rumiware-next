"use client";

import { useRef, useState } from "react";

import Image from "next/image";
import close from "../../assets/icon/close.svg";
import search from "../../assets/icon/search.svg";

import useClickOutside from "@/hooks/useClickOutside";

const SearchToggle = () => {
  const [showInput, setShowInput] = useState(false);

  // 모달 외부 클릭시 모달종료
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggle = () => {
    setShowInput((prev) => !prev);
  };

  //외부 클릭 시 닫기
  useClickOutside(inputRef, () => setShowInput(false), showInput);

  return (
    <div className="relative flex items-center">
      {/* 🔍 버튼 */}
      <button
        type="button"
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center  bg-white"
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
        <Image
          key={showInput ? "close" : "search"} // 🔑 캐시 무효화용
          src={showInput ? close : search}
          alt={showInput ? "닫기" : "검색"}
          className="w-10 h-10 bg-peach-pink"
          unoptimized
        />
      </button>

      {/* 🔽 input 토글 영역 */}
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-1 h-10 border-b rounded-md border-gray-300 focus:outline-none px-4 text-base hover:border-gray-900"
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchToggle;
