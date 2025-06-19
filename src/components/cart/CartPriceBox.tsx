import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";

const CartPriceBox = () => {
  return (
    <div className="h-fit w-full bg-[#fff5f3] flex justify-around items-center gap-2 p-4">
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700">총 상품금액</span>
        <span className="">
          <span className="">
            <strong className="text-2xl">0</strong>
            <span className="">원</span>
          </span>
        </span>
      </div>
      <div className="">
        <MinusIcon />
        <span className="sr-only">빼기</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700">총 할인금액</span>
        <span className="">
          <span className="">
            <span className="text-red-500">
              <strong className="text-2xl">0</strong>
              <span className="">원</span>
            </span>
          </span>
        </span>
      </div>
      <div className="">
        <PlusIcon />
        <span className="sr-only">더하기</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700">총 배송비</span>
        <span className="">
          <span className="">
            <strong className="text-2xl">0</strong>
            <span className="">원</span>
          </span>
        </span>
      </div>
      <div className="">
        <i className="">
          <span className="sr-only">계산값은</span>
        </i>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700">총 결제 금액</span>
        <span className="">
          <span className="">
            <strong className="text-2xl">0</strong>
            <span className="">원</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartPriceBox;
