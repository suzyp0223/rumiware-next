import { auth } from "@/firebases/firebase";
import { ActionCodeSettings, sendSignInLinkToEmail } from "firebase/auth";

// 인증 메일 전송 함수
const sendEmailVerificationLink = async (email: string) => {
  const actionCodeSettings: ActionCodeSettings = {
    url: `${window.location.origin}/join?verified=true&email=${email}`, // 인증 완료 후 리다이렉트될 주소
    handleCodeInApp: true, // 링크 클릭 시 앱 내부에서 처리
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    return { success: true };
  } catch (error) {
    console.error("이메일 인증 링크 전송 실패:", error);
    return { success: false, error };
  }
};

export default sendEmailVerificationLink;
