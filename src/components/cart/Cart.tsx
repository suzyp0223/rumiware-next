import SelectBtn from "../button/SelectBtn";
import CartItemBox from "./CartItemBox";
import CartPriceBox from "./CartPriceBox";

const Cart = () => {
  return (
    <div className="w-[800px] mx-auto mt-12 mb-8">
      <div className="border-b border-black px-4 pb-2 text-xl">
        <span>장바구니</span>
      </div>

      <SelectBtn />

      <div className="flex flex-col items-center ">
        <CartItemBox />
        <CartPriceBox />
      </div>
    </div>
  );
};

export default Cart;
