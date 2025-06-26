import CheckboxBtn from "./CheckboxBtn";

interface SelectBtnProps {
  showOrderBtn?: boolean;
}
const SelectBtn = ({ showOrderBtn = true }: SelectBtnProps) => {
  return (
    <>
      {/* 전체선택 / 선택삭제 / 선택 상품 주문 버튼 */}
      <section aria-label="장바구니 기능 버튼">
        <ul className="flex flex-row gap-2 mx-2 mt-4 mb-4 items-center text-base font-bold">
          <li className="mr-4 cursor-pointer">
            <label className="flex items-center gap-2 font-normal" htmlFor="selectAll">
              <CheckboxBtn id="selectAll" />
              <span className="font-bold">전체선택</span>
            </label>
          </li>
          <li className="h-6 border-l border-gray-400"></li>
          <li className="">
            <button className="px-3 py-1">선택삭제</button>
          </li>

          {showOrderBtn && (
            <>
              <li className="h-6 border-l border-gray-400"></li>
              <li className="">
                <button className="px-3 py-1 border border-peach-200 bg-peach-200 rounded">
                  선택 상품 주문
                </button>
              </li>
            </>
          )}
        </ul>
      </section>
    </>
  );
};

export default SelectBtn;
