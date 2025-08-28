import { db } from "@/firebases/firebase";
import { doc, setDoc } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function upsertProduct(id: string, data: any) {
  await setDoc(doc(db, "products", id), data, { merge: true }); // ✅ 있으면 병합, 없으면 생성
}

// 사용 예시:
// await upsertProduct("p001", {
//   title: "오버사이즈 자켓",
//   price: 79000,
//   discountRate: 51,
//   images: ["https://firebasestorage.googleapis.com/v0/b/.../o/products%2Fp001%2Fimg-001.jpg?alt=media&token=..."],
//   category: { main: "suit", sub: "formal", pathName: "suit/formal" },
//   stock: 10,
//   sold: 123,
// });
