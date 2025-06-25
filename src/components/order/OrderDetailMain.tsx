import Link from "next/link";
import MyPageSideNav from "../myPage/MyPageSideNav";
import PayInfo from "../pay/PayInfo";
import BuyerInfo from "./BuyerInfo";
import OrderDetail from "./OrderDetail";
import ShippingInfo from "./ShippingInfo";

const OrderDetailMain = () => {
  return (
    // <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
    <div className="mt-12 max-w-7xl mx-auto flex gap-6">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      <div className="w-full max-w-4xl flex flex-col gap-4 min-h-[800px]">
        {/* 주문상세내역 */}
        <OrderDetail />

        {/* 결제 정보 */}
        <PayInfo />

        {/* 주문자 정보 */}
        <BuyerInfo />

        {/* 배송 정보 */}
        <ShippingInfo />

        {/* 주문 목록 보기 */}
        <div className="flex justify-center">
          <Link
            href=""
            className="border border-peach-300 px-6 py-4 rounded hover:bg-peach-300 text-sm hover:text-gray-800"
          >
            주문 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailMain;
