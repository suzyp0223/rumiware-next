import useClickOutside from "@/hooks/useClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";
import { Category } from "./Category";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ✅ 전체 흐름 요약: 마우스를 올릴 때마다 어떻게 메뉴가 보여지는가?
 * [사용자 인터랙션 발생]
   ↓
 * setActiveIndex(index) or setActiveSubIndex(index)
   ↓
    React가 상태가 바뀌었음을 인지
      ↓
    해당 컴포넌트 함수가 다시 실행 (리렌더링 발생)
      ↓
    JSX 조건부 렌더링에 의해
   → 필요한 2뎁, 3뎁 메뉴가 화면에 보임

   ✅ 상태 변화가 React에서 UI로 반영되는 핵심 구조
   useState → 상태 업데이트 → 컴포넌트 함수 재실행 → 조건부 JSX → DOM 변경
 *
 */

/*  흐름
  [유저가 마우스를 올림]
        ↓
    setActiveIndex(1)
            ↓
    React → 리렌더링 → 조건 만족 → Category[1].subcategories 렌더
            ↓
    2뎁 메뉴 보임
            ↓
    setActiveSubIndex(0)
            ↓
    React → 리렌더링 → 조건 만족 → Category[1].sub[0].thirdSub 렌더
            ↓
    3뎁 메뉴 보임
*/
const SideBar = ({ isOpen, onClose }: SidebarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSubIndex, setActiveSubIndex] = useState<number | null>(null);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropDownRef, onClose, isOpen);

  return (
    <aside>
      {isOpen && (
        <div ref={dropDownRef} className="relative flex border border-gray-200 z-50">
          {/* 1dep: 좌측 고정 메뉴 */}
          <ul className="flex flex-col w-[200px] h-[384px]  bg-white ">
            {Category.map((category, index) => (
              <li
                key={category.name}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  setActiveSubIndex(null);
                }}
              >
                <Link
                  href={category.pathName}
                  className="flex items-center h-12 px-4 text-[15px] text-[#111] hover:bg-gray-100 hover:underline hover:text-[var(--color-red-400)] cursor-pointer"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* 2dep */}
          {activeIndex !== null && Category[activeIndex].subcategories && (
            <ul className="flex flex-col w-[200px] h-[384px] bg-white  absolute top-0 left-[200px] shadow-lg ">
              {Category[activeIndex].subcategories.map((sub, subIdx) => {
                const hasThird = !!sub.thirdSubcategories?.length;

                return (
                  <li
                    key={sub.name}
                    onMouseEnter={() => {
                      setActiveSubIndex(subIdx);
                    }}
                  >
                    <Link
                      href={sub.pathName}
                      className={`flex items-center h-12 px-4 text-[#333] hover:bg-gray-100 hover:underline hover:text-[var(--color-red-400)] cursor-pointer ${
                        hasThird ? "font-bold" : ""
                      }`}
                    >
                      └ {sub.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* 3dep */}
          {activeIndex !== null &&
            activeSubIndex !== null &&
            Category[activeIndex].subcategories?.[activeSubIndex]?.thirdSubcategories && (
              <ul className="flex flex-col w-[200px] h-[384px] bg-white  absolute top-0 left-[400px] shadow-lg">
                {Category[activeIndex].subcategories?.[activeSubIndex]?.thirdSubcategories.map(
                  (third) => (
                    <li key={third.name}>
                      <Link
                        href={third.pathName}
                        className="flex items-center h-12 px-4 text-[#555] hover:bg-gray-100 hover:underline hover:text-[var(--color-red-400)] cursor-pointer"
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;↳ {third.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
        </div>
      )}
    </aside>
  );
};

export default SideBar;
