import DownArrIcon from "../icons/DownArrIcon";

const Join = () => {
  return (
    <form className="flex flex-col gap-2 px-5">
      <div
        className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto
        border border-gray-200 "
      >
        <h1 className="text-3ml mb-3">회원가입</h1>
        <ul className="flex flex-row gap-2 text-center px-4">
          <div className="">
            <li>
              <div className="relative border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="아이디(이메일)"
                  className="outline-none  px-4 py-2 w-96
                    border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
                <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-4">
                  아이디 중복 확인
                </button>
              </div>

              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-blue-500)] mx-2 mt-2">
                  사용 가능한 아이디(이메일)입니다.
                </span>
                <span className="text-[var(--color-red-500)] mx-2 mt-2 hidden">
                  아이디(이메일)가 중복입니다. 다시 입력해주세요.
                </span>
              </div>
            </li>

            <li>
              <div className="border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="비밀번호"
                  className="outline-none  px-4 py-2 w-96
                  border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-blue-500)] mx-2 mt-2">
                  비밀번호 확인을 입력해주세요.
                </span>
              </div>
              <div className="border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="비밀번호 확인"
                  className="outline-none  px-4 py-2 w-96
                border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-[var(--color-red-500)] mx-2 mt-2">
                  비밀번호가 다릅니다.&nbsp; 다시 입력해주세요.
                </span>
              </div>
            </li>

            <li className="pt-2">
              <div className="border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="이름"
                  className="outline-none  px-4 py-2 w-96
                border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
            </li>

            <li>
              <div className="border border-gray-300 rounded-t">
                <input
                  type="text"
                  placeholder="생년월일 8자리"
                  className="outline-none  px-4 py-2 w-96
                border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
              <div className="flex flex-row border border-gray-300 rounded-t p-2">
                <ul className="flex flex-row p-2">
                  <li className="p-2  border border-gray-300 rounded hover:border-blue-600">
                    <input type="radio" />
                    <label htmlFor="gender1">남자</label>
                  </li>
                  <li className="p-2 border border-gray-300 rounded hover:border-blue-600">
                    <input type="radio" />
                    <label htmlFor="gender2">여자</label>
                  </li>
                </ul>
                <ul className="flex flex-row p-2">
                  <li className="p-2 border border-gray-300 rounded hover:border-blue-600">
                    <input type="radio" />
                    <label htmlFor="foreigner1">내국인</label>
                  </li>
                  <li className="p-2 border border-gray-300 rounded hover:border-blue-600">
                    <input type="radio" />
                    <label htmlFor="foreigner2">외국인</label>
                  </li>
                </ul>
              </div>
            </li>

            <li className="py-2">
              <div className="border border-gray-300 rounded-t p-2">
                <button
                  type="button"
                  aria-expanded="false"
                  className="flex flex-row space-around items-center gap-2"
                >
                  <span className="">통신사 선택</span>
                  <DownArrIcon />
                </button>
                <ul className="text-xs">
                  <li className="">
                    <button type="button" className="">
                      <span className="">KT</span>
                    </button>
                  </li>
                  <li className="">
                    <button type="button" className="">
                      <span className="">KT 알뜰폰</span>
                    </button>
                  </li>
                  <li className="">
                    <button type="button" className="">
                      <span className="">LG U+</span>
                    </button>
                  </li>
                  <li className="">
                    <button type="button" className="">
                      <span className="">LG U+ 알뜰폰</span>
                    </button>
                  </li>
                  <li className="">
                    <button type="button" className="">
                      <span className="">SKT</span>
                    </button>
                  </li>
                  <li className="">
                    <button type="button" className="">
                      <span className="">SKT 알뜰폰</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-300 rounded-t p-2">
                <input
                  type="tell"
                  maxLength={16}
                  placeholder="휴대전화번호"
                  className="outline-none  px-4 py-2 w-96
                border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
                />
              </div>
            </li>
          </div>

          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default Join;
