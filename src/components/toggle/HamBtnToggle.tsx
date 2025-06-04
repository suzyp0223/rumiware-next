import Image from "next/image";

import Link from "next/link";
import { useRef } from "react";
import hamBtn from "../../assets/icon/hamBtn.svg";
import { Category } from "../common/Category";

interface HamBtnToggleProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const HamBtnToggle = ({ toggleSidebar, isOpen }: HamBtnToggleProps) => {
  const btnRef = useRef<HTMLDivElement | null>(null);

  // //외부 클릭 시 닫기
  // useClickOutside(btnRef, close, showMenu);

  // const handleClick = () => {
  //   toggle();
  //   toggleSidebar();
  // };

  return (
    <div className="relative" ref={btnRef}>
      <button
        onClick={toggleSidebar}
        className="bg-tab-gray hover:bg-[#e5e7eb] flex items-center justify-center w-10 h-10"
        aria-label="메뉴 열기"
      >
        <Image src={hamBtn} alt="메뉴" className="w-6 h-6" unoptimized />
      </button>

      {/* 버튼 아래 드롭다운 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-md z-50">
          <ul className="p-4">
            {Category.map((cat) => (
              <li key={cat.name} className="py-1 hover:bg-gray-100 px-2 rounded">
                <Link href={cat.pathName}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamBtnToggle;
