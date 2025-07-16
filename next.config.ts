import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // ✅ 정적 export 설정 (out 폴더 생성)
  images: {
    unoptimized: true, // ⚠️ Firebase에서는 이미지 최적화 기능 꺼야 에러 없음
  },
};

export default nextConfig;
