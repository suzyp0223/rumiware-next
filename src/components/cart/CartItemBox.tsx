import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Checkbox from "../button/Checkbox";
import CloseIcon from "../icons/CloseIcon";

const CartItemBox = () => {
  return (
    <table className="table-auto w-full border-b border-gray-300">
      <caption className="sr-only">장바구니 담긴 상품</caption>
      <tbody>
        <tr>
          <td className="w-[30px] p-2">
            <Checkbox />
          </td>
          <td className="w-[100px] p-2">
            <div className="w-[100px] h-[140px] relative bg-[#ffcfc7]">
              <Link href="/">
                <Image
                  src="/assets/carousel/carousel3.jpg"
                  alt="상품 섬네일"
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
          </td>

          <td className="w-full p-2">
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-base font-semibold text-gray-800">
                <strong className="sr-only">상품명</strong>
                [EVENT] 라벤더 라운드 티
              </Link>
              <div className="mt-6 text-sm text-gray-600">
                선택1: 라벤더 라운드 티<span className="ml-1 font-medium">1개</span>
              </div>
              <Link
                href="/"
                className="w-fit border bg-[#ffcfc7] text-gray-700 text-sm rounded py-1 px-3"
              >
                주문 수정
              </Link>
            </div>
          </td>

          <td className="min-w-[100px] p-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <button type="button" aria-label="수량 감소" className="">
                <Minus size={16} />
              </button>
              <input type="text" value={2} readOnly className="w-10 text-center " />
              <button type="button" aria-label="수량 증가" className="">
                <Plus size={16} />
              </button>
            </div>
          </td>

          <td className="min-w-[115px] p-2">
            <div className=" flex flex-col items-center justify-center">
              <s className="text-sm text-gray-600">106,000</s>
              <span className="text-lg ">14,930</span>
            </div>
          </td>

          <td className="w-[50px] p-2">
            <div className="">
              <Link href="#" className="">
                <CloseIcon />
              </Link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartItemBox;
