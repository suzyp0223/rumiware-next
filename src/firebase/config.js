// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 필요 시
import { getFirestore } from "firebase/firestore"; // 필요 시
import { getStorage } from "firebase/storage"; // 필요 시
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKQ82Ui0KNTRCAqyaiu6tMocfq_5cN12s",
  authDomain: "rumiware-a8503.firebaseapp.com",
  projectId: "rumiware-a8503",
  storageBucket: "rumiware-a8503.firebasestorage.app",
  messagingSenderId: "797258201669",
  appId: "1:797258201669:web:bee32327cd246dcbd4012c",
  measurementId: "G-NB7633HBTE",
};

// Firebase 앱 초기화 (중복 방지)
const app = initializeApp(firebaseConfig);

// 필요한 서비스만 가져오기
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
