import { auth, db } from "@/firebases/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

/**
 * 이메일 인증 상태를 확인하고 Firestore에 반영
 * @returns 이메일 인증 여부 (true/false)
 */
const updateEmailVerified = async (): Promise<boolean> => {
  const user = auth.currentUser;

  if (!user) {
    console.error("❌ 유저가 로그인되어 있지 않습니다.");
    return false;
  }

  try {
    // 1️⃣ 인증 상태를 최신으로 가져옴
    await user.reload();
    const isVerified = user.emailVerified;

    if (!isVerified) {
      console.warn("⚠️ 이메일 인증이 아직 완료되지 않았습니다.");
      return false;
    }

    // 2️⃣ Firestore에 문서가 있을 때만 업데이트 시도
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      await updateDoc(userRef, { emailVerified: true });
      console.log("✅ Firestore에 이메일 인증 상태 반영됨");
    } else {
      console.log("ℹ️ 인증은 완료됐지만, Firestore 문서가 없어 업데이트 생략");
    }

    return true;
  } catch (error) {
    console.error("❌ 이메일 인증 상태 확인 실패:", error);
    return false;
  }
};

export default updateEmailVerified;
