import MyPageSideNav from "../myPage/MyPageSideNav";
import CouponHistory from "./CouponHistory";

const CouponHistoryMain = () => {
  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px] caret-transparent">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 쿠폰내역 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <CouponHistory />
      </section>
    </div>
  );
};

export default CouponHistoryMain;
