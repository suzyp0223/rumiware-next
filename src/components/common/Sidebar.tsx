import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
}

const SideBar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={clsx(
        "fixed top-100 left-0  w-64 bg-white shadow-md z-50 transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen, // 열려 있을 때
          "-translate-x-full": !isOpen, // 닫혀 있을 때
        }
      )}
    >
      {/* 사이드바 내용 */}
      <div className="p-4">📂 카테고리 목록 등</div>
    </aside>
  );
};

export default SideBar;
