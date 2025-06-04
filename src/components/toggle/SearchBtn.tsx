import Image from "next/image";
import search from "../../assets/icon/search.svg";

export default function searchBtn() {
  return (
    <>
      <div className="hidden md:flex items-center gap-6">
        {/* 🔍 검색 input + 버튼 */}
        <div className="flex items-center w-[320px] h-15">
          <button type="button" className="w-12 h-12 flex items-center justify-center bg-white ">
            <Image src={search} alt="검색" className="w-15 h-15" />
          </button>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 h-10 border-b border-gray-300 focus:outline-none px-4 text-base hover:border-gray-900"
          />
        </div>
      </div>
    </>
  );
}
