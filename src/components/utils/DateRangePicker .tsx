"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center p-2">
      <div className="w-2/6">
        <label className="text-sm font-medium mr-2">시작일</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
          className="border px-3 py-2 rounded w-36 hover:border-peach-400"
          placeholderText="날짜 선택"
        />
      </div>

      <span className="mx-2">~</span>

      <div className="w-2/6">
        <label className="text-sm font-medium mr-2">종료일</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate ?? undefined}
          dateFormat="yyyy-MM-dd"
          className="border px-3 py-2 rounded w-36 hover:border-peach-400"
          placeholderText="날짜 선택"
        />
      </div>
      <div className="w-2/6">
        <button
          type="submit"
          className="w-full bg-peach-400 rounded text-center px-3 py-2 text-gray-800 cursor-pointer"
        >
          조회
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
