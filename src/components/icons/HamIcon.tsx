import CloseIcon from "../icons/CloseIcon";

const HamIcon = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <CloseIcon />
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-[#EA4F59] hover:fill-white transition-colors"
    >
      <rect y="2" width="24" height="2" />
      <rect y="11" width="24" height="2" />
      <rect y="20" width="24" height="2" />
    </svg>
  );
};

export default HamIcon;
