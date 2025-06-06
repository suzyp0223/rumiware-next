import Image from "next/image";

import { useRef } from "react";
import hamBtn from "../../assets/icon/hamBtn.svg";
import Sidebar from "../common/Sidebar";

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
        <div className="absolute top-full left-0 bg-white shadow-md z-50">
          <Sidebar isOpen={isOpen} onClose={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default HamBtnToggle;
