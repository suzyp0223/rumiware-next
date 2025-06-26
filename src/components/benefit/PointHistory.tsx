import Link from "next/link";

const PointHistory = () => {
  return (
    <>
      {/* 적립금내역 */}
      <div className="tracking-widest border-b border-black px-4 pb-2 text-xl mt-16">
        <h3 className="font-medium text-lg">적립금내역</h3>
      </div>

      <div>
        <table summary="날짜, 적립내역, 적립금" className="w-full table-fixed">
          <caption className="sr-only">적립금액</caption>
          <colgroup>
            <col style={{ width: "135px" }} />
            <col style={{ width: "*" }} />
            <col style={{ width: "135px" }} />
          </colgroup>
          <thead>
            <tr className="text-sm border-b bg-peach-100">
              <th className="py-4">날짜</th>
              <th>내역</th>
              <th>적립금</th>
            </tr>
          </thead>

          <tbody className="border-b">
            <tr className="text-sm">
              <th scope="row" className="text-center py-2 font-normal ">
                2025.06.23
              </th>
              <th scope="row" className="text-center py-2 font-normal">
                가입축하 적립금
              </th>
              <td className="text-center py-2 font-semibold">0원</td>
            </tr>
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div>
          <Link href=""></Link>
        </div>
      </div>
    </>
  );
};

export default PointHistory;
