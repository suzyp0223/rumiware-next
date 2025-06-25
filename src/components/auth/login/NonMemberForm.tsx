import Link from "next/link";
import CloseIcon from "../../icons/CloseIcon";
import PasswordToggle from "../../toggle/PasswordToggle";

const NonMemberForm = () => {
  return (
    <form className="flex flex-col gap-2 px-5">
      <div className="flex flex-col gap-2 w-full items-center">
        {/* 구매자 이름 */}
        <div className="mb-2">
          <div className="relative w-96 border border-gray-300 rounded-t">
            <input
              type="text"
              placeholder="구매자 이름"
              className="outline-none w-full px-4 py-2 border-b border-transparent focus:border-[#0073e9] rounded-t"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <CloseIcon />
            </span>
          </div>
          <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
            구매자 이름을 입력해주세요.
          </div>
        </div>

        {/* // 구매번호 */}
        <div className="mb-2">
          <div className="relative w-96 border border-gray-300 rounded-t">
            <input
              type="text"
              placeholder="구매번호"
              className="outline-none w-full px-4 py-2 border-b border-transparent focus:border-[#0073e9] rounded-t"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <CloseIcon />
            </span>
          </div>
          <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
            구매번호를 입력해주세요.
          </div>
        </div>

        {/* // 비회원 비밀번호 */}
        <div className="mb-2">
          <div className="relative w-96 border border-gray-300 rounded-t">
            <input
              type="text"
              placeholder="비회원 구매 비밀번호"
              className="outline-none w-full px-4 py-2 border-b border-transparent focus:border-[#0073e9] rounded-t"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 mr-2">
              <PasswordToggle />
            </span>
          </div>
          <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
            비회원 구매 비밀번호를 입력해주세요.
          </div>
        </div>

        <div className="flex flex-col">
          <button className=" bg-[var(--color-gray-200)] border hover:bg-[var(--color-gray-600)] hover:text-white py-2 rounded w-96 mt-4 text-center">
            비회원 배송조회
          </button>
          <div className="m-4 border-b border-gray-200"></div>
          <Link href="/join" className="w-96">
            <div className="text-center border border-[var(--color-blue-600)] text-[var(--color-blue-600)] hover:bg-[var(--color-blue-600)] hover:text-white py-2 rounded">
              회원가입
            </div>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default NonMemberForm;
