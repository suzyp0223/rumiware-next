import OrderState from "../order/OrderState";
import RecentOrderList from "../order/RecentOrderList";
import MyPageSideNav from "./MyPageSideNav";
import WishList from "./WishList";

const MyPageMain = () => {
  return (
    // 참고 stl 마이페이지
    <div className="mt-12 max-w-7xl mx-auto flex gap-6">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold tracking-wider">마이페이지</h1>
        </div>

        {/* 주문 처리 현황 */}
        {/* OrderState > OrderSearch (OrderedList) > OrderDetail */}
        {/* OrderState > 주문조회 > 주문상세 */}
        <OrderState />

        {/* 최근 주문 정보 */}
        <RecentOrderList />

        {/* 찜한상품-WishList */}
        <WishList />

        {/* 최근 본 상품 */}
      </section>
    </div>
  );
};

export default MyPageMain;
