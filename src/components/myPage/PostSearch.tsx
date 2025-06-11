"use client";

import { useState } from "react";

declare global {
  interface Window {
    daum: any;
  }
}

const PostSearch = () => {
  const [address, setAddress] = useState("");

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const fullAddress = data.address;
        setAddress(fullAddress);
      },
    }).open();
  };

  return (
    <div>
      <input
        type="text"
        readOnly
        value={address}
        placeholder="주소를 검색하세요"
        className="border px-4 py-2 w-full max-w-md"
      />
      <button
        type="button"
        onClick={openPostcode}
        className="ml-2 px-4 py-2 bg-blue-500 text-white"
      >
        주소 검색
      </button>
    </div>
  );
};

export default PostSearch;
