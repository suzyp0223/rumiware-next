"use client";

import { useState } from "react";
import { cartItemList } from "../cart/data/cartItemList";
import DownArrIcon from "../icons/DownArrIcon";
import getTextColor from "../utils/getTextColor";
import { ItemDetailProps } from "./ItemDetail";

const OptionsSelector = ({ productId }: ItemDetailProps) => {
  const item = cartItemList.find((item) => item.id === productId);

  // ✅ item이 있으면 color[0], 없으면 빈 문자열
  const [selectedColor, setSelectedColor] = useState(item?.color[0] || "");
  const [isOpenColor, setIsOpenColor] = useState(false);

  if (!item) {
    return <div className="p-4">해당 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      {/* 사이즈 선택 */}
      <div className="flex gap-2 p-2">
        {item.options.map((opt) => (
          <button key={opt} className="px-4 py-1 border rounded hover:bg-gray-100 text-sm">
            {opt}
          </button>
        ))}
      </div>

      {/* 색상 선택 */}
      <div className="flex flex-row p-2">
        <span className="text-base mr-4">색상</span>
        <div className="relative inline-block text-left">
          <div
            style={{ backgroundColor: selectedColor, color: getTextColor(selectedColor) }}
            onClick={() => setIsOpenColor((prev) => !prev)}
            className={`outline-none text-base border px-2 py-1 rounded cursor-pointer min-w-[103px] text-base flex flex-row items-center justify-center`}
          >
            {selectedColor}
            <DownArrIcon className="ml-4 " />
          </div>

          {isOpenColor && (
            <ul className="absolute border rounded bg-white z-10 ">
              {item.color.map((color) => (
                <li
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setIsOpenColor(false);
                  }}
                  className={`px-3 py-2 cursor-pointer hover:opacity-80`}
                  style={{ backgroundColor: color, color: getTextColor(color) }}
                >
                  {color}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default OptionsSelector;
