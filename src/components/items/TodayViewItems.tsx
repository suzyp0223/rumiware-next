import Image from "next/image";
import Link from "next/link";
import CheckboxBtn from "../button/CheckboxBtn";
import SelectBtn from "../button/SelectBtn";
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

        {/* 전체선택 / 선택삭제 / 선택 상품 주문 버튼 */}
        <SelectBtn />

        <div className="overflow-x-auto">
          <table summary="주문일자, 상품명, 결제금액, 주문상세" className="w-full table-fixed">
            <caption className="sr-only">주문 정보 목록</caption>
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-auto" />
              <col className="w-[10%]" />
              <col className="w-[8%]" />
              <col className="w-[8%]" />
              <col className="w-[14%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr className="text-sm border-b bg-peach-100">
                <th className="py-4 text-sm my-4">
                  <div>
                    <input type="checkbox" className="hidden" />
                  </div>
                </th>
                <th className="py-4">상품</th>
                <th>수량</th>
                <th>재고</th>
                <th>적립금</th>
                <th>가격</th>
                <th>장바구니</th>
              </tr>
            </thead>

            <tbody>
              <tr className="text-gray-800 border-b text-sm">
                <td className="py-4 px-2 items-center text-center">
                  <div>
                    <label className="flex items-center gap-2" htmlFor="selectAll">
                      <CheckboxBtn id="selectAll" />
                    </label>
                  </div>
                </td>

                <td className="py-4 px-2 flex flex-row items-center text-center">
                  <div className="">
                    <Link href="">
                      <div className="w-[80px] h-[100px] relative bg-peach-300">
                        <Image
                          src="/assets/items/item1.jpg"
                          alt="핑크자수치마"
                          fill
                          className=""
                        ></Image>
                      </div>
                    </Link>
                  </div>
                  <div className="ml-4 text-left">
                    <p className="pb-2">
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
                    </p>
                  </div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <div>1개</div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <div>있음</div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <div>200원</div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <div className="font-semibold">1,250,000원</div>
                </td>
                <td className="py-4 px-2 items-center text-center">
                  <Link
                    href="/order/OrderDetailMain"
                    className="bg-peach-300 text-sm px-3 py-2 tracking-widest rounded"
                  >
                    담기
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
