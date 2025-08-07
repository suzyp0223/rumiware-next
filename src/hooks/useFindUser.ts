import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebases/firebase";

type SearchType = "byPhone" | "byEmail";

interface SearchParams {
  name?: string;
  email?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
}

const useFindUser = () => {
  // 이름 + 전화번호로 아이디 찾기
  const findUser = async (type: SearchType, params: SearchParams) => {
    const noSpacesName = params.name?.replace(/\s/g, "") ?? "";
    const noSpacesPhone = params.phoneNumber?.replace(/\D/g, "") ?? "";
    const noSpacesEmail = params.email?.trim().toLowerCase() ?? "";

    const usersRef = collection(db, "users");

    let q;

    if (type === "byPhone" && noSpacesPhone) {
      // ✅ 이름 + 전화번호로 검색
      q = noSpacesName
        ? query(
            usersRef,
            where("phoneNumber", "==", noSpacesPhone),
            where("name", "==", noSpacesName)
          )
        : query(usersRef, where("phoneNumber", "==", noSpacesPhone));
    } else if (type === "byEmail" && noSpacesEmail && noSpacesName) {
      // ✅ 이름 + 이메일로 검색
      q = query(usersRef, where("email", "==", noSpacesEmail), where("name", "==", noSpacesName));
    } else {
      throw new Error("필수 검색 조건이 누락되었습니다.");
    }

    try {
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        const data = userDoc.data();
        return {
          name: data.name ?? null,
          email: data.email ?? null,
          phoneNumber: data.phoneNumber ?? null,
          emailVerified: data.emailVerified ?? false,
        };
      }
    } catch (error) {
      console.error("사용자 검색 중 오류 발생:", error);
    }

    return null;
  };

  return { findUser };
};

export default useFindUser;
