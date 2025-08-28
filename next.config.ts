import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // ✅ 정적 export 설정 (out 폴더 생성)
  images: {
    unoptimized: true, // ⚠️ Firebase에서는 이미지 최적화 기능 꺼야 에러 없음
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com", pathname: "/v0/b/**" },
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
