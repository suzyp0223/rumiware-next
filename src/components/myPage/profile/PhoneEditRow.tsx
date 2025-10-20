"use client";

const onlyDigits = (s: string) => s.replace(/\D/g, "");
const toHyphen = (digits: string) =>
  /^\d{11}$/.test(digits) ? digits.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3") : digits;

type Props = {
  value: string; // 숫자만: "01012345678"
  onChange: (v: string) => void;
};

export default function PhoneEditRow({ value, onChange }: Props) {
  const display = toHyphen(value);
  const handleInput = (raw: string) => {
    const digits = onlyDigits(raw).slice(0, 11);
    onChange(digits); // 부모에는 숫자만 전달
  };

  return (
    <tr className="border-b border-gray-300">
      <th className="bg-peach-100 px-5 py-4 text-left whitespace-nowrap">휴대폰</th>
      <td className="p-4 align-middle">
        {/* {user?.phoneNumber} */}
        <input
          type="text"
          value={display}
          onChange={(e) => handleInput(e.target.value)}
          className="outline-none w-[200px] mx-2 px-2 border-b border-gray-300 hover:border-b-peach-600 focus:border-b-peach-600"
          placeholder="010-1234-5678"
          inputMode="numeric"
          maxLength={13}
        />
        {/* 간단 유효성 안내(선택) */}
        {value && !/^010\d{8}$/.test(value) && (
          <span className="ml-3 text-sm text-red-500">
            010으로 시작하는 11자리 번호를 입력하세요.
          </span>
        )}
      </td>
    </tr>
  );
}
