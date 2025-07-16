import { adminAuth } from "@/firebase/admin";
import { SessionUser } from "../types/auth";

export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const decoded = await adminAuth.verifySessionCookie(token, true);

    return { email: decoded.email, displayName: decoded.name ?? "" };
  } catch (error) {
    console.error("세션 검증 실패:", error);
    return null; // 실패 시 null 반환
  }
}
