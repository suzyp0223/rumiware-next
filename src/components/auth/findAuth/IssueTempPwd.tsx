import { useState } from "react";

const IssueTempPwd = () => {
  const [checkRadio, setCheckRadio] = useState<"email" | "tempPwd">("email");

  return (
    <form className="flex flex-col gap-2 px-5">
      <div className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto">
        <div className="w-[400px]">
          <p className="text-xs text-gray-600 leading-normal">
            가입하신 아이디+이메일 또는 휴대폰번호를 입력, 본인인증을 통해 이메일 또는 휴대폰번호로
            임시 비밀번호를 보내드립니다. 확인 후 로그인하셔서 반드시 비밀번호를 변경하시기
            바랍니다.
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
              <label className={`hidden`}>ID</label>
              <input
                type="text"
                className="outline-none block w-full"
                placeholder="ID"
                maxLength={30}
                title="아이디"
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
              임시 비밀번호 발급
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

export default IssueTempPwd;
