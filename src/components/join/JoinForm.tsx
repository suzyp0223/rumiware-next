import CarrierChoice from "./CarrierChoice";

const JoinForm = () => {
  return (
    <form className="flex flex-col  px-5">
      <div
        className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto
        border border-gray-200  mt-12"
      >
        <h1 className="text-3xl mb-3">회원가입</h1>
        <ul className="flex flex-row text-center px-4">
          <div className="">
            <li className="mb-4">
              <div className="relative border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="아이디(이메일)"
                  className="outline-none  px-4 py-2 w-96
                    border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
                <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-4">
                  아이디(이메일) 중복 확인
                </button>
              </div>

              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-blue-500)] ml-2 mt-2 text-left">
                  사용 가능한 아이디(이메일)입니다.
                </span>
                <span className="text-[var(--color-red-500)] mx-2 mt-2 hidden  text-left">
                  아이디(이메일)가 중복입니다. 다시 입력해주세요.
                </span>
              </div>
            </li>

            <li className="mb-4">
              <div className="border border-gray-300 ">
                <input
                  type="text"
                  placeholder="비밀번호"
                  className="outline-none  px-4 py-2 w-96
                  border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-col text-xs mb-4">
                <span className="text-[var(--color-blue-500)] mx-2 mt-2 text-left">
                  비밀번호 확인을 입력해주세요.
                </span>
              </div>
              <div className="border border-gray-300 rounded-b">
                <input
                  type="text"
                  placeholder="비밀번호 확인"
                  className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-red-500)] mx-2 mt-2 text-left">
                  비밀번호가 다릅니다.&nbsp; 다시 입력해주세요.
                </span>
              </div>
            </li>

            <li>
              <div className="border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="이름"
                  className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
            </li>

            <li className="pb-2">
              <div className="border border-gray-300 border-y-0">
                <input
                  type="text"
                  placeholder="생년월일 8자리"
                  className="outline-none  px-4 py-2 w-96
                border-b border-transparent focus:border-[#0073e9]  mr-2"
                />
              </div>
              <div className="flex border border-gray-300 rounded-b w-full p-2 text-sm">
                {/* 성별 */}
                <div className="w-1/2 flex mr-2">
                  {["남자", "여자"].map((label, idx) => (
                    <div key={label} className="relative flex-1">
                      <input
                        type="radio"
                        name="gender"
                        value={label}
                        id={`gender-${idx}`}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`gender-${idx}`}
                        className={`block text-center px-4 py-2 border border-gray-300
                          hover:border-blue-600 peer-checked:border-blue-600 cursor-pointer
                          ${idx === 0 ? "rounded-l border-r-0" : ""}
                          ${idx === 1 ? "rounded-r" : "-ml-px"}
                          `}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>

                {/* 내·외국인 */}
                <div className="w-1/2 flex text-sm">
                  {["내국인", "외국인"].map((label, idx) => (
                    <div key={label} className="relative flex-1">
                      <input
                        type="radio"
                        name="nationality"
                        value={label}
                        id={`nationality-${idx}`}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`nationality-${idx}`}
                        className={`block text-center px-4 py-2 border border-gray-300
                        hover:border-blue-600 peer-checked:border-blue-600 cursor-pointer
                        ${idx === 0 ? "rounded-l border-r-0" : ""}
                        ${idx === 1 ? "rounded-r" : "-ml-px"}
                        `}
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            <li className="py-2">
              <div className="">
                <ul className="text-s">
                  <CarrierChoice />
                </ul>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </form>
  );
};

export default JoinForm;
