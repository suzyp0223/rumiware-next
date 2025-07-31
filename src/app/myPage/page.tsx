// 로그인한 사용자만 접근 가능
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/components/utils/verifySession"; // 세션 쿠키 검증 함수
import MyPageMain from "@/components/myPage/MyPageMain";

export default async function MyPagePage() {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    redirect("/auth/login"); // ✅ 세션 없으면 로그인 페이지로 이동
  }

  const user = await verifySession(session);

  if (!user) {
    redirect("/auth/login"); // ✅ 세션 만료되었거나 잘못된 쿠키인 경우도 막기
  }

  return <MyPageMain user={user} />;
}
