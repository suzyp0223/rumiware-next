/*
// 서버에서 Header, Sidebar, Footer를 포함한 전체 레이아웃을 구성하는 컴포넌트.
// UI 상태(예: 모달, 사이드바, 다크모드 등)는 클라이언트 컴포넌트에서 개별적으로 관리.
  1. Layout 컴포넌트는 로그인한 유저를 받아서
  2. Redux에 setUser()로 저장하고
  3. Header, children, Footer를 포함한 전체 UI를 보여줍니다.
*/

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/firebases/firebase";
import { setUser, EmailUser, setAuthInitialized, logoutUser } from "@/store/slices/userSlice";

import type { LayoutProps } from "../types/auth";
import Header from "../common/Header";
import Footer from "../common/Footer";

// 서버에서 내려온 user를 받음
const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      // 👇 이 콜백은 “반드시 1회 이상” 불립니다.
      if (!fbUser) {
        dispatch(logoutUser());

        // SSR에서 이미 세팅했으면 initialized는 true 상태일 수 있음
        dispatch(setAuthInitialized()); // ✨ 추가: 깜빡임 방지
        return;
      }

      const snapshot = await getDoc(doc(db, "users", fbUser.uid));
      if (snapshot.exists()) {
        const d = snapshot.data();
        const userData: Omit<EmailUser, "createdAt"> = {
          type: "email",
          uid: d.uid,
          phoneNumber: d.phoneNumber ?? "",
          isAdmin: d.isAdmin ?? false,
          email: (d.email ?? "").toLowerCase(),
          name: d.name ?? "",
          birthDate: d.birthDate ?? "",
          gender: d.gender ?? "",
          nationality: d.nationality ?? "",
          emailVerified: !!d.emailVerified,
        };
        dispatch(setUser(userData));
      } else {
        dispatch(setAuthInitialized()); // ✨ 문서 없을 때도 초기화 완료
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-2 flex-1 flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
