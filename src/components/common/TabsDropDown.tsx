import Link from "next/link";
import { useState } from "react";
import HamBtnToggle from "../toggle/HamBtnToggle";
import { Category } from "./Category";

interface TopNavProps {
  toggleSidebar: () => void;
}

const TabsDropDown = ({ toggleSidebar }: TopNavProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <ul className="md:flex justify-center items-center gap-6 text-sm font-medium py-2 bg-gray-100">
      <li className=" hover:bg-[#e5e7eb] rounded-md ">
        <HamBtnToggle toggleSidebar={toggleSidebar} />
      </li>
      {Category.map((category, index) => (
        <li
          key={category.name}
          className="relative"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <Link href={category.pathName} className="hover:text-blue-500">
            {category.name}
          </Link>

          {/* 2단계: subcategories */}
          {category.subcategories && activeIndex === index && (
            <ul className="absolute top-full left-0 bg-white border shadow-md z-50">
              {category.subcategories.map((sub) => (
                <li key={sub.name} className="group relative">
                  <Link
                    href={sub.pathName}
                    className="block whitespace-nowrap text-gray-600 hover:text-blue-500"
                  >
                    └ {sub.name}
                  </Link>

                  {/* 3단계: thirdSubcategories */}
                  {sub.thirdSubcategories && (
                    <ul className="absolute top-0 left-full bg-white border shadow-md">
                      {sub.thirdSubcategories.map((third) => (
                        <li key={third.name}>
                          <Link
                            href={third.pathName}
                            className="block whitespace-nowrap px-4 py-2 hover:bg-gray-200"
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
  );
};

export default TabsDropDown;
