/*
// 서버에서 Header, Sidebar, Footer를 포함한 전체 레이아웃을 구성하는 컴포넌트.
// UI 상태(예: 모달, 사이드바, 다크모드 등)는 클라이언트 컴포넌트에서 개별적으로 관리.
*/

"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

import type { SessionUser } from "../types/auth";

import Footer from "../common/Footer";
import Header from "../common/Header";

interface LayoutProps {
  user: SessionUser | null;
  children: ReactNode;
}

const Layout = ({ user, children }: LayoutProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        setUser({
          email: user.email ?? "", // undefined 방지 처리
          displayName: user.displayName ?? "",
        })
      );
    }
  }, [user, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <ThemeProvider/> */}
      <Header user={user} />
      <main className="pt-2 flex-1 flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
