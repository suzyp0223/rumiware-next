import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 로그인
import { getFirestore } from "firebase/firestore"; // 업로드
import { getStorage } from "firebase/storage"; //
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  apiKey: "AIzaSyAKQ82Ui0KNTRCAqyaiu6tMocfq_5cN12s",
  authDomain: "rumiware-a8503.firebaseapp.com",
  projectId: "rumiware-a8503",
  storageBucket: "rumiware-a8503.appspot.com", // ⚠️ `.app` → `.appspot.com`으로 고쳐야 Firebase Storage 작동함!
  messagingSenderId: "797258201669",
  appId: "1:797258201669:web:bee32327cd246dcbd4012c",
  measurementId: "G-NB7633HBTE",
};

// Firebase 앱 초기화 (중복 방지)
const app = initializeApp(firebaseConfig);

// SSR-safe하게 Analytics 초기화
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };

// 필요한 서비스만 가져오기
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
