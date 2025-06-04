import React from "react";

import Image from "next/image";
import Link from "next/link";

import cart from "../../assets/icon/cart.svg";
import myPage from "../../assets/icon/my-page.svg";
import rumiLogo from "../../assets/img/rumiLogo1.jpg";

import CopyUrlButton from "../button/CopyUrlButton";
import HamBtnToggle from "../toggle/HamBtnToggle";
import SearchToggle from "../toggle/SearchToggle";

interface TopNavProps {
  toggleSidebar: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
  return (
    <nav className="w-full bg-peach-pink shadow-md">
      <div className="mb-10">
        <div className="flex justify-between items-center px-4 py-2 text-gray-600">
          <CopyUrlButton />
          <div className="flex gap-8 text-sm text-gray-600 mr-2">
            <Link href="#" className="hover:underline">
              로그인
            </Link>
            <Link href="#" className="hover:underline">
              회원가입
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 relative">
          <Link href="#" className="absolute left-1/2 transform -translate-x-1/2">
            <Image src={rumiLogo} alt="로고이미지" width={130} height={60} className="w40 h-auto" />
          </Link>

          {/* <SearchBtn /> */}
          <SearchToggle />

          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="flex flex-col items-center text-xs">
              <Image src={myPage} alt="마이페이지" className="w-6 h-6" />
              {/* <span>마이페이지</span> */}
            </Link>
            <Link href="#" className="flex flex-col items-center text-xs mr-6">
              <Image src={cart} alt="장바구니" className="w-8 h-8" />
              {/* <span>장바구니</span> */}
            </Link>
          </div>
        </div>
      </div>

      <ul className="hidden md:flex justify-center gap-6 text-sm font-medium py-2 bg-gray-100">
        <li>
          <HamBtnToggle toggleSidebar={toggleSidebar} />
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            BEST 100
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            NEW 10%
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            SEASON ~90%
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            SET
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            OUTER
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            DRESS
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            TOP
          </Link>
        </li>
        <li>
          <Link href="/" className="hover:text-blue-500">
            BOTTOM
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
