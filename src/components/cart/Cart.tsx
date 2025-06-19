import CheckboxBtn from "../button/CheckboxBtn";
import CartItemBox from "./CartItemBox";
import CartPriceBox from "./CartPriceBox";

const Cart = () => {
  return (
    <div className="w-[800px] mx-auto">
      <div className="border-b border-black px-4 pb-2 text-xl">
        <span>장바구니</span>
      </div>

      <section aria-label="장바구니 기능 버튼">
        <ul className="flex flex-row gap-2 mx-2 mt-4 mb-8 items-center text-base font-bold">
          <li className="mr-4 cursor-pointer">
            <label className="flex items-center gap-2" htmlFor="selectAll">
              <CheckboxBtn id="selectAll" />
              <span className="">전체선택</span>
            </label>
          </li>
          <li className="h-6 border-l border-gray-400"></li>
          <li className="">
            <button className="px-3 py-1">선택삭제</button>
          </li>
          <li className="h-6 border-l border-gray-400"></li>
          <li className="">
            <button className="px-3 py-1 ">선택 상품 주문</button>
          </li>
        </ul>
      </section>

      <div className="flex flex-col items-center ">
        <CartItemBox />
        <CartPriceBox />
      </div>
    </div>
  );
};

export default Cart;
