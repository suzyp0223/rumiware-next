import { auth, db } from "@/firebases/firebase";
import { reload } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

/**
 * 이메일 인증 상태를 다시 확인하고 Firestore에 업데이트합니다.
 */
const updateEmailVerified = async () => {
  if (!auth.currentUser) return;

  try {
    await auth.currentUser.reload(); // 최신 상태로 리로드
    const isVerified = auth.currentUser.emailVerified;

    if (isVerified) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { emailVerified: true });
    }

    return isVerified;
  } catch (error) {
    console.error("이메일 인증 상태 확인 실패:", error);
    return false;
  }
};

export default updateEmailVerified;
