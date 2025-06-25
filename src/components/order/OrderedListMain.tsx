import MyPageSideNav from "../myPage/MyPageSideNav";
import OrderedList from "./OrderedList";

const OrderedListMain = () => {
  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 주문 내역 */}
      <OrderedList />
    </div>
  );
};

export default OrderedListMain;
