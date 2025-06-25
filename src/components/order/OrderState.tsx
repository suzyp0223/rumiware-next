import Link from "next/link";

const OrderState = () => {
  return (
    <>
      <div className="p-4 tracking-widest flex flex-row items-center justify-between">
        <h3 className="font-medium text-lg">
          주문 처리 현황
          <span className="ml-4 text-sm font-light text-gray-700">( 최근 3개월 )</span>
        </h3>
        <Link href="/order/orderSearchMain" className="text-sm mr-6 right-arrow-view">
          전체보기
        </Link>
      </div>
      <div>
        <ul className="border-t border-b border-gray-300 p-4 flex">
          {["입금 전", "배송준비 중", "배송 중", "배송 완료"].map((label, idx) => (
            <li
              key={label}
              className={`w-1/4 flex flex-col items-center
            ${idx !== 3 ? "right-arrow-gray" : ""}`}
            >
              {/* map에따가 페이지 상태 달리해서 보이기 -나노네추럴 참고 */}
              <Link href="/order/orderSearchMain">
                <span className="font-bold text-xl">0</span>
              </Link>
              <span className="mt-4 text-sm">{label}</span>
            </li>
          ))}
        </ul>

        <ul className="border-b border-gray-300 flex items-center">
          {["취소", "교환", "반품"].map((label, idx) => (
            <li
              key={label}
              className={`
                flex justify-between items-center
                w-1/3 h-10 border-r border-gray-300 py-6
              ${idx === 2 ? "border-r-0" : ""}`}
            >
              <Link href={""} className="flex justify-between items-center w-full">
                <strong className="ml-6 text-sm font-normal">{label} :</strong>
                <span className="text-right mr-6">0</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OrderState;
