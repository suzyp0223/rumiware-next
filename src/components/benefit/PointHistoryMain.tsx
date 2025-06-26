import MyPageSideNav from "../myPage/MyPageSideNav";
import CurrentPoint from "./CurrentPoint";
import PointHistory from "./PointHistory";

const PointHistoryMain = () => {
  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 보유중인 적립금 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <CurrentPoint />

        {/* 적립금내역 */}
        <PointHistory />
      </section>
    </div>
  );
};

export default PointHistoryMain;
