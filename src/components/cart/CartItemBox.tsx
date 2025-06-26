import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CheckboxBtn from "../button/CheckboxBtn";
import CloseIcon from "../icons/CloseIcon";

import type { CartItemProps } from "./data/cartItemList";
import { cartItemList } from "./data/cartItemList";

const CartItemBox = () => {
  return (
    <table className="table-auto w-full border-b border-gray-300">
      <caption className="sr-only">장바구니 담긴 상품</caption>
      <tbody>
        {cartItemList.map((item: CartItemProps, index: number) => (
          <tr key={index} className="border-b border-gray-300">
            <td className="w-[30px] p-2 ">
              <label htmlFor={item.id}>
                <CheckboxBtn id={item.id} />
              </label>
            </td>
            <td className="w-[100px] p-2">
              {/* <Link href="/items/itemDetail"> */}
              <Link href={`/items/${item.id}`}>
                <div className="w-[100px] h-[140px] relative bg-peach-300">
                  <Image src={item.image} alt="상품 섬네일" fill className="object-cover" />
                </div>
              </Link>
            </td>

            <td className="w-full p-2">
              <div className="flex flex-col gap-2">
                <Link href={`/items/${item.id}`} className="text-base font-semibold text-gray-800">
                  <strong className="sr-only">{item.name}</strong>
                  {item.name}
                </Link>
                <div className="mt-6 text-sm text-gray-600">
                  {/* 내가 선택한 색상/사이즈로 변경, 현재 수량 - + 사이에 표시 및 변경가능하게 구현하기*/}
                  <p className="text-gray-600 text-sm my-4 ml-1 font-medium">
                    <span>
                      색상:&nbsp;
                      <span>{item.color}</span>
                    </span>
                    <span className="px-2">|</span>
                    <span>
                      사이즈:&nbsp;
                      <span>{item.options}</span>
                    </span>
                  </p>
                </div>
                <Link
                  href="/"
                  className="w-fit border bg-peach-300 text-gray-700 text-sm rounded py-1 px-3"
                >
                  선택 수정
                </Link>
              </div>
            </td>

            <td className="min-w-[100px] p-2">
              <div className="flex items-center justify-center gap-2 text-sm">
                <button type="button" aria-label="수량 감소" className="">
                  <Minus size={16} />
                </button>
                <input type="text" value={item.count} readOnly className="w-10 text-center " />
                <button type="button" aria-label="수량 증가" className="">
                  <Plus size={16} />
                </button>
              </div>
            </td>

            <td className="min-w-[115px] p-2">
              <div className=" flex flex-col items-center justify-center">
                <s className="text-sm text-gray-600">{item.originalPrice}</s>
                <span className="text-lg ">{item.salePrice}</span>
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
        ))}
      </tbody>
    </table>
  );
};

export default CartItemBox;
