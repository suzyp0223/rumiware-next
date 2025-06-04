import Image from "next/image";
import hamBtn from "../../assets/icon/hamBtn.svg";

interface HamBtnToggleProps {
  toggleSidebar: () => void;
}

const HamBtnToggle: React.FC<HamBtnToggleProps> = ({ toggleSidebar }) => {
  return (
    <button onClick={toggleSidebar} className="md:hidden bg-black">
      <Image src={hamBtn} alt="ham-btn" className="w-6 h-6" />
    </button>
  );
};

export default HamBtnToggle;
