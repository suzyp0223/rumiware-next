"use client";

import { useState } from "react";

import Link from "next/link";

import MyPageSideNav from "../MyPageSideNav";
import ReviewWrite from "./ReviewWrite";
import ReviewWritten from "./ReviewWritten";

// as const 덕분에 이 배열은 읽기 전용(Readonly) 튜플로 간주되어 각 요소의 key, label이 리터럴 타입으로 고정.
const reviewTabTypeList = [
  { key: "writeReview", label: "리뷰 작성" },
  { key: "writtenReview", label: "작성한 리뷰" },
] as const;
type ReviewTabTypeLabel = (typeof reviewTabTypeList)[number]["key"];

const MyReview = () => {
  const [selectedTab, setSelectedTab] = useState<ReviewTabTypeLabel>("writeReview");

  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 찜한 상품 */}
      {/* 쿠팡, 지마켓참고 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">리뷰관리</h3>
        </div>

        <div className=" ">
          <ul className="flex flex-row w-full items-center gap-2 text-center py-4 mb-4">
            {reviewTabTypeList.map(({ key, label }) => (
              <li
                key={key}
                onClick={() => setSelectedTab(key)}
                className={`flex-1 w-1/2 min-h-[60px] p-4 rounded text-gray-800 cursor-pointer border
              ${
                selectedTab === key ? "bg-peach-400 border-peach-400" : "bg-white border-peach-400"
              }`}
              >
                <Link href="">
                  <span className="pr-2">{label}</span>
                  {label === "리뷰 작성" && (
                    <span className="relative">
                      <span className="mr-2">10</span>
                      <span className="text-[8px] text-white absolute -top-2 -right-3">NEW</span>
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-x-auto">
          {selectedTab === "writeReview" && <ReviewWrite />}
          {selectedTab === "writtenReview" && <ReviewWritten />}

          {/* 페이지네이션 */}
          <div>
            <Link href=""></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyReview;
