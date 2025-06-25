import Link from "next/link";
import CloseIcon from "../../icons/CloseIcon";
import PasswordToggle from "../../toggle/PasswordToggle";
import SocialLogin from "./SocialLogin";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-2 px-5">
      <div className="mb-2">
        <div className="relative border border-gray-300 rounded-t">
          <input
            type="text"
            placeholder="아이디(이메일)"
            className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9] rounded-t"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <CloseIcon />
          </span>
        </div>
        <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
          아이디(이메일)를 입력해주세요.
        </div>
      </div>
      <div className="mb-4">
        <div className="relative border border-gray-300 rounded-t">
          <input
            type="text"
            placeholder="비밀번호"
            className="outline-none px-4 py-2 w-96
                border-b  border-transparent focus:border-[#0073e9] rounded-t"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 mr-2">
            <PasswordToggle />
          </span>
        </div>
        <div className="text-xs text-[var(--color-red-500)] mx-2 mt-2">
          비밀번호를 입력해주세요.
        </div>
      </div>

      <div className="text-xs flex flex-row items-center space-evenly">
        <label htmlFor="" className="flex items-center" arial-checked="false">
          <input type="checkbox" className="w-5 h-5 custom-checkbox" />
          <span className="mx-2">자동 로그인</span>
        </label>
        <label htmlFor="" className="flex items-center mr-2" arial-checked="false">
          <input type="checkbox" className="w-5 h-5 custom-checkbox" />
          <span className="mx-2">아이디 저장</span>
        </label>
        <Link href="/auth/findAuth" className="text-[var(--color-blue-600)] ml-16 mr-6 right-arrow">
          아이디∙비밀번호 찾기
        </Link>
      </div>

      <div className="flex flex-col">
        <button className="bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded w-96 my-2 text-center">
          로그인
        </button>
        <SocialLogin />
        <div className="m-4 border-b border-gray-200"></div>
        <Link href="/join" className="w-96 my-2">
          <div className="text-center border border-[var(--color-blue-600)] text-[var(--color-blue-600)] hover:bg-[var(--color-blue-600)] hover:text-white py-2 rounded">
            회원가입
          </div>
        </Link>
        <p className="text-center text-xs text-gray-500 py-4">
          &copy; &nbsp;박수지. All Rights Reserved.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
