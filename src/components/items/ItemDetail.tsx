"use client";

import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartItemList } from "../../components/cart/data/cartItemList";
import CloseIcon from "../icons/CloseIcon";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "./../icons/ShareIcon";
import LocationNav from "./LocationNav";
import OptionsSelector from "./OptionsSelector";

export interface ItemDetailProps {
  productId: string;
}

const ItemDetail = ({ productId }: ItemDetailProps) => {
  const item = cartItemList.find((item) => item.id === productId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedColor, setSelectedColor] = useState(item?.color[0] || "");

  // ✅ item이 있으면 color[0], 없으면 빈 문자열

  if (!item) {
    return <div className="p-4">해당 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
      {/* 위치 네비게이션 */}
      <LocationNav category={item.category} />

      {/* // 개별 상품 페이지 */}
      <div className="flex flex-row ">
        {/* 상품 섬네일 */}
        <div className="p-4">
          <div className="relative flex gap-6 w-[400px] h-[550px]">
            <Image alt={item.name} src={item.image} fill className="rounded border object-cover" />
          </div>
        </div>

        {/* 상품 텍스트 정보 */}
        <div className="p-4 relative">
          <h2 className="text-2xl font-bold mb-10 mt-2 ml-2">{item.name}</h2>
          <p className="text-gray-600 m-4 text-sm">{item.description}</p>
          <div className="text-lg  p-2">
            <div className="border-b border-gray-300 pb-4">
              {/* 가격 */}
              <div className="mb-2 font-semibold">
                <span className="ml-2 mr-4 text-blue-500 text-base">{item.discountRate}%</span>
                <span className="text-xl">{Number(item.salePrice).toLocaleString()}원</span>
                <s className="text-lg line-through text-gray-500 mx-4">
                  {Number(item.originalPrice).toLocaleString()}원
                </s>
              </div>

              {/* 공유/찜하기 아이콘 */}
              <div className="absolute top-[35%] right-[50px] flex flex-row gap-4">
                <Link href="/">
                  <ShareIcon />
                </Link>
                <Link href="/">
                  <HeartIcon className="hover:fill-current hover:text-red-500" />
                </Link>
              </div>

              {/* 사이즈, 색상 선택 */}
              <OptionsSelector productId={productId} />
            </div>

            <div className="mt-2">
              <ul>
                <li className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <div className="flex items-center">
                    <CloseIcon className="w-[30px] ml-2 mr-6 " />
                    <span className="text-base mr-4">{item.options}</span>
                    <span className="text-base">{selectedColor}</span>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center text-sm">
                      <button type="button" aria-label="수량 감소">
                        <MinusIcon />
                      </button>
                      <input
                        type="text"
                        value={item.count}
                        readOnly
                        className="w-10 text-center "
                      />
                      <button type="button" aria-label="수량 증가">
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  <div className="text-base mr-3">{item.salePrice}원</div>
                </li>

                <li>
                  <p className="text-xl flex items-center justify-between ml-2 my-4">
                    <span className="text-lg">총 상품 금액</span>
                    <strong className="flex items-center mr-3 text-3xl font-light">
                      10<span className="text-base">&nbsp;원</span>
                    </strong>
                  </p>
                </li>
                <li className="text-base">
                  <div className="bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded my-2 text-center">
                    <Link href="/">바로구매하기</Link>
                  </div>
                  <div className="w-96 flex items-center ">
                    <div className="flex-1  text-center border border-blue-600 text-blue-600 hover:text-blue-800 hover:border-blue-800 py-2 rounded-l">
                      <Link href="/cart">장바구니에 담기</Link>
                    </div>
                    <div className="h-full justify-center flex items-center border border-l-0 border-blue-600 rounded-r px-4 py-2.5">
                      <Link href="/" className="">
                        <HeartIcon className="w-6 h-6 text-blue-600 hover:fill-current hover:text-red-500" />
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
