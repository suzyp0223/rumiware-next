"use client";

import Image from "next/image";
import Link from "next/link";
import MyPageSideNav from "./MyPageSideNav";
import { useState } from "react";
import CloseIcon from "../icons/CloseIcon";

// as const 덕분에 이 배열은 읽기 전용(Readonly) 튜플로 간주되어 각 요소의 key, label이 리터럴 타입으로 고정.
const reviewTabTypeList = [
  { key: "writeReview", label: "리뷰 작성" },
  { key: "wroteReview", label: "작성한 리뷰" },
] as const;
type ReviewTabTypeLabel = (typeof reviewTabTypeList)[number]["label"];

const MyReview = () => {
  const [selectedTab, setSelectedTab] = useState<ReviewTabTypeLabel>("리뷰 작성");

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
            {reviewTabTypeList.map(({ label }) => (
              <li
                key={label}
                onClick={() => setSelectedTab(label)}
                className={`flex-1 w-1/2 min-h-[60px] p-4 rounded text-gray-800 cursor-pointer border
              ${
                selectedTab === label
                  ? "bg-peach-400 border-peach-400"
                  : "bg-white border-peach-400"
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
          <table summary="주문일자, 상품명, 결제금액, 주문상세" className="w-full table-fixed">
            <caption className="sr-only">주문 정보 목록</caption>
            <colgroup>
              <col className="w-[*]" />
              <col className="w-[25%]" />
            </colgroup>

            <tbody>
              <tr className="text-gray-800 border-b text-sm">
                <td className="py-4 px-2 flex flex-row text-center">
                  <div className="flex flex-row items-center">
                    <Link href="">
                      <div className="w-[100px] h-[140px] relative bg-peach-300">
                        <Image src="/assets/items/item1.jpg" alt="" fill className=""></Image>
                      </div>
                    </Link>
                  </div>
                  <div className="ml-4 my-2 text-left">
                    <div className="mb-4">
                      <Link href="">별별별별별</Link>
                    </div>
                    <div className="mb-6">
                      <p>
                        <Link href="">핑크자수 H라인 치마 외 14건</Link>
                      </p>
                      <p className="text-gray-600 text-sm py-2">
                        <span>
                          색상:&nbsp;
                          <span>핑크</span>
                        </span>
                        <span className="px-2">|</span>
                        <span>
                          사이즈:&nbsp;
                          <span>M</span>
                        </span>
                        <span className="px-2">|</span>
                        <span>
                          수량:&nbsp;
                          <span>1개</span>
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="">
                        <span>
                          <span>2025.06.26</span> 배송
                        </span>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  {/* 주문상세내역 아코디언으로 구현 */}
                  <div className="flex flex-col items-center gap-6">
                    <Link
                      href="/order/OrderDetailMain"
                      className="border border-peach-300 bg-peach-300 text-gray-800 px-3 py-2 rounded"
                    >
                      상세조회
                    </Link>
                    <CloseIcon />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

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
