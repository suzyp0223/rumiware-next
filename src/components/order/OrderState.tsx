import Link from "next/link";

const OrderState = () => {
  return (
    <div>
      <ul className="border-t border-b border-gray-300 p-4 flex">
        {["입금 전", "배송준비 중", "배송 중", "배송 완료"].map((label, idx) => (
          <li
            key={label}
            className={`w-1/4 flex flex-col items-center
          ${idx !== 3 ? "right-arrow-gray" : ""}`}
          >
            {/* map에따가 페이지 상태 달리해서 보이기 -나노네추럴 참고 */}
            <Link href="/order/orderSearch">
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
  );
};

export default OrderState;
