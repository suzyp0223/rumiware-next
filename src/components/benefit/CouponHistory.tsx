"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import CloseIcon from "../icons/CloseIcon";

const CouponHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      // 폼이 열릴 때 첫 번째 input에 자동 포커스
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase(); // 대문자로 변환
    const isValid = /^[A-Z0-9]*$/.test(value); // 알파벳+숫자만

    if (!isValid) {
      alert("영어 대문자와 숫자만 입력해 주세요.");
      return;
    }

    // 값 업데이트
    e.target.value = value;

    // 다음 input으로 포커스 이동
    if (value.length === 4 && inputRefs.current[idx + 1]) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(); // 쿠폰등록 함수 호출
    }
  };
  const handleSubmit = () => {
    const fullCode = inputRefs.current.map((ref) => ref?.value).join("-");
    if (fullCode.length === 19) {
      console.log("쿠폰 등록 시도:", fullCode); // 등록 로직 작성
      alert(`등록된 쿠폰번호: ${fullCode}`);
    } else {
      alert("쿠폰번호가 올바르지 않습니다.");
    }
  };

  return (
    <>
      {/* 쿠폰내역*/}
      <div className="tracking-widest border-b border-black px-4 pb-2 flex justify-between">
        <h3 className="font-medium text-lg">쿠폰내역</h3>
        <span>
          {isOpen ? (
            <button type="button" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="py-2 px-2 border border-peach-300 bg-peach-300 text-gray-900 rounded text-xs text-right"
            >
              쿠폰번호등록
            </button>
          )}
        </span>
      </div>

      {/* 쿠폰번호등록 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="couponForm"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="tracking-widest px-4 pb-6 flex flex-col justify-between mt-10 mb-10">
              <h3 className="font-medium text-lg mb-2">쿠폰번호등록</h3>
              <div className="border-t border-b border-black text-center">
                <div className="text-xs mt-2 text-left">
                  <p>시리얼번호는 영문자+숫자의 조합이며, 총 16자리 입니다.</p>
                  <p>예)AB12-CD23-EF56-123A</p>
                </div>
                <div className="p-8">
                  {[...Array(4)].map((_, idx) => (
                    <span key={idx} className="">
                      <input
                        type="text"
                        maxLength={4}
                        ref={(el) => {
                          inputRefs.current[idx] = el!;
                        }}
                        onChange={(e) => handleChange(idx, e)}
                        onKeyDown={handleKeyDown}
                        className="border border-peach-300 rounded outline-none w-[100px] py-1 px-2 text-center"
                      />
                      {idx < 3 && <span className="mx-2 text-gray-700">-</span>}
                    </span>
                  ))}
                </div>

                <div className="text-sm m-6 text-center">
                  <Link
                    href=""
                    className="border border-peach-300 bg-peach-300 text-gray-800 rounded py-4 px-10 "
                  >
                    쿠폰등록
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="">
        <table summary="보유 적립금, 출석체크 누적금" className="w-full table-fixed">
          <caption className="sr-only">적립금액</caption>
          <colgroup>
            <col style={{ width: "*" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "180px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "100px" }} />
          </colgroup>
          <thead className="border-b">
            <tr className="text-sm border-b bg-peach-100">
              <th scope="row" className="text-center py-2 font-normal ">
                쿠폰명
              </th>
              <th className="text-center py-2 font-normal">할인액(율)</th>
              <th scope="row" className="text-center py-2 font-normal">
                적용기준
              </th>
              <th className="text-center py-2 font-normal">제한조건</th>
              <th className="text-center py-2 font-normal">유효기간</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className=" py-4 pl-4">
                <div>첫 구매 고객 축하쿠폰</div>
              </td>
              <td className=" py-4 px-2">
                <div>30,000원</div>
              </td>
              <td className=" py-4 px-2">
                <div>100,000원 이상 구매시</div>
              </td>
              <td className=" py-4 px-2">
                <div>적용조건</div>
              </td>
              <td className=" py-4 px-2">
                <div>25/07/25</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CouponHistory;
