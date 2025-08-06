import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebases/firebase";

type SearchType = "byPhone" | "byEmail";

interface SearchParams {
  name?: string;
  email?: string;
  phoneNumber?: string;
  emailVerified: boolean;
}

const useFindUser = () => {
  // 이름 + 전화번호로 아이디 찾기
  const findUser = async (type: SearchType, params: SearchParams) => {
    const usersRef = collection(db, "users");

    const noSpacesName = params.name?.replace(/\s/g, "") ?? "";
    const noSpacesPhone = params.phoneNumber?.replace(/\D/g, "") ?? "";
    console.log("noSpacesPhone: ", noSpacesPhone);
    console.log("noSpacesPhone 타입은??: ", typeof noSpacesPhone);

    const noSpacesEmail = params.email?.trim().toLowerCase() ?? "";

    let q;

    if (type === "byPhone" && noSpacesPhone) {
      if (noSpacesName) {
        // ✅ 이름 + 전화번호로 검색
        q = query(
          usersRef,
          where("phoneNumber", "==", noSpacesPhone),
          where("name", "==", noSpacesName)
        );
      } else if (noSpacesPhone) {
        // ✅ 전화번호만으로 검색
        q = query(usersRef, where("phoneNumber", "==", noSpacesPhone));
      } else {
        throw new Error("전화번호가 필요합니다.");
      }
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
