import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/firebases/admin";

export async function POST(req: NextRequest) {
  // 💬 클라이언트에서 받은 idToken을 추출
  const { idToken } = await req.json();

  // 🕓 세션 유지 시간 (5일)
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // ✅ Firebase Admin SDK로 세션 쿠키 생성
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

  // 🍪 세션 쿠키를 클라이언트에 설정 (HttpOnly로 보안 강화)
  const res = NextResponse.json({ success: true });

  res.cookies.set("session", sessionCookie, {
    maxAge: expiresIn / 1000,
    httpOnly: true, // JS에서 접근 불가 → XSS 방어
    secure: true, // HTTPS에서만 전송
    path: "/", // 모든 경로에 적용
  });

  return res;
}
