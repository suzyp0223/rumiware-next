"use client";

// TopNavBar, Sidebar, Footer를 공통으로 묶는 UI 전용 레이아웃 컴포넌트
// ClientProviders 안에서 children을 감싸기 위해 쓸 수 있음.
/*
사이드바 열기/닫기
모달 열기/닫기
테마 다크모드 상태
탭 선택 상태
등은 Layout이 관리하는 게 자연스러움.
*/

import { ReactNode, useState } from "react";
import Footer from "../common/Footer";
import TopNavBar from "../common/TopNavBar";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <ThemeProvider/> */}
      <TopNavBar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />
      <main className="pt-2 flex-1 flex items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
