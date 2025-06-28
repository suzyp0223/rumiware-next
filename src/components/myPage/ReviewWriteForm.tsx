"use client";

import Image from "next/image";
import Link from "next/link";

import MyPageSideNav from "./MyPageSideNav";
import CloseIcon from "../icons/CloseIcon";
import { ChangeEvent, useState } from "react";

const ReviewWriteForm = () => {
  const [textCnt, setTextCnt] = useState(0);
  const [fileCnt, setFileCnt] = useState(0);

  // const validateReview = (text: string) => {
  //   if (20 > text.length || text.length > 300) {
  //     return "리뷰는 20자 이상 300자 이내로 작성해주세요";
  //   }
  //   return null;
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileCnt(files ? files.length : 0);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCnt(e.target.value.length);
  };

  return (
    <div className="mt-12 w-full flex gap-6 justify-center px-[26px]">
      {/* 사이드 바 */}
      <aside className="w-1/5 min-w-[150px] max-w-[150px] m-4">
        <MyPageSideNav />
      </aside>

      {/* 리뷰 작성 섹션 */}
      <section className="w-full max-w-3xl m-2 mt-4 min-h-[800px]">
        <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
          <h3 className="font-medium text-lg">리뷰작성</h3>
        </div>

        <div className="">
          <ul className="flex flex-col w-full gap-2 py-4 mb-10 border-b">
            <li className="pb-4">
              <div className="flex flex-col mx-4">
                <p className="mb-2">
                  <span className="mr-10 text-sm">2025.06.26</span>
                  <span className=" font-bold">별별별별별</span>
                </p>
                <div className="flex flex-row">
                  <Link href="">
                    <div className="w-[100px] h-[120px] relative bg-peach-300">
                      <Image src="/assets/items/item1.jpg" alt="" fill />
                    </div>
                  </Link>
                  <div className="ml-4 text-left">
                    <p>핑크자수 H라인 치마바지</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="my-4 mx-4">
              <div className="flex flex-row ">
                <div className="w-[100px] shrink-0 py-4">리뷰</div>
                <div className="flex-1 text-left text-sm pl-4 ">
                  {/* 평소 사이즈/키 선택 */}
                  <div className="grid grid-cols-2 gap-x-12">
                    <dl className="mb-6 flex flex-row">
                      <dt className="pr-4 font-semibold">평소 사이즈</dt>
                      <dd>
                        <label htmlFor="user_size" className="sr-only">
                          사이즈 선택
                        </label>
                        <select
                          name=""
                          id="user_size"
                          className="border px-2 py-1 rounded outline-none cursor-pointer"
                        >
                          <option value="">선택</option>
                          <option value="44">44</option>
                          <option value="55">55</option>
                          <option value="66">66</option>
                          <option value="77">77</option>
                          <option value="88">88</option>
                        </select>
                      </dd>
                    </dl>
                    <dl className="mb-6 flex flex-row">
                      <dt className="pr-4 font-semibold">평소 키</dt>
                      <dd>
                        <label htmlFor="user_height" className="sr-only">
                          키 선택
                        </label>
                        <select
                          name=""
                          id="user_height"
                          className="border px-2 py-1 rounded outline-none cursor-pointer"
                        >
                          {Array.from({ length: 41 }, (_, i) => {
                            const height = 140 + i;
                            return (
                              <option key={height} value={height}>
                                {height}cm
                              </option>
                            );
                          })}
                        </select>
                      </dd>
                    </dl>
                  </div>

                  {/* 사이즈/색상 선택 */}
                  <div className="grid grid-cols-2 gap-x-12">
                    <dl>
                      <dt className="pb-2 font-semibold">사이즈</dt>
                      <dd className="">
                        {["작다", "정사이즈", "크다"].map((label, idx) => (
                          <div key={label} className="pb-1">
                            <input
                              type="radio"
                              value={label}
                              id={`sizeType-${idx + 1}`}
                              className="mr-1"
                            />
                            {label}
                          </div>
                        ))}
                      </dd>
                    </dl>
                    <dl className="">
                      <dt className="pb-2 font-semibold">색상</dt>
                      <dd>
                        <dd className="">
                          {["화면과 비슷하다", "화면과 같다", "화면과 다르다"].map((label, idx) => (
                            <div key={label} className="pb-1">
                              <input
                                type="radio"
                                value={label}
                                id={`sizeType-${idx + 1}`}
                                className="mr-1"
                              />
                              {label}
                            </div>
                          ))}
                        </dd>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </li>
            <li className="my-4">
              <div className="flex px-4">
                <div className="w-[100px] shrink-0 py-4">상세리뷰</div>
                <div className="flex-1 text-left text-sm">
                  <textarea
                    name=""
                    id=""
                    onChange={handleChange}
                    rows={5}
                    maxLength={1000}
                    placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요."
                    className="w-full h-[150px] p-2 outline-none border resize-none"
                  />

                  <div className="text-right">
                    <span>{textCnt}&nbsp;/&nbsp;1000</span>
                  </div>
                  <ul className="text-xs text-gray-700 list-disc list-inside ">
                    <li>상품 품질과 관계 없는 내용은 비공개 처리될 수 있습니다.</li>
                    <li>
                      작성된 리뷰는 삭제 전까지 ‘상품 리뷰’에 공개되고, ‘나의정보 &gt; 리뷰
                      관리’에서 수정 및 삭제가 가능합니다.
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="my-4">
              <div className="flex px-4">
                <div className="w-[100px] shrink-0 py-4">사진첨부</div>
                <div className="flex-1 text-left text-sm">
                  <input
                    type="file"
                    id="reviewFileBtn"
                    multiple
                    onChange={handleFileChange}
                    className="hidden peer"
                  />
                  <label
                    htmlFor="reviewFileBtn"
                    className="inline-block cursor-pointer px-4 py-2 rounded border border-peach-300 bg-white hover:bg-peach-300 hover:text-gray-800"
                  >
                    파일 선택
                  </label>
                  <span className="ml-4">
                    <strong>2</strong>&nbsp;/&nbsp;<span>10</span>
                  </span>
                  <span className="text-xs text -gray-700 ml-8">
                    사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.
                  </span>
                </div>
              </div>
            </li>
          </ul>

          {/* 제출, 취소 버튼 */}
          <div className="flex flex-row justify-center items-center">
            <button className="w-[120px] h-[40px] border border-peach-300 bg-peach-300 hover:text-gray-800 rounded mr-4">
              등록하기
            </button>
            <div className="">
              <CloseIcon className="w-[120px] h-[40px] border border-peach-300 rounded" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewWriteForm;
