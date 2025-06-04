"use client";

// TopNavBar, Sidebar, Footer를 공통으로 묶는 UI 전용 레이아웃 컴포넌트
// ClientProviders 안에서 children을 감싸기 위해 쓸 수 있음.
import { ReactNode } from "react";
import Footer from "../common/Footer";
import Sidebar from "../common/Sidebar";
import TopNavBar from "../common/TopNavBar";

const Layout = ({ children }: { children: ReactNode }) => {
  function toggleSidebar(): void {
    throw new Error("사이드바 토글됨");
  }

  return (
    <>
      <TopNavBar toggleSidebar={toggleSidebar} />
      <Sidebar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
