import Image from "next/image";
import Link from "next/link";

const RecentOrderList = () => {
  return (
    <div className="mt-16">
      <div className="tracking-widest flex flex-row items-center justify-between pb-4 border-b-2 border-black ">
        <h1 className="font-medium text-lg">최근 주문 정보</h1>
        <Link href="" className="text-sm mr-6 ">
          전체보기
        </Link>
      </div>

      <div>
        <table className="w-full">
          <caption className="sr-only">최근 주문 정보 목록</caption>
          <colgroup>
            <col className="w-[15%]" />
            <col className="w-[55%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead className="">
            <tr className="text-sm border-b border-gray-300">
              {["주문일자", "상품명", "결제금액", "주문상세"].map((label) => (
                <th key={label} className="p-4 font-normal">
                  <div>{label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800 border-b">
              <td className="py-4 px-2 items-center text-center">2025.06.21</td>
              <td className="py-4 px-2 flex flex-row text-center">
                <div className="flex flex-row items-center">
                  <Link href="">
                    <div className="w-[100px] h-[140px] relative bg-peach-300">
                      <Image src="/assets/items/item1.jpg" alt="" fill className=""></Image>
                    </div>
                  </Link>
                </div>
                <div className="ml-4">
                  <p>
                    <Link href="">핑크자수 H라인 치마 외 14건</Link>
                  </p>
                </div>
              </td>
              <td className="py-4 px-2 text-center">
                <div>300,000원</div>
              </td>
              <td className="py-4 px-2 text-center">
                <Link
                  href="/order/orderDetail"
                  className="bg-peach-300 text-sm px-3 py-2 tracking-widest rounded"
                >
                  조회
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrderList;
