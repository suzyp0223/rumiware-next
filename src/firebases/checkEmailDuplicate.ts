import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * 이메일 중복 여부 확인
 * @param email 사용자 이메일
 * @returns true: 사용 가능 / false: 중복 있음
 */
export async function checkEmailDuplicate(email: string): Promise<boolean> {
  try {
    const usersRef = collection(db, "users"); //  users 컬렉션 참조
    const q = query(usersRef, where("email", "==", email)); // email 필드가 같은 문서 찾는 쿼리
    const querySnapshot = await getDocs(q); // 쿼리 실행해서 문서 목록 가져오기

    return querySnapshot.empty; // ✅ 결과가 비었으면 중복 없음 (true 반환)
  } catch (err) {
    console.log("이메일 중복 확인 오류:", err);
    return false; //  오류 발생 시 중복된 것으로 간주
  }
}
