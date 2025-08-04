import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebases/firebase";

type SearchType = "byPhone" | "byEmail";

interface SearchParams {
  name: string;
  email?: string;
  phoneNumber?: string;
}

const useFindUser = () => {
  // 이름 + 전화번호로 아이디 찾기
  const findUser = async (type: SearchType, params: SearchParams) => {
    const { name, email = "", phoneNumber = "" } = params;

    const usersRef = collection(db, "users");
    const noSpacesName = name.replace(/\s/g, "");
    const noSpacesEmail = email.trim().toLowerCase();
    const noSpacesPhone = phoneNumber.replace(/\s/g, "").replace(/-/g, "");

    let q;

    if (type === "byPhone") {
      q = query(
        usersRef,
        where("phoneNumber", "==", noSpacesPhone),
        where("name", "==", noSpacesName)
      );
    } else if (type === "byEmail") {
      q = query(usersRef, where("email", "==", noSpacesEmail), where("name", "==", noSpacesName));
    } else {
      throw new Error("유효하지 않은 검색 입니다");
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
