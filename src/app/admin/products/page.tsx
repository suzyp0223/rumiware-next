"use client";

import { useState } from "react";

export default function SeedProductsPage() {
  const [log, setLog] = useState("");

  const run = async () => {
    try {
      const res = await fetch("/api/admin/seed-products", { method: "POST" });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setLog((data.log || []).join("\n"));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setLog((prev) => prev + "\n❌ " + msg);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Seed products to Firestore</h1>
      <button onClick={run} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
        시드 실행
      </button>
      <pre className="p-3 bg-gray-100 rounded whitespace-pre-wrap">{log}</pre>
      <p className="text-sm text-gray-500">* 실행 후 이 페이지는 관리자 전용으로 제한하세요.</p>
    </div>
  );
}
