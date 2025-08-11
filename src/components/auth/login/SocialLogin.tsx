"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider, db } from "@/firebases/firebase";
import { setUser, SocialUser } from "@/store/slices/userSlice";

const SocialLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Firestore에 해당 유저 문서가 있는지 확인
      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      // firebase 저장 등 추가 처리 가능
      // 🔁 Firestore에 문서 없으면 새로 저장
      if (!userSnapshot.exists()) {
        const userData: SocialUser = {
          type: "social",
          provider: "google",
          uid: user.uid,
          email: user.email ?? "",
          name: user.displayName ?? "소셜유저",
          photoURL: user.photoURL ?? "",
          isAdmin: false,
        };

        await setDoc(userDocRef, userData);
        console.log("✅ 소셜 유저 Firestore 저장 완료");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt: _, ...userForRedux } = userData;
        dispatch(setUser(userForRedux));

        router.push("/");

        // if (!userSnapshot.exists()) {
        //   router.push("/myPage/myInfo");
        // } else {
        //   router.push("/");
        // }
      } else {
        console.log("✅ 소셜 유저 기존 문서 존재 → Redux 저장");
        const data = userSnapshot.data();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt: _, ...userForRedux } = data;
        dispatch(setUser(userForRedux as SocialUser));
        router.push("/");
      }
    } catch (error) {
      console.error("구글 로그인 실패:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <Link href="/login/social">카카오톡 로그인</Link>
      <div>
        <button type="submit" onClick={handleGoogleLogin} className="">
          구글 로그인
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
