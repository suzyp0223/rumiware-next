import useClickOutside from "@/hooks/useClickOutside";
import useToggleBtn from "@/hooks/useToggleBtn";
import Image from "next/image";
import { useRef } from "react";
import closeIcon from "../../assets/icon/close.svg";
import hamBtn from "../../assets/icon/hamBtn.svg";

interface HamBtnToggleProps {
  toggleSidebar: () => void;
}

const HamBtnToggle = ({ toggleSidebar }: HamBtnToggleProps) => {
  const { isOpen: showMenu, toggle, close } = useToggleBtn();

  const handleClick = () => {
    toggle();
    toggleSidebar();
  };

  const btnRef = useRef<HTMLButtonElement | null>(null);

  //외부 클릭 시 닫기
  useClickOutside(btnRef, close, showMenu);

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="bg-tab-gray hover:bg-[#e5e7eb] p-2 rounded-md"
      aria-label={showMenu ? "메뉴 닫기" : "메뉴 열기"}
    >
      <Image
        key={showMenu ? "close" : "hamBtn"}
        src={showMenu ? closeIcon : hamBtn}
        alt={showMenu ? "닫기" : "메뉴"}
        className="w-6 h-6"
        unoptimized
      />
    </button>
  );
};

export default HamBtnToggle;
