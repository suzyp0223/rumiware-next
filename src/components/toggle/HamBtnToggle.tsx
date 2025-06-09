import { useRef } from "react";

import useClickOutside from "@/hooks/useClickOutside";
import Sidebar from "../common/Sidebar";
import HamIcon from "../icons/HamIcon";

interface HamBtnToggleProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  closeSidebar: () => void;
}

const HamBtnToggle = ({ toggleSidebar, isOpen, closeSidebar }: HamBtnToggleProps) => {
  const btnRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(btnRef, closeSidebar, isOpen);
  // useClickOutside(btnRef, closeSidebar || (() => {}), isOpen);

  return (
    <div className="relative" ref={btnRef}>
      <button
        // onClick={toggleSidebar}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation(); // ✅ 외부 클릭 이벤트로 인식되지 않게 방지
          toggleSidebar();
        }}
        className="bg-tab-gray  hover:bg-[#ffe3dc]  flex items-center justify-center w-10 h-10"
        aria-label="메뉴 열기"
      >
        <HamIcon isOpen={isOpen} />
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
