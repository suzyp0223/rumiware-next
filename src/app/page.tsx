"use client";

// app/page.tsx: 메인 페이지 내용만 표시됨
export default function Home() {
  return (
    <main className="p-8 sm:p-20 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">루미웨어 메인 페이지</h1>
      {/* 예시 콘텐츠 */}
      <section className="text-center">
        <div>{/* 무한 스크롤 콘텐츠 */}</div>
        <p className="text-lg">쇼핑몰 홈 화면입니다.</p>
        <p className="text-gray-500 mt-2">
          상단 바, 사이드바, 푸터는 Layout.tsx를 통해 자동 적용됩니다.
        </p>
      </section>
    </main>
  );
}
