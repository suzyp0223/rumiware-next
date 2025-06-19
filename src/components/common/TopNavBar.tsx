import Image from "next/image";
import Link from "next/link";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import cart from "../../assets/icon/cart.svg";
import myPage from "../../assets/icon/my-page.svg";
import rumiLogo from "../../assets/img/rumiLogo1.jpg";

import CopyUrlBtn from "../button/CopyUrlBtn";
import SearchToggle from "../toggle/SearchToggle";
import TabsDropDown from "./TabsDropDown";

interface TopNavProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  onClose: () => void;
  closeSidebar: () => void;
}

const TopNavBar = ({ toggleSidebar, isOpen, closeSidebar }: TopNavProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="w-full bg-peach-pink shadow-md border-b border-[var(--color-red-200)]">
      <div className="mb-10">
        <div className="flex justify-between items-center px-4 py-2 text-gray-600">
          <CopyUrlBtn />
          <div className="flex gap-8 text-sm text-gray-600 mr-6">
            {/* 로그인,로그아웃 레이아웃 변경하기 */}
            <Link href="/auth" className="hover:underline hover:text-[var(--color-red-400)]">
              로그인
            </Link>
            <Link href="/auth" className="hover:underline hover:text-[var(--color-red-400)] hidden">
              로그아웃
            </Link>
            <Link href="/join" className="hover:underline hover:text-[var(--color-red-400)]">
              회원가입
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 relative">
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <Image src={rumiLogo} alt="로고이미지" width={130} height={60} className="w40 h-auto" />
          </Link>

          {/* <SearchBtn /> */}
          <SearchToggle />

          <div className=" flex items-center justify-center gap-8">
            <Link href="/myPage" className="flex flex-col items-center text-xs">
              <Image src={myPage} alt="마이페이지" className="w-6 h-6 mt-1" />
              <span className="mt-2 hover:underline hover:text-[var(--color-red-400)]">
                마이페이지
              </span>
            </Link>
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
      <TabsDropDown isOpen={isOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />
    </nav>
  );
};

export default TopNavBar;
