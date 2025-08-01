import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebases/firebase";
import useFindUser from "./useFindUser";

const useResetPwd = () => {
  const { findUser } = useFindUser();

  const sendResetLink = async (name: string, email: string): Promise<string | null> => {
    const user = await findUser("byEmail", { email, name });

    if (!user) {
      return "입력하신 정보와 일치하는 사용자가 없습니다.";
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (error) {
      console.error("비밀번호 재설정 메일 전송 오류:", error);
      return "메일 전송 중 오류가 발생했습니다.";
    }
  };

  return { sendResetLink };
};

export default useResetPwd;
