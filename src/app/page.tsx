"use client";

import Carousel from "@/components/carousel/Carousel";

// app/page.tsx: 메인 페이지 내용만 표시됨
export default function Home() {
  return (
    <main className="p-8 sm:p-20 min-h-screen">
      <section className="text-center">
        <Carousel />
        <p className="text-lg">쇼핑몰 홈 화면입니다.</p>
        <p className="text-gray-500 mt-2">
          상단 바, 메인페이지, 푸터는 Layout.tsx를 통해 자동 적용됩니다.
        </p>
        <div>무한 스크롤 콘텐츠</div>
      </section>
    </main>
  );
}
