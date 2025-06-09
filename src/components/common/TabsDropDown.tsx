import Link from "next/link";
import { useState } from "react";
import HamBtnToggle from "../toggle/HamBtnToggle";
import { Category } from "./Category";

interface TopNavProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  closeSidebar: () => void;
}

const TabsDropDown = ({ toggleSidebar, isOpen, closeSidebar }: TopNavProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ul className="flex justify-center items-center gap-6 text-sm font-medium bg-gray-100">
      <li className=" hover:bg-[#e5e7eb] rounded-md ">
        <HamBtnToggle toggleSidebar={toggleSidebar} isOpen={isOpen} closeSidebar={closeSidebar} />
      </li>
      {Category.map((category, index) => (
        <li
          key={category.name}
          className="relative mx-1"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <Link
            href={category.pathName}
            className="hover:underline hover:text-[var(--color-red-400)]"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TabsDropDown;
