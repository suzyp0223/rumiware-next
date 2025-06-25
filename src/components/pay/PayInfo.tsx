const PayInfo = () => {
  return (
    <div>
      {/* 결제정보*/}
      <section className="w-full max-w-3xl m-2 mt-4 mb-6">
        <div className="tracking-widest flex flex-row items-center justify-between px-4 pb-2 border-b-2 border-black">
          <h1 className="font-medium text-lg">결제 정보</h1>
        </div>

        <div>
          <table className="w-full table-fixed">
            <caption className="sr-only">배송지 정보</caption>
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <tbody className="text-sm">
              <tr className="border-b border-gray-200">
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  주문금액
                </th>
                <td className="text-left px-2 py-2 font-semibold">300,000원</td>
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  할인금액
                </th>
                <td className="text-left px-2 py-2 text-red-500 font-semibold">0원</td>
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  배송비
                </th>
                <td className="text-left px-2 py-2 text-black">3,500원</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  최종 결제 금액
                </th>
              </tr>
              <tr className="border-b border-gray-200">
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  결제수단
                </th>
                <td className="text-left px-2 py-2">
                  카드
                  <span> ㅡ </span>
                </td>
                <td className="text-left px-2 py-2">300,000원</td>
                <td className="text-left px-2 py-2">NO.12345678901234</td>
                <td colSpan={3} className="text-left px-2 py-2">
                  {/* 내용이 없을 경우 빈칸 */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PayInfo;
