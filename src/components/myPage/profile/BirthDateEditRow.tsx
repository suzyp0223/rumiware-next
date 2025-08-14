"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser, type UserState } from "@/store/slices/userSlice";

type Props = { user: UserState | null };

export default function BirthDateEditRow({ user }: Props) {
  const dispatch = useAppDispatch();

  // ★ 변경: 표시용 조각 상태 - YY/MM/DD (2자리 연도)
  const [birthY, setBirthY] = useState("");
  const [birthM, setBirthM] = useState("");
  const [birthD, setBirthD] = useState("");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ★ 변경: YYMMDD → 조각으로 분해
  const fromCompactYY = (yymmdd: string) => {
    const s = (yymmdd ?? "").replace(/\D/g, "").slice(0, 6);
    setBirthY(s.slice(0, 2)); // YY
    setBirthM(s.slice(2, 4)); // MM
    setBirthD(s.slice(4, 6)); // DD
  };

  // ★ 변경: 조각 → YYMMDD
  const toCompactYY = () => `${birthY}${birthM}${birthD}`;

  // ★ 변경: user 갱신 시(편집 중이 아닐 때만) YYMMDD로 동기화
  useEffect(() => {
    if (user && user.type === "email" && !editing) {
      fromCompactYY(user.birthDate ?? "");
    }
  }, [user, editing]);

  // 편집 인풋(YYMMDD 붙여서) 값
  const editValue = useMemo(() => toCompactYY(), [birthY, birthM, birthD]);

  // ★ 변경: 6자리 형식(YYMMDD) 검증
  const isSixDigit = /^\d{6}$/.test(editValue);

  // ★ 변경: 날짜 유효성 (세기 모호성 해결 위해 2000 + YY로 판정)
  const isValidDate = (() => {
    if (!isSixDigit) return false;
    const yy = Number(editValue.slice(0, 2)); // 00~99
    const mm = Number(editValue.slice(2, 4));
    const dd = Number(editValue.slice(4, 6));
    if (mm < 1 || mm > 12) return false;

    // 2000~2099로 가정하여 윤년 계산 (YY만 있는 환경에서 합리적 가정)
    const fullYear = 2000 + yy;
    const lastDay = new Date(fullYear, mm, 0).getDate();
    return dd >= 1 && dd <= lastDay;
  })();

  // ★ 변경: 동일값 비교도 YYMMDD(6자리) 기준
  const isSameAsUser = user?.type === "email" ? editValue === (user.birthDate ?? "") : true;

  const disabled = saving || (editing && (!isSixDigit || !isValidDate || isSameAsUser));

  // ★ 변경: 저장 - Firestore/Redux도 YYMMDD(6자리)로 반영
  const handleSave = async () => {
    if (!user || user.type !== "email") return;

    setError(null);

    const next = editValue; // "YYMMDD"
    if (!/^\d{6}$/.test(next)) {
      setError("생년월일은 YYMMDD 형식으로 입력해주세요.");
      return;
    }
    if (!isValidDate) {
      setError("존재하지 않는 날짜입니다.");
      return;
    }
    if (isSameAsUser) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), { birthDate: next }); // ★ 변경: 6자리 저장
      dispatch(setUser({ ...user, birthDate: next })); // ★ 변경: 전역 동기화
      setEditing(false);
    } catch (e) {
      console.error("생년월일 저장 오류:", e);
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 align-middle text-left whitespace-nowrap">생년월일</th>
      <td className="p-4 align-middle">
        {!editing ? (
          // ★ 표시 모드: 년/월/일 각각 border 유지 (YY 년 / MM 월 / DD 일)
          <div className="flex items-center">
            <span className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 mr-2">
              {birthY ? `${birthY} 년` : "-"}
            </span>
            <span className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 mr-2">
              {birthM ? `${birthM} 월` : "-"}
            </span>
            <span className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 mr-2">
              {birthD ? `${birthD} 일` : "-"}
            </span>

            <button
              type="button"
              onClick={() => {
                // 편집 시작 시 최신 유저 값으로 세팅
                if (user && user.type === "email") fromCompactYY(user.birthDate ?? "");
                setError(null);
                setEditing(true);
              }}
              className="ml-4 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 rounded"
            >
              수정
            </button>
          </div>
        ) : (
          // ★ 편집 모드: 한 개 인풋에서 YYMMDD로 붙여 입력
          <div className="flex items-center">
            <input
              type="text"
              value={birthY}
              onChange={(e) => setBirthY(e.target.value.replace(/\D/g, "").slice(0, 2))}
              maxLength={2}
              placeholder="YY"
              inputMode="numeric"
              className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 w-[50px] text-center"
            />
            <span className="mx-1">년</span>

            <input
              type="text"
              value={birthM}
              onChange={(e) => setBirthM(e.target.value.replace(/\D/g, "").slice(0, 2))}
              maxLength={2}
              placeholder="MM"
              inputMode="numeric"
              className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 w-[40px] text-center"
            />
            <span className="mx-1">월</span>

            <input
              type="text"
              value={birthD}
              onChange={(e) => setBirthD(e.target.value.replace(/\D/g, "").slice(0, 2))}
              maxLength={2}
              placeholder="DD"
              inputMode="numeric"
              className="outline-none border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600 p-2 w-[40px] text-center"
            />
            <span className="mx-1">일</span>
            <button
              type="button"
              onClick={handleSave}
              disabled={disabled}
              className="ml-4 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 rounded disabled:opacity-50"
            >
              {saving ? "저장중..." : "저장"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (user && user.type === "email") fromCompactYY(user.birthDate ?? "");
                setError(null);
                setEditing(false);
              }}
              disabled={saving}
              className="ml-2 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 rounded disabled:opacity-50"
            >
              취소
            </button>
          </div>
        )}

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </td>
    </tr>
  );
}
