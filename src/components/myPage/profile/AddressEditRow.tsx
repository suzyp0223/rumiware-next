"use client";

import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser, type UserState } from "@/store/slices/userSlice";

type Props = { user: UserState | null };

export default function AddressEditRow({ user }: Props) {
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // ★ 변경: user 바뀌면(편집 중이 아닐 때만) 초기화
  useEffect(() => {
    if (user && user.type === "email" && !editing) {
      // @ts-expect-error address 필드가 스키마에 없다면 추가 필요
      setAddress((user as any).address ?? "");
    }
  }, [user, editing]);

  const same = address.trim() === (((user as any)?.address ?? "") as string).trim();
  const disabled = saving || (editing && (!address.trim() || same));

  const handleSave = async () => {
    if (!user || user.type !== "email") return;
    const next = address.trim();
    if (!next || same) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), { address: next }); // ★ 변경: 스키마 추가 필요
      dispatch(setUser({ ...user, address: next } as any)); // ★ 변경: 전역 동기화
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 text-left whitespace-nowrap">주소</th>
      <td className="p-4 align-middle">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && editing && !disabled && handleSave()}
          readOnly={!editing}
          placeholder="도로명 주소"
          className={`outline-none w-[500px] px-2 border-b ${
            editing
              ? "border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
              : "border-transparent text-gray-700"
          }`}
          maxLength={200}
        />
        <button
          type="button"
          onClick={() => (!editing ? setEditing(true) : handleSave())}
          disabled={disabled}
          className="ml-4 px-3 py-1 text-sm border border-gray-300 hover:border-peach-300 rounded disabled:opacity-50"
        >
          {saving ? "저장중..." : editing ? "저장" : "수정"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setAddress((user as any)?.address ?? "");
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
}
