// "use client";

// import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import CloseIcon from "../../icons/CloseIcon";

const ReviewWritten = () => {
  // const pathname = usePathname();
  // const message = pathname === "/myPage/myReview"
  // ? "리뷰를 삭제하시겠습니까?"
  // : "리뷰 작성을 취소하시겠습니까?"

  return (
    <ul className="">
      <li className="min-h-[50px] flex justify-between bg-peach-100 p-4 rounded">
        <div className="flex">
          <Link href="">
            <div className="w-[50px] h-[50px] relative bg-peach-300">
              <Image src="/assets/items/item1.jpg" alt="" fill />
            </div>
          </Link>
          <div className="ml-4 text-left">
            <p className="mb-2 font-bold">
              별별별별별 <span>2025.06.26</span>
            </p>
            <p>
              <Link href="">핑크자수 H라인 치마바지</Link>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-6">
          <button className="border rounded bg-peach-300 px-3 py-1 ">수정</button>
          <CloseIcon />
        </div>
      </li>
      <li className="border-b">
        <div className="px-2 py-4 flex items-start">
          {/* 유저가 올린 이미지 */}
          <div className="w-[70px] h-[90px] relative bg-peach-300 shrink-0">
            <Image src="/assets/items/item1.jpg" alt="" fill />
          </div>
          <div className="px-4 text-left">
            <strong>봄날에 데이트룩으로 이쁜 핑크자수 치마바지</strong>
            <p className="text-gray-600 text-sm py-2">
              <span>
                배꼽부터 길이가 시작돼요 4부정도 되는 길이에 스판끼 있는 치마바지에요 배꼽부터
                길이가 시작돼요 4부정도 되는 길이에 스판끼 있는 치마바지에요배꼽부터 길이가 시작돼요
                4부정도 되는 길이에 스판끼 있는 치마바지에요배꼽부터 길이가 시작돼요 4부정도 되는
                길이에 스판끼 있는 치마바지에요배꼽부터 길이가 시작돼요 4부정도 되는 길이에 스판끼
                있는 치마바지에요
              </span>
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ReviewWritten;
