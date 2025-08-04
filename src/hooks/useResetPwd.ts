import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebases/firebase";
import useFindUser from "./useFindUser";

const useResetPwd = () => {
  const { findUser } = useFindUser();

  const sendResetLink = async (
    name: string,
    email: string,
    phoneNumber: string
  ): Promise<string | null> => {
    try {
      let targetEmail = "";

      const user = await findUser("byEmail", { email, name });
      const userWithPhone = await findUser("byPhone", { phoneNumber, name });

      if (email) {
        if (!user) {
          return "입력하신 이메일로 등록된 사용자가 없습니다.";
        }
        targetEmail = email;
      } else if (phoneNumber) {
        if (!userWithPhone || !userWithPhone.email) {
          return "입력하신 정보와 일치하는 사용자가 없습니다.";
        }
        targetEmail = userWithPhone.email;
      }

      await sendPasswordResetEmail(auth, targetEmail);
      return null;
    } catch (error) {
      console.error("비밀번호 재설정 오류:", error);
      return "비밀번호 재설정 메일 전송 중 오류가 발생했습니다.";
    }
  };

  return { sendResetLink };
};

export default useResetPwd;
