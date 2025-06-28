import Image from "next/image";
import Link from "next/link";
import CloseIcon from "../icons/CloseIcon";

const MyReviewWrite = () => {
  return (
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
                리뷰 작성하기
              </Link>
              <CloseIcon />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MyReviewWrite;
