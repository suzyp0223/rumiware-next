import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebases/admin";

// 🔐 모든 요청에 대해 실행되는 미들웨어
export async function middleware(req: NextRequest) {
  // 🍪 세션 쿠키 꺼냄
  const sessionCookie = req.cookies.get("session")?.value;

  // ❌ 쿠키가 없으면 로그인 페이지로 리다이렉트
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ 세션 쿠키가 유효한지 Firebase Admin SDK로 검증
    await adminAuth.verifySessionCookie(sessionCookie, true);

    // 통과 → 요청 페이지로 이동 허용
    return NextResponse.next();
  } catch {
    // ❌ 쿠키가 유효하지 않으면 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// 📌 어떤 경로에 이 미들웨어를 적용할지 지정
export const config = {
  matcher: ["/myPage/:path*", "/checkout/:path*"], // 보호할 경로
};
