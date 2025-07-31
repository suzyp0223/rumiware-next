"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "@/hooks/useLogout";

import Image from "next/image";
import Link from "next/link";

import { RootState } from "@/store/store";
// import type { User as FirebaseUser } from "firebase/auth";
import type { SessionUser } from "../types/auth";

import cart from "../../assets/icon/cart.svg";
import myPage from "../../assets/icon/my-page.svg";
import rumiLogo from "../../assets/img/rumiLogo1.jpg";

import CopyUrlBtn from "../button/CopyUrlBtn";
import SearchToggle from "../toggle/SearchToggle";
import TabsDropDown from "./TabsDropDown";

interface HeaderProps {
  user: SessionUser | null;
}

const Header = ({ user }: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const { logout } = useLogout();

  return (
    <header className="w-full bg-peach-100 shadow-md border-b border-[var(--color-red-200)]">
      <div className="mb-10">
        <div className="flex justify-between items-center px-4 py-2 text-gray-600">
          <CopyUrlBtn />
          <div className="flex gap-8 text-sm text-gray-600 mr-6">
            {/* 로그인, 로그아웃  */}
            {user ? (
              <div>
                <span className="mr-8">{user.email} 님</span>
                <button
                  onClick={logout}
                  className="hover:underline hover:text-[var(--color-red-400)]"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth" className="hover:underline hover:text-[var(--color-red-400)]">
                  로그인
                </Link>
                <Link href="/join" className="hover:underline hover:text-[var(--color-red-400)]">
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 relative">
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <div className="relative w-[200px] h-[130px]">
              <Image src={rumiLogo} alt="로고이미지" fill className="object-contain" />
            </div>
          </Link>

          {/* <SearchBtn /> */}
          <SearchToggle />

          {/* 마이페이지, 장바구니 영역 */}
          <div className=" flex items-center justify-center gap-8">
            {user && (
              <Link href="/myPage" className="flex flex-col items-center text-xs">
                <Image src={myPage} alt="마이페이지" className="w-6 h-6 mt-1" />
                <span className="mt-2 hover:underline hover:text-[var(--color-red-400)]">
                  마이페이지
                </span>
              </Link>
            )}
            <Link href="/cart" className="flex flex-col items-center text-xs mr-6">
              <Image src={cart} alt="장바구니" className="w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute -top-1 right-[2.75rem] bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center z-10">
                  {cartCount}
                </span>
              )}
              <span className="hover:underline hover:text-[var(--color-red-400)]">장바구니</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 햄버거 버튼 */}
      <TabsDropDown
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />
    </header>
  );
};

export default Header;
