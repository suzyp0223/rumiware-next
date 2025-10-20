"use client";

// import { type UserState } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";

const onlyDigits = (s: string) => (s ?? "").replace(/\D/g, "");
const splitYYMMDD = (v: string) => {
  const s = onlyDigits(v).slice(0, 6);
  return [s.slice(0, 2), s.slice(2, 4), s.slice(4, 6)] as const;
};

type Props = {
  // user: UserState | null;
  value: string; // "YYMMDD"
  onChange: (v: string) => void; // 부모 상태 갱신
};

export default function BirthDateEditRow({ value, onChange }: Props) {
  // 표시용 조각 상태
  const [yy, setYY] = useState("");
  const [mm, setMM] = useState("");
  const [dd, setDD] = useState("");

  // 부모 value 바뀌면 동기화
  useEffect(() => {
    const [y, m, d] = splitYYMMDD(value);
    setYY(y);
    setMM(m);
    setDD(d);
  }, [value]);

  // 입력 핸들러(숫자/길이 제한 → 부모로 합쳐서 전달)
  const onYY = (raw: string) => {
    const next = onlyDigits(raw).slice(0, 2);
    setYY(next);
    onChange(onlyDigits(`${next}${mm}${dd}`).slice(0, 6));
  };
  const onMM = (raw: string) => {
    const next = onlyDigits(raw).slice(0, 2);
    setMM(next);
    onChange(onlyDigits(`${yy}${next}${dd}`).slice(0, 6));
  };
  const onDD = (raw: string) => {
    const next = onlyDigits(raw).slice(0, 2);
    setDD(next);
    onChange(onlyDigits(`${yy}${mm}${next}`).slice(0, 6));
  };

  // 유효성(선택)
  const isSix = /^\d{6}$/.test(value);
  let validMsg: string | null = null;
  if (isSix) {
    const nYY = Number(value.slice(0, 2));
    const nMM = Number(value.slice(2, 4));
    const nDD = Number(value.slice(4, 6));
    if (nMM < 1 || nMM > 12) validMsg = "월은 01~12여야 합니다.";
    else {
      const fullYear = 2000 + nYY; // 필요 시 19xx/20xx 판별 정책 추가
      const last = new Date(fullYear, nMM, 0).getDate();
      if (nDD < 1 || nDD > last) validMsg = "존재하지 않는 날짜입니다.";
    }
  } else if (value) {
    validMsg = "YYMMDD 형식으로 입력하세요.";
  }

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">생년월일</th>
      <td className="p-4 align-middle">
        {/* {user?.birthDate} */}
        <div className="flex items-center">
          <input
            type="text"
            value={yy}
            onChange={(e) => onYY(e.target.value)}
            maxLength={2}
            placeholder="YY"
            inputMode="numeric"
            className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 w-[50px] text-center"
          />
          <span className="mx-1">년</span>

          <input
            type="text"
            value={mm}
            onChange={(e) => onMM(e.target.value)}
            maxLength={2}
            placeholder="MM"
            inputMode="numeric"
            className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 w-[40px] text-center"
          />
          <span className="mx-1">월</span>

          <input
            type="text"
            value={dd}
            onChange={(e) => onDD(e.target.value)}
            maxLength={2}
            placeholder="DD"
            inputMode="numeric"
            className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 w-[40px] text-center"
          />
          <span className="mx-1">일</span>
        </div>

        {validMsg && <p className="mt-2 text-xs text-red-500">{validMsg}</p>}
      </td>
    </tr>
  );
}
