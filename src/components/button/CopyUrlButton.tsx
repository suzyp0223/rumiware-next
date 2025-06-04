"use client";

import { useState } from "react";

const CopyUrlButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("❌ URL 복사에 실패했습니다.");
      console.error(err);
    }
  };

  return (
    <button onClick={handleCopyUrl} className="inline text-sm px-2 py-2 rounded-2xl text-gray-600 ">
      {copied ? `✅ 복사완료! ${window.location.href}` : "🔗 페이지 URL 복사"}
    </button>
  );
};

export default CopyUrlButton;
