const CurrentPoint = () => {
  return (
    <>
      {/* 보유중인 적립금 */}
      <div className="tracking-widest border-b border-black px-4 pb-2 text-xl">
        <h3 className="font-medium text-lg">보유중인 적립금</h3>
      </div>

      <div>
        <table summary="보유 적립금, 출석체크 누적금" className="w-full table-fixed">
          <caption className="sr-only">적립금액</caption>
          <colgroup>
            <col style={{ width: "180px" }} />
            <col style={{ width: "*" }} />
            <col style={{ width: "180px" }} />
            <col style={{ width: "*" }} />
          </colgroup>
          <tbody className="border-b">
            <tr className="text-sm">
              <th scope="row" className="text-center py-2 bg-peach-100 font-normal ">
                총 보유 적립금
              </th>
              <td className="text-center py-2 font-semibold">1,200원</td>
              <th scope="row" className="text-center py-2 bg-peach-100 font-normal ">
                출석체크 누적 적립금
              </th>
              <td className="text-center py-2 font-semibold">550원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentPoint;
