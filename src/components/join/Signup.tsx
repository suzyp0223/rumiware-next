import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserInfoProps } from "../types/user";

const Signup = async (email: string, pwd: string, userInfo: UserInfoProps): Promise<string> => {
  const result = await createUserWithEmailAndPassword(auth, email, pwd);
  const uid = result.user.uid;

  await setDoc(doc(db, "users", uid), {
    email,
    ...userInfo,
    createdAt: new Date(),
  });

  return uid;
};

export default Signup;
