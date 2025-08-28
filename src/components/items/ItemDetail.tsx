"use client";

import { useMemo } from "react";

import { HeartIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import CloseIcon from "../icons/CloseIcon";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "./../icons/ShareIcon";
import LocationNav from "./LocationNav";
import OptionsSelector from "./OptionsSelector";
import { useProductFS } from "@/hooks/useProductsFS";

export interface ItemDetailProps {
  productId: string;
}

const ItemDetail = ({ productId }: ItemDetailProps) => {
  const { data: p, isLoading, error } = useProductFS(productId);

  const salePrice = useMemo(() => {
    if (!p) return 0;
    const rate = Math.max(0, Math.min(p.discountRate ?? 0, 100));
    return Math.round(p.price * (1 - rate / 100));
  }, [p]);

  if (isLoading) return <div className="p-4">로딩 중…</div>;
  if (error || !p) return <div className="p-4">해당 상품을 찾을 수 없습니다.</div>;

  const firstImage = p.images?.[0] ?? "/placeholder.png"; // Storage URL
  const selectedColor = p.color?.[0] ?? "";

  return (
    <div className="p-4">
      {/* 위치 네비게이션 */}
      {/* -------------------- 변경됨: Firestore 경로 사용 -------------------- */}
      <LocationNav category={`/${p.category?.pathName ?? ""}`} />
      {/* ------------------------------------------------ */}

      <div className="flex flex-row ">
        {/* 상품 섬네일 */}
        <div className="p-4">
          <div className="relative flex gap-6 w-[400px] h-[550px]">
            {/* -------------------- 변경됨: Storage URL 렌더 -------------------- */}
            <Image alt={p.title} src={firstImage} fill className="rounded border object-cover" />
            {/* ------------------------------------------------ */}
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="p-4 relative">
          {/* -------------------- 변경됨: Firestore 필드로 대체 -------------------- */}
          <h2 className="text-2xl font-bold mb-10 mt-2 ml-2">{p.title}</h2>
          <p className="text-gray-600 m-4 text-sm">{p.description}</p>
          {/* ------------------------------------------------ */}

          <div className="text-lg  p-2">
            <div className="border-b border-gray-300 pb-4">
              {/* 가격 */}
              <div className="mb-2 font-semibold">
                <span className="ml-2 mr-4 text-blue-500 text-base">{p.discountRate ?? 0}%</span>
                <span className="text-xl">{salePrice.toLocaleString()}원</span>
                <s className="text-lg line-through text-gray-500 mx-4">
                  {p.price.toLocaleString()}원
                </s>
              </div>

              {/* 공유/찜하기 */}
              <div className="absolute top-[35%] right-[50px] flex flex-row gap-4">
                <Link href="/">
                  <ShareIcon />
                </Link>
                <Link href="/">
                  <HeartIcon className="hover:fill-current hover:text-red-500" />
                </Link>
              </div>

              {/* 옵션 */}
              {/* -------------------- 참고: OptionsSelector가 Firestore 기반이면 내부에서 p.options/p.color 사용하도록 수정 -------------------- */}
              <OptionsSelector productId={productId} />
            </div>

            <div className="mt-2">
              <ul>
                <li className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <div className="flex items-center">
                    <CloseIcon className="w-[30px] ml-2 mr-6 " />
                    <span className="text-base mr-4">{p.options?.join(", ")}</span>
                    <span className="text-base">{selectedColor}</span>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center text-sm">
                      <button type="button" aria-label="수량 감소">
                        <MinusIcon />
                      </button>
                      <input type="text" value={1} readOnly className="w-10 text-center " />
                      <button type="button" aria-label="수량 증가">
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  <div className="text-base mr-3">{salePrice.toLocaleString()}원</div>
                </li>

                <li>
                  <p className="text-xl flex items-center justify-between ml-2 my-4">
                    <span className="text-lg">총 상품 금액</span>
                    <strong className="flex items-center mr-3 text-3xl font-light">
                      {salePrice.toLocaleString()}
                      <span className="text-base">&nbsp;원</span>
                    </strong>
                  </p>
                </li>

                <li className="text-base">
                  <div className="bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded my-2 text-center">
                    <Link href="/">바로구매하기</Link>
                  </div>
                  <div className="w-96 flex items-center ">
                    <div className="flex-1 text-center border border-blue-600 text-blue-600 hover:text-blue-800 hover:border-blue-800 py-2 rounded-l">
                      <Link href="/cart">장바구니에 담기</Link>
                    </div>
                    <div className="h-full justify-center flex items-center border border-l-0 border-blue-600 rounded-r px-4 py-2.5">
                      <Link href="/">
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
