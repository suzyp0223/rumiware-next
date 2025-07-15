"use client";

import { useState } from "react";

import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";

import MyPageSideNav from "../myPage/MyPageSideNav";
import DateRangePicker from "../utils/DateRangePicker ";
import OrderedList from "./OrderedList";

// as const 덕분에 이 배열은 읽기 전용(Readonly) 튜플로 간주되어 각 요소의 key, label이 리터럴 타입으로 고정.
const orderTabTypeList = [
  { key: "orderDetail", label: "주문내역 조회" },
  { key: "cancelDetail", label: "취소/반품/교환 내역" },
] as const;
type OrderTabTypeLabel = (typeof orderTabTypeList)[number]["label"];
// type OrderTabLabel = "주문내역 조회" | "취소/반품/교환 내역";

const periodList = [
  { label: "오늘", days: "00", key: "today" },
  { label: "1개월", days: "30", key: "oneMonth" },
  { label: "3개월", days: "90", key: "threeMonth" },
  { label: "6개월", days: "180", key: "sixMonth" },
] as const;
// type PeriodList = (typeof periodList)[number]["label"];

const OrderSearchMain = () => {
  const [selectedTab, setSelectedTab] = useState<OrderTabTypeLabel>("주문내역 조회");

  return (
    <div className="mt-12 max-w-7xl mx-auto flex gap-6">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 주문 내역 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">주문조회</h3>
        </div>

        <div className=" ">
          <ul className="flex flex-row w-full items-center gap-2 text-center py-4 mb-4">
            {orderTabTypeList.map(({ label }) => (
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
                  <span>{label}</span>
                  <span>(10)</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*
          🎁 보너스: 타입 자동 추론
          ts
          복사
          편집
          const shoppingTypes = ["주문내역", "최근본상품", "찜한 상품"] as const;
          type ShoppingType = (typeof shoppingTypes)[number]; // "주문내역" | ...
          이런 방식으로 단일 리스트 타입만 쓸 수도 있고, 지금처럼 그룹이 있는 경우엔 NavGroup[]이 더 확장성 있어요.
         */}
        <form className="mb-10">
          <fieldset>
            <legend className="sr-only">검색기간설정</legend>

            {/* 주문 상태 셀렉트 */}
            <div className="mb-2 flex w-full overflow-visible down-arrow">
              <select
                id="order_status"
                name="order_status"
                className="appearance-none bg-white border border-gray-300 rounded
                px-4 py-2 outline-none w-full hover:border-peach-400"
              >
                <option value="all">전체 주문처리상태</option>
                <option value="shipped_before">입금전</option>
                <option value="shipped_standby">배송준비중</option>
                <option value="shipped_begin">배송중</option>
                <option value="shipped_complete" defaultValue="selected">
                  배송완료
                </option>
                <option value="order_cancel">취소</option>
                <option value="order_exchange">교환</option>
                <option value="order_return">반품</option>
              </select>
            </div>

            {/* 기간 버튼 */}
            <span className="period flex flex-row justify-around gap-2 mb-2 border border-gray-300 rounded">
              {periodList.map((item) => (
                <Link
                  key={item.label}
                  href="#none"
                  className="w-1/4 block px-4 py-2 text-center hover:bg-peach-200 hover:rounded"
                  data-days={item.days}
                >
                  {item.label}
                </Link>
              ))}
            </span>

            {/* 날짜 입력 */}
            <DateRangePicker />
          </fieldset>
        </form>

        <div className="">
          {/* 주문내역 */}
          <OrderedList />
        </div>
      </section>
    </div>
  );
};

export default OrderSearchMain;
