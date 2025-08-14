"use client";

import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser, type UserState } from "@/store/slices/userSlice";

type Props = { user: UserState | null };

const NameEditRow = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // user 바뀌면(편집 중이 아닐 때만) 표시값 초기화
  useEffect(() => {
    if (user && user.type === "email" && !editing) setName(user.name ?? "");
  }, [user, editing]);

  const isSame = name.trim() === ((user?.type === "email" ? user.name : "") ?? "").trim();
  const disabled = saving || (editing && (!name.trim() || isSame));

  const handleSave = async () => {
    if (!user || user.type !== "email") return;
    const next = name.trim();
    if (!next || isSame) {
      setEditing(false);
      return;
    }

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), { name: next });
      dispatch(setUser({ ...user, name: next }));
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="bg-peach-100 px-5 py-4 text-left whitespace-nowrap">이름</th>
      <td className="pl-2 align-middle">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && editing && !disabled && handleSave()}
          readOnly={!editing} // 보기↔수정 전환
          className={`w-[200px] outline-none px-4 py-2 border-b ${
            editing
              ? "border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
              : "border-transparent text-gray-700"
          }`}
          maxLength={30}
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
              setName(user?.type === "email" ? user.name ?? "" : "");
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

export default NameEditRow;
