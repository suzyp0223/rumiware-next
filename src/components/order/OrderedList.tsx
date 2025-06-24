import Link from "next/link";

const OrderedList = () => {
  return (
    <div>
      <div>
        <div>
          <h3>주문 내역</h3>
        </div>
        <div></div>
      </div>

      <div>
        <table summary="주문일자, 상품명, 결제금액, 주문상세">
          <caption>주문 정보 목록</caption>
          <thead>
            <tr>
              <th>
                <div>번호</div>
              </th>
              <th>
                <div>주문일</div>
              </th>
              <th>
                <div>상품명</div>
              </th>
              <th>
                <div>결제금액</div>
              </th>
              <th>
                <div>주문상세</div>
              </th>
              <th>
                <div>배송현황</div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>2023.01.02</td>
              <td>
                <div>
                  <p>상품이름 외 10건</p>
                </div>
              </td>
              <td>
                <div>15,000원</div>
              </td>
              <td>
                {/* 주문상세내역 아코디언으로 구현 */}
                <div>
                  <Link href={""}>조회</Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderedList;
