import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebases/firebase";

const useFindId = () => {
  // 이름 + 이메일로 찾기
  const findUserByEmail = async (email: string, name: string) => {
    console.log("입력값:", name);
    console.log("trim 후:", name.trim());

    const noSpacesEmail = email.replace(/\s/g, "").toLowerCase();
    const noSpacesName = name.replace(/\s/g, "");

    const usersRef = collection(db, "users");

    const q = query(
      usersRef,
      where("email", "==", noSpacesEmail),
      where("name", "==", noSpacesName)
    );

    try {
      const snapshot = await getDocs(q);
      console.log("snapshot: ", snapshot);
      console.log("snapshot.docs: ", snapshot.docs);
      console.log("쿼리 결과 문서 수:", snapshot.size); // 🔍 몇 개 나오는지
      snapshot.forEach((doc) => {
        console.log("🔥문서 데이터:", doc.data()); // ← 여기서 필드 정보 확인 가능!
      });

      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0];
        console.log("userDoc: ", userDoc);
        console.log("userDoc.data(): ", userDoc.data());
        console.log("docs found:", snapshot.size);

        return userDoc.data(); // name, email 등 반환됨
      }
    } catch (error) {
      console.log("쿼리중 에러 발생!!!!", error);
    }
    return null;
  };

  // 이름 + 전화번호로 찾기
  const findUserByPhone = async (phoneNumber: string, name: string) => {
    const noSpacesPhone = phoneNumber.replace(/\s/g, "").replace(/-/g, "");
    const noSpacesName = name.replace(/\s/g, "");

    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("phoneNumber", "==", noSpacesPhone),
      where("name", "==", noSpacesName)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return userDoc.data(); // name, email 등 반환됨
    }

    return null;
  };

  return { findUserByEmail, findUserByPhone };
};

export default useFindId;
