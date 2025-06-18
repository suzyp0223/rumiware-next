"use client";

import { useRef, useState } from "react";
import { DaumPostcodeData } from "../types/daum";

const AddressForm = () => {
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const detailAddressRef = useRef<HTMLInputElement | null>(null);

  const handleAddressSearch = () => {
    // 주소 검색 모달만 호출하는 방식
    new window.daum.Postcode({
      popupTitle: "Rumiware 루미웨어 주소 검색",
      popupKey: "popup1",
      oncomplete: (data: DaumPostcodeData) => {
        setZonecode(data.zonecode); // 우편번호
        setAddress(data.address); // 기본주소 (도로명 or 지번)

        setTimeout(() => {
          detailAddressRef.current?.focus(); // ← 안전하게 focus
        }, 0);
      },
    }).open();
  };

  return (
    <td className="p-4">
      <ul className="flex flex-col">
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="mr-4">
              <span className="for-a11y hidden">배송지명</span>
              <span>집</span>
            </div>
            <div>
              <span className="hidden">수령인</span>
              <span className="font-bold ">박수지</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mr-4">
            <input
              type="text"
              value={zonecode}
              placeholder="우편번호"
              readOnly
              className="mr-4 outline-none border-b-2 w-[100px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 text-base"
            />
            <button
              type="button"
              onClick={handleAddressSearch}
              className="p-2 text-xs border border-gray-300 outline-none hover:border-[#0073e9] hover:text-[#0073e9]"
            >
              주소검색
            </button>
          </div>
        </div>

        <input
          type="text"
          value={address}
          placeholder="기본주소"
          readOnly
          className="outline-none border-b-2 w-[600px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 text-base"
        />

        <input
          type="text"
          id="detailAddress"
          ref={detailAddressRef}
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
          placeholder="상세주소 입력"
          className="outline-none border-b-2 w-[600px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 text-base"
        />
        <label className="text-xs">
          <span className="text-red-400">*</span>&nbsp;상세주소를 입력해주세요
        </label>
      </ul>
    </td>
  );
};

export default AddressForm;
