import MyPageSideNav from "./MyPageSideNav";

const MyArticle = () => {
  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 찜한 상품 */}
      {/* 쿠팡, 지마켓참고 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">리뷰관리</h3>
        </div>
      </section>
    </div>
  );
};

export default MyArticle;
