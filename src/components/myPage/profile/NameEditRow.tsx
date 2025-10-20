"use client";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function CNameEditRow({ value, onChange }: Props) {
  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 text-left whitespace-nowrap">이름</th>
      <td className="p-4 align-middle">
        {/* {user?.name} */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="outline-none w-[220px] px-2 border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
          placeholder="이름"
          maxLength={30}
        />
      </td>
    </tr>
  );
}
