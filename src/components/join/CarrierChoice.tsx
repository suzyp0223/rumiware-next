"use client"; //클라이언트 컴포넌트임을 명시하는 지시문
/** 'use client'를 작성하는 이유
 * 기본은 서버 컴포넌트이기 때문.
 *
 * Next.js(App Router 기준)에서는 .tsx 파일은 기본적으로 서버 컴포넌트입니다.
    → 서버에서 실행되고, HTML을 생성해서 클라이언트에 전달해요.
    하지만:
    상태(useState)
    이펙트(useEffect)
    이벤트 핸들러 (onClick, onChange)
    브라우저 API (localStorage, window 등)
    이런 브라우저 전용 기능을 쓰려면 클라이언트 컴포넌트여야 합니다.
 */

// 통신사 선택
import { useState } from "react";
import DownArrIcon from "../icons/DownArrIcon";

const CarrierChoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState("통신사 선택");
  const [phone, setPhone] = useState("");

  const formatPhoneNum = (value: string) => {
    // 숫자가 아닌 모든 문자(공백 포함)를 제거
    const onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7) {
      return `${onlyNumbers.slice(0, 3)} - ${onlyNumbers.slice(3)}`;
    } else {
      return `${onlyNumbers.slice(0, 3)} - ${onlyNumbers.slice(3, 7)} - ${onlyNumbers.slice(
        7,
        11
      )}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhone(formatPhoneNum(input));
  };

  const carrierList = ["KT", "KT 알뜰폰", "LG U+", "LG U+ 알뜰폰", "SKT", "SKT 알뜰폰"];

  return (
    <li className="">
      <div className="border border-gray-300 rounded">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-row space-around items-center gap-2 m-2 hover:text-[#0073e9]"
        >
          <span className="">{selectedCarrier}</span>
          <DownArrIcon />
        </button>

        {/* 논리 AND 연산자 - isOpen이 true면 괄호 안 JSX를 실행(렌더링)해라! */}
        {isOpen && (
          <ul className="absolute bg-white w-26 z-10 shadow-md text-xs">
            {carrierList.map((carrier) => (
              <li className="" key={carrier}>
                <button
                  type="button"
                  className="block w-full text-left p-2  hover:bg-gray-100  hover:text-[#0073e9]"
                  onClick={() => {
                    setSelectedCarrier(carrier);
                    setIsOpen(false);
                  }}
                >
                  {carrier}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="px-2 py-2">
          <input
            value={phone}
            type="tel"
            maxLength={17}
            placeholder="휴대전화번호"
            onChange={handleChange}
            className="outline-none  w-full max-w-md pl-3  border-b border-transparent focus:border-[#0073e9] "
          />
        </div>
      </div>
      <div className="bg-[#0073e9] text-white mt-4 rounded  border hover:border-[#0073e9] hover:bg-white hover:text-[#0073e9]">
        <button type="button" className="outline-none w-full p-2">
          인증요청
        </button>
      </div>
    </li>
  );
};

export default CarrierChoice;
