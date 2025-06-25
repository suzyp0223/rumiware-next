const BuyerInfo = () => {
  return (
    <div>
      {/* 주문자정보*/}
      <section className="w-full max-w-3xl m-2 mt-4 mb-6">
        <div className="tracking-widest flex flex-row items-center justify-between px-4 pb-2 border-b-2 border-black">
          <h1 className="font-medium text-lg">주문자 정보</h1>
        </div>

        <div>
          <table summary="" className="w-full table-fixed">
            <caption className="sr-only">주문자 정보</caption>
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "22%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <tbody className="text-sm">
              <tr className="border-b border-gray-200">
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  이름
                </th>
                <td className="text-left px-2 py-2">박수지</td>
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  연락처
                </th>
                <td className="text-left px-2 py-2">010-3395-0640</td>
              </tr>
              <tr className="border-b border-gray-200">
                <th scope="row" className="text-left px-2 py-2 font-medium bg-peach-100">
                  주문메세지
                </th>
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

export default BuyerInfo;
