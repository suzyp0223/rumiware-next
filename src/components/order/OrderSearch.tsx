import Image from "next/image";
import Link from "next/link";
import MyPageSideNav from "../myPage/MyPageSideNav";

const OrderSearch = () => {
  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 주문 내역 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">주문조회</h3>
        </div>

        <div className="">
          <ul className="flex flex-row">
            <li>
              <Link href="">
                <span>주문내역조회</span>
                <span>(10)</span>
              </Link>
            </li>
            <li>
              <Link href="">
                <span>취소/반품/교환 내역</span>
                <span>(1)</span>
              </Link>
            </li>
          </ul>
        </div>

        {/*
          🎁 보너스: 타입 자동 추론
          ts
          복사
          편집
          const shoppingTypes = ["주문내역", "최근본상품", "관심상품"] as const;
          type ShoppingType = (typeof shoppingTypes)[number]; // "주문내역" | ...
          이런 방식으로 단일 리스트 타입만 쓸 수도 있고, 지금처럼 그룹이 있는 경우엔 NavGroup[]이 더 확장성 있어요.
      */}
        <form>
          <fieldset className="form">
            <legend>검색기간설정</legend>

            {/* 주문 상태 셀렉트 */}
            <div className="stateSelect ">
              <select id="order_status" name="order_status" className="fSelect">
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
            <span className="period flex gap-2 mb-4">
              <a href="#none" className="" data-days="00">
                오늘
              </a>
              <a href="#none" className="" data-days="30">
                1개월
              </a>
              <a href="#none" className="" data-days="90">
                3개월
              </a>
              <a href="#none" className="" data-days="180">
                6개월
              </a>
            </span>

            {/* 날짜 입력 */}
            <div className="date">
              <span className="">
                <input
                  id="history_start_date"
                  name="history_start_date"
                  className=""
                  readOnly
                  size={10}
                  value="2025-03-26"
                  type="text"
                />
                <button type="button" className="">
                  <div className="w-[20px] h-[20px]">
                    <Image src="" alt="달력 아이콘" title="달력 열기" />
                  </div>
                </button>{" "}
                <span> ~ </span>
                <input
                  id="history_end_date"
                  name="history_end_date"
                  className=""
                  readOnly
                  size={10}
                  value="2025-06-24"
                  type="text"
                />
                <button type="button" className="">
                  <div className="w-[20px] h-[20px]">
                    <Image src="" alt="달력 아이콘" title="달력 열기" />
                  </div>
                </button>
              </span>

              {/* 조회 버튼 */}
              <span className="">
                조회
                <input
                  alt="조회"
                  id="order_search_btn"
                  type="image"
                  src=""
                  width={40}
                  height={20}
                />
              </span>
            </div>
          </fieldset>
        </form>

        <div className="overflow-x-auto">
          {/* 주문내역 */}
          <table summary="주문내역, 최근본상품, 관심상품" className="w-full table-fixed">
            <caption className="sr-only">주문 정보 목록</caption>
            <colgroup>
              <col className="w-[10%]" />
              <col className="w-[15%]" />
              <col className="w-[30%]" />
              <col className="w-[15%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
            </colgroup>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrderSearch;
