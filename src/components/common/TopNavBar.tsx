import Image from "next/image";
import Link from "next/link";

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
}

const TopNavBar = ({ isOpen, toggleSidebar }: TopNavProps) => {
  return (
    <nav className="w-full bg-peach-pink shadow-md">
      <div className="mb-10">
        <div className="flex justify-between items-center px-4 py-2 text-gray-600">
          <CopyUrlBtn />
          <div className="flex gap-8 text-sm text-gray-600 mr-6">
            <Link href="#" className="hover:underline">
              로그인
            </Link>
            <Link href="#" className="hover:underline">
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

          <div className=" md:flex items-center justify-center gap-8">
            <Link href="#" className="flex flex-col items-center text-xs">
              <Image src={myPage} alt="마이페이지" className="w-6 h-6 mt-1" />
              <span className="display-none mt-2">마이페이지</span>
            </Link>
            <Link href="#" className="flex flex-col items-center text-xs mr-6">
              <Image src={cart} alt="장바구니" className="w-8 h-8" />
              <span className="display-none">장바구니</span>
            </Link>
          </div>
        </div>
      </div>
      <TabsDropDown isOpen={isOpen} toggleSidebar={toggleSidebar} />
    </nav>
  );
};

export default TopNavBar;
