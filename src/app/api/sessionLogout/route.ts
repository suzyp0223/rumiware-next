import { NextResponse } from "next/server";

export async function POST() {
  // 🍪 세션 쿠키 제거 (maxAge 0)
  const res = NextResponse.json({ success: true });

  // ✅ 세션 쿠키를 '동일한 옵션'으로 즉시 만료
  res.cookies.set("session", "", {
    httpOnly: true, // ✅ 중요
    secure: true, // ✅ 프로덕션(https)에서 중요
    sameSite: "lax",
    path: "/", // ✅ 생성 시와 동일하게
    maxAge: 0, // ✅ 즉시 만료
  });

  // ✅ 프로젝트에서 쓰는 관련 쿠키도 함께 만료
  res.cookies.set("rememberId", "", { path: "/", maxAge: 0 });
  res.cookies.set("emailForVerification", "", { path: "/", maxAge: 0 });

  return res;
}
