import { useRef, useState } from "react";

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
    <aside>
      {isOpen && (
        <div
          ref={dropDownRef}
          className="relative top-full left-20 w-40 bg-white shadow-md border z-50"
        >
          <ul className="flex flex-col w-40  h-[384px] ">
            {Category.map((category, index) => (
              <li
                key={category.name}
                className="group"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link
                  href={category.pathName}
                  className="h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  {category.name}
                </Link>

                {/* 2단계: subcategories */}
                {category.subcategories && activeIndex === index && (
                  <ul className="w-40 h-[384px] absolute top-0 left-full bg-white border shadow-md z-50">
                    {category.subcategories.map((sub) => (
                      <li key={sub.name} className="relative group">
                        <Link
                          href={sub.pathName}
                          className="h-12 flex items-center text-sm text-gray px-4 hover:bg-gray-100"
                        >
                          └ {sub.name}
                        </Link>

                        {/* 3단계: thirdSubcategories */}
                        {sub.thirdSubcategories && (
                          <ul className="w-40 h-[384px] absolute top-0 left-full bg-white border shadow-md z-50">
                            {sub.thirdSubcategories.map((third) => (
                              <li key={third.name}>
                                <Link
                                  href={third.pathName}
                                  className="h-12 flex items-center text-sm text-gray px-4 hover:bg-gray-100"
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
