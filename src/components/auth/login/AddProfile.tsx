import { doc, setDoc, serverTimestamp, FieldValue, Timestamp, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebases/firebase";

const AddProfile = () => {
  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userData = {
      uid: user.uid,
      email: user.email ?? "",
      name,
      birthDate,
      phoneNumber: phone.replace(/\D/g, ""),
      emailVerified: user.emailVerified,
      isAdmin: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userData);
    router.push("/"); // 메인 페이지로 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        placeholder="생년월일"
      />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="전화번호" />
      <button type="submit">완료</button>
    </form>
  );
};

export default AddProfile;
