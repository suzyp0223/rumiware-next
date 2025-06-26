import MyPageSideNav from "../myPage/MyPageSideNav";

const PointHistory = () => {
  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 찜한 상품 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">보유중인 적립금</h3>
        </div>
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl mt-16">
          <h3 className="font-medium text-lg">적립금내역</h3>
        </div>
      </section>
    </div>
  );
};

export default PointHistory;
