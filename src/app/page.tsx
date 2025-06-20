"use client";

import Carousel from "@/components/carousel/Carousel";

// app/page.tsx: 메인 페이지 내용만 표시됨
export default function Home() {
  return (
    <main className="p2- sm:p-2 min-h-screen">
      <section className="text-center">
        <Carousel />

        <p className="text-lg">쇼핑몰 홈 화면입니다.</p>
        <p className="text-gray-500 mt-2">
          상단 바, 메인페이지, 푸터는 Layout.tsx를 통해 자동 적용됩니다.
        </p>

        {/* Main Content */}
        <div>무한 스크롤 콘텐츠</div>
        {/* <div className="flex-grow overflow-y-auto">
        <p className="text-center py-4">무한 스크롤 콘텐츠</p>
        <div className="h-[2000px] bg-gray-50">
          <p className="text-center pt-4">스크롤 가능한 콘텐츠가 여기에 있습니다.</p>
        </div>
      </div> */}
      </section>
    </main>
  );
}
