"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser, type UserState } from "@/store/slices/userSlice";

const onlyDigits = (s: string) => s.replace(/\D/g, "");
const toHyphen = (digits: string) => digits.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");

type Props = { user: UserState | null };

const PhoneEditRow = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false); // ✅ 저장 중 표시용

  // user 바뀌면(편집 중이 아닐 때만) 표시값 초기화
  useEffect(() => {
    if (user && user.type === "email" && !editing) {
      const digits = user.phoneNumber ?? "";
      setPhone(/^\d{11}$/.test(digits) ? toHyphen(digits) : digits);
    }
  }, [user, editing]);

  const digitsFromUI = useMemo(() => onlyDigits(phone), [phone]);
  const isFormatOk = /^010\d{8}$/.test(digitsFromUI);
  const isSame = digitsFromUI === (user?.type === "email" ? user.phoneNumber ?? "" : "");
  const disabled = saving || (editing && (!isFormatOk || isSame));

  const handleSave = async () => {
    if (!user || user.type !== "email") return;
    const next = onlyDigits(phone);
    if (!/^010\d{8}$/.test(next)) return;
    if (isSame) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), { phoneNumber: next });
      dispatch(setUser({ ...user, phoneNumber: next }));
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 text-left whitespace-nowrap">휴대폰</th>
      <td className="p-4 align-middle">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && editing && !disabled && handleSave()}
          readOnly={!editing} // 보기↔수정 전환
          className={`outline-none w-[200px] mx-2 px-2 border-b ${
            editing
              ? "border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
              : "border-transparent text-gray-700"
          }`}
          placeholder="010-1234-5678"
          inputMode="numeric"
          maxLength={13}
        />
        <button
          type="button"
          onClick={() => (!editing ? setEditing(true) : handleSave())}
          disabled={disabled}
          className="ml-4 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded disabled:opacity-50"

          // className="ml-4 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 rounded disabled:opacity-50"
        >
          {saving ? "저장중..." : editing ? "저장" : "수정"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              const digits = user?.type === "email" ? user.phoneNumber ?? "" : "";
              setPhone(/^\d{11}$/.test(digits) ? toHyphen(digits) : digits);
              setEditing(false);
            }}
            disabled={saving}
            className="ml-2 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 rounded disabled:opacity-50"
          >
            취소
          </button>
        )}
      </td>
    </tr>
  );
};
export default PhoneEditRow;
