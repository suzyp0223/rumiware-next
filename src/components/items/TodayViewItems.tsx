import Link from "next/link";
import MyPageSideNav from "../myPage/MyPageSideNav";

const TodayViewItems = () => {
  return (
    <div className="mt-12 max-w-7xl mx-auto flex gap-6">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 주문 내역 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">오늘 본 상품</h3>
        </div>

        <div className="overflow-x-auto">
          <table summary="주문일자, 상품명, 결제금액, 주문상세" className="w-full table-fixed">
            <caption className="sr-only">주문 정보 목록</caption>
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[30%]" />
              <col className="w-[10%]" />
              <col className="w-[10%]" />
              <col className="w-[12%]" />
              <col className="w-[16%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="text-sm border-b">
                <th className="py-4 text-sm">
                  <div>
                    <input type="checkbox" />
                  </div>
                </th>
                <th>상품</th>
                <th>수량</th>
                <th>재고</th>
                <th>적립금</th>
                <th>장바구니</th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-gray-800 border-b text-sm">
                <td className="py-4 px-2 items-center text-center">1</td>
                <td className="py-4 px-2 items-center text-center">2023.01.02</td>
                <td className="py-4 px-2 items-center text-center">
                  <div>
                    <p>상품이름 외 10건</p>
                  </div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <div>15,000원</div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  {/* 주문상세내역 아코디언으로 구현 */}
                  <div>
                    <Link
                      href="/order/orderDetailMain"
                      className="border border-peach-300 px-3 py-2 rounded"
                    >
                      상세조회
                    </Link>
                  </div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <Link
                    href="/order/OrderDetailMain"
                    className="bg-peach-300 text-sm px-3 py-2 tracking-widest rounded"
                  >
                    조회
                  </Link>
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

export default TodayViewItems;
