import { useState } from "react";

const FindAuth = () => {
  const [checkRadio, setCheckRadio] = useState<"email" | "tempPwd">("email");

  return (
    <form className="flex flex-col gap-2 px-5">
      <div className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto">
        <div className="w-[400px]">
          <p className="text-xs text-gray-600">
            회원가입 시, 입력하신 이름 + 이메일 또는 휴대폰 번호로 아이디를 확인하실 수 있습니다.
          </p>
        </div>
        <div className="mt-4 mb-2 ml-2 text-xs self-start">
          <label className={`mr-10 ${checkRadio === "email" ? "text-[#0073e9]" : "text-black"}`}>
            <input
              type="radio"
              checked={checkRadio === "email"}
              onChange={() => setCheckRadio("email")}
              className="align-middle accent-[#0073e9]"
            />
            &nbsp;이메일로 찾기
          </label>
          <label className={` ${checkRadio === "tempPwd" ? "text-[#0073e9]" : "text-black"}`}>
            <input
              type="radio"
              checked={checkRadio === "tempPwd"}
              onChange={() => setCheckRadio("tempPwd")}
              className="align-middle"
            />
            &nbsp;휴대폰 번호로 찾기
          </label>
        </div>

        <div className="w-96 flex flex-col">
          <ul className="">
            <li className="border border-gray-300 mb-2 p-2 ">
              <label className={`hidden`}>NAME</label>
              <input
                type="text"
                className="outline-none block w-full"
                placeholder="NAME"
                maxLength={30}
                title="이름"
              />
            </li>
            {checkRadio === "email" ? (
              <li className="border border-gray-300 p-2 ">
                <label className="hidden">E-MAIL</label>
                <input
                  type="text"
                  className="outline-none block w-full"
                  placeholder="E-MAIL"
                  maxLength={80}
                  title="이멜 주소"
                />
              </li>
            ) : (
              <li className="border border-gray-300 p-2">
                <label className="hidden">PHONE NUMBER</label>
                <input
                  type="text"
                  className="outline-none block w-full"
                  placeholder="PHONE NUMBER"
                  maxLength={15}
                  title="휴대폰 번호"
                />
              </li>
            )}
          </ul>
          <div className="mt-4">
            <button className="block  border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 py-2 rounded w-96 my-2 text-center transition-all duration-30 ease-in">
              아이디 찾기
            </button>
            <button className="block bg-blue-600 text-white border hover:text-blue-600 hover:bg-white hover:border-blue-600 py-2 rounded w-96 my-2 text-center transition-all duration-30 ease-in">
              로그인
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FindAuth;
