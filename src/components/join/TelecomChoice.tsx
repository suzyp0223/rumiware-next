import { useState } from "react";
import DownArrIcon from "../icons/DownArrIcon";

const TelecomChoice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTel, setSelectedTel] = useState("통신사 선택");
  const [phone, setPhone] = useState("");

  const formatPhoneNum = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length > 4) return onlyNumbers;
    if (onlyNumbers.length < 8) {
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    } else {
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPhone(formatPhoneNum(input));
  };

  const telList = ["KT", "KT 알뜰폰", "LG U+", "LG U+ 알뜰폰", "SKT", "SKT 알뜰폰"];

  return (
    <li className="py-2">
      <div className="border border-gray-300 rounded-t p-2">
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex flex-row space-around items-center gap-2"
        >
          <span className="">{selectedTel}</span>
          <DownArrIcon />
        </button>

        {isOpen && (
          <ul className="absolute bg-white mt-2 w-full z-10 shadow-md text-xs">
            {telList.map((tel) => (
              <li className="" key={tel}>
                <button
                  type="button"
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedTel(tel);
                    setIsOpen(false);
                  }}
                >
                  {tel}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border border-gray-300 rounded-t p-2">
        <input
          value={phone}
          type="tell"
          maxLength={13}
          placeholder="휴대전화번호"
          onChange={handleChange}
          className="outline-none  px-4 py-2 w-96
                border-b-2 border-transparent focus:border-[#0073e9] rounded-t mr-2"
        />
      </div>
    </li>
  );
};

export default TelecomChoice;
