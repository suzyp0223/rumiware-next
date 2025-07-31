import { NextResponse } from "next/server";

export async function POST() {
  // 🍪 세션 쿠키 제거 (maxAge 0)
  const res = NextResponse.json({ success: true });

  res.cookies.set("session", "", { maxAge: 0, path: "/" }); // 쿠키 제거
  return res;
}
