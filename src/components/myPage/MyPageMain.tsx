import Link from "next/link";
import OrderedList from "./OrderedList";

const MyPageMain = () => {
  return (
    // 참고 stl 마이페이지
    <div className=" mt-12">
      <h1>마이페이지</h1>

      {/* 주문 처리 현황 */}
      <div>
        <h3>
          주문 처리 현황
          <span>(최근 3개월)</span>
        </h3>
      </div>
      <div>
        <div>
          <ul>
            주문 상태
            <li>
              <Link href={""}>
                <span>0</span>
              </Link>
              <span>입금전 {">"} </span>
            </li>
            <li>
              <Link href={""}>
                <span>0</span>
              </Link>
              <span>배송준비 중 {">"}</span>
            </li>
            <li>
              <Link href={""}>
                <span>0</span>
              </Link>
              <span>배송 중 {">"}</span>
            </li>
            <li>
              <Link href={""}>
                <span>0</span>
              </Link>
              <span>배송 완료</span>
            </li>
          </ul>
          <ul>
            서비스 상태
            <li>
              <strong>취소 :</strong>
              <Link href={""}>
                <span>0</span>
              </Link>
            </li>
            <li>
              <strong>교환 :</strong>
              <Link href={""}>
                <span>0</span>
              </Link>
            </li>
            <li>
              <strong>반품 :</strong>
              <Link href={""}>
                <span>0</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 주문 정보 */}
      <OrderedList />

      {/* 찜한상품-WishList */}

      {/* 최근 본 상품 */}
    </div>
  );
};

export default MyPageMain;
