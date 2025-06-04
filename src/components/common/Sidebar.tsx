import { useRef, useState } from "react";

import clsx from "clsx";
import Link from "next/link";

import useClickOutside from "@/hooks/useClickOutside";
import { Category } from "./Category";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SidebarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 시 닫기
  useClickOutside(dropDownRef, onClose, isOpen);

  return (
    <aside className="relative">
      {isOpen && (
        <div
          ref={dropDownRef}
          className={clsx("absolute top-full left-20 w-54 bg-white shadow-md border z-50")}
        >
          <ul className="p-4 border ">
            {Category.map((category, index) => (
              <li
                key={category.name}
                className="relative group"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link href={category.pathName} className="hover:text-blue-500 block px-2 py-1">
                  {category.name}
                </Link>

                {/* 2단계: subcategories */}
                {category.subcategories && activeIndex === index && (
                  <ul className="absolute top-0 left-[100%] ml-4  bg-white border shadow-md min-w-[160px] z-50">
                    {category.subcategories.map((sub) => (
                      <li key={sub.name} className="group relative">
                        <Link
                          href={sub.pathName}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                        >
                          └ {sub.name}
                        </Link>

                        {/* 3단계: thirdSubcategories */}
                        {sub.thirdSubcategories && (
                          <ul className="absolute top-0 left-full bg-white border shadow-md min-w-[160px] z-50">
                            {sub.thirdSubcategories.map((third) => (
                              <li key={third.name}>
                                <Link
                                  href={third.pathName}
                                  className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  &nbsp;&nbsp;&nbsp;&nbsp;↳ {third.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
