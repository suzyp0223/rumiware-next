"use client";

import Image from "next/image";
import Link from "next/link";

import MyPageSideNav from "../MyPageSideNav";
import { ChangeEvent, useState } from "react";
import CloseIcon from "../../icons/CloseIcon";
import { useRouter } from "next/navigation";
import ConfirmModal from "../../ui/modals/ConfirmModal";

const ReviewWriteForm = () => {
  const [textCnt, setTextCnt] = useState(0);
  const [, setFileCnt] = useState(0);
  const [fileTextCntArr, setFileTextCntArr] = useState<string[]>([]);
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);

  const [isCancelModal, setIsCancelModal] = useState(false);
  const router = useRouter();

  // const validateReview = (text: string) => {
  //   if (20 > text.length || text.length > 300) {
  //     return "리뷰는 20자 이상 300자 이내로 작성해주세요";
  //   }
  //   return null;
  // };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextCnt(e.target.value.length);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileCnt(files ? files.length : 0);
    if (!files) return;

    const fileArray = Array.from(files).slice(0, 10);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImgs(previews);
    setFileTextCntArr(Array(fileArray.length).fill(""));
  };

  const fileTextHandleChange = (idx: number, value: string) => {
    // React에서는 상태를 직접 수정하면 안 되므로 복사해서 써야 함.
    const newDescriptions = [...fileTextCntArr];
    // 해당 위치의 값만 업뎃
    newDescriptions[idx] = value;
    // React 상태 업데이트
    setFileTextCntArr(newDescriptions);
  };

  const handleDelete = (idx: number) => {
    // 이미지 미리보기 배열에서 삭제
    const newImgs = [...previewImgs];
    newImgs.splice(idx, 1);
    setPreviewImgs(newImgs);

    // 설명 배열에서 삭제
    const newDescriptions = [...fileTextCntArr];
    newDescriptions.splice(idx, 1); //ids 위치의 항목 하나만 제거
    setFileTextCntArr(fileTextCntArr);
  };

  const handleCancelClick = () => {
    // 모달 보여주기
    setIsCancelModal(true);
  };

  const confirmCancel = () => {
    setPreviewImgs([]); // 첨부한 미리보기 이미지 초기화
    setFileTextCntArr([]); // 각 이미지에 적은 설명 텍스트 초기화
    setIsCancelModal(false); // 모달 닫기

    // 페이지 이동
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push("/myPage/myReview");
    }
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
            <li className="pb-4 border-b">
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
            <li className="flex my-4">
              <div className="w-[100px] shrink-0 py-4">사진첨부</div>
              <div className="flex flex-col items-center px-4">
                <div className="flex-1 text-left text-sm">
                  <input
                    type="file"
                    id="reviewFileBtn"
                    multiple
                    onChange={handleFileChange}
                    className="hidden peer"
                    accept="img/*"
                  />
                  <label
                    htmlFor="reviewFileBtn"
                    className="inline-block cursor-pointer px-4 py-2 rounded border
                    border-peach-300 bg-white
                    hover:bg-peach-300 hover:text-gray-800"
                  >
                    파일 선택
                  </label>
                  <span className="ml-4">
                    <strong>{previewImgs.length}</strong>&nbsp;/&nbsp;<span>10</span>
                  </span>
                  <span className="text-xs text -gray-700 ml-8">
                    사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.
                  </span>
                </div>
                <ul className="flex flex-wrap gap-4 self-start mt-4">
                  {previewImgs.map((src, idx) => (
                    <li key={idx} className="flex flex-row ">
                      <div className="h-[70px] w-[460px] border rounded flex flex-row ">
                        <div className="w-[70px] h-[68px] relative">
                          <Image
                            src={src}
                            alt={`preview-${idx}`}
                            fill
                            className="object-cover rounded"
                          ></Image>
                        </div>
                        <div className="w-[380px]">
                          <textarea
                            rows={3}
                            placeholder="이 사진을 설명해주세요."
                            maxLength={150}
                            value={fileTextCntArr[idx] || ""}
                            onChange={(e) => fileTextHandleChange(idx, e.target.value)}
                            className="w-full text-xs outline-none resize-none my-2 mx-2"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex items-center ml-4 text-sm my-2">
                        <span>
                          <strong>{fileTextCntArr[idx]?.length}</strong>&nbsp;/&nbsp;
                          <span>150</span>
                        </span>
                        <button onClick={() => handleDelete(idx)}>
                          <CloseIcon className="w-8 ml-2" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>

          {/* 제출, 취소 버튼 */}
          <div className="flex flex-row justify-center items-center">
            <button className="w-[120px] h-[40px] border border-peach-300 bg-peach-300 hover:text-gray-800 rounded mr-4">
              등록하기
            </button>

            <button onClick={handleCancelClick}>
              <CloseIcon className="w-[120px] h-[40px] border border-peach-300 rounded" />
            </button>
          </div>
        </div>
      </section>

      {/* 모달 */}
      <ConfirmModal
        isOpen={isCancelModal}
        onConfirm={confirmCancel}
        onCancel={() => setIsCancelModal(false)}
      />
    </div>
  );
};

export default ReviewWriteForm;
