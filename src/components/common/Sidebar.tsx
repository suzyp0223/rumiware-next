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
          <ul>
            {/* <ul className="w-162"> */}
            {Category.map((category, index) => (
              <li
                key={category.name}
                className="relative group w-40  h-12 min-h-[48px]"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link
                  href={category.pathName}
                  // className="hover:text-blue-500 block px-2 py-1 text-center"
                  className="block text-center px-4 py-2 hover:text-blue-500"
                >
                  {category.name}
                </Link>

                {/* 2단계: subcategories */}
                {category.subcategories && activeIndex === index && (
                  <ul className="absolute top-0 left-full bg-white border shadow-md h-auto z-50">
                    {category.subcategories.map((sub) => (
                      <li key={sub.name} className="relative group w-40">
                        <Link
                          href={sub.pathName}
                          // className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          └ {sub.name}
                        </Link>

                        {/* 3단계: thirdSubcategories */}
                        {sub.thirdSubcategories && (
                          <ul className="absolute top-0 left-full bg-white border shadow-md h-auto z-50">
                            {sub.thirdSubcategories.map((third) => (
                              <li key={third.name} className="w-48">
                                <Link
                                  href={third.pathName}
                                  className="block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
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
