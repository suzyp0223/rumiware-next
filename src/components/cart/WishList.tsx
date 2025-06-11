import Link from "next/link";
import CloseIcon from "../icons/CloseIcon";

const WishList = () => {
  return (
    <>
      <div>
        <h1>찜한상품</h1>

        <div>
          찜상품리스트
          <div>
            <span>체크박스</span>
            <div>
              thumbnail이미지
              <Link href={""}>{/* <Image src="" /> */}</Link>
            </div>
            <ul>
              <strong>
                상품명
                <Link href={"/"}>상품링크</Link>
              </strong>
              <li>
                <span>+</span>
                <span>수량</span>
                <span>-</span>
                <span>가격</span>
              </li>
            </ul>
            <div>
              버튼그룹
              <span>
                <button type="button">장바구니</button>
                <button type="button">주문하기</button>
              </span>
            </div>

            <ul>
              <li className="flex justify-between">
                <span>총 상품금액</span>
                <span>10,000원</span>
              </li>
              <li className="flex justify-between">
                <span>총 배송비</span>
                <span>3,000원</span>
              </li>
              <li className="flex justify-between font-bold">
                <span>결제예정금액</span>
                <span>13,000원</span>
              </li>
            </ul>
          </div>
          <CloseIcon />
        </div>

        <div>전체선택, 전체삭제, 선택삭제,전체상품주문 선택상품주문버튼</div>

        <div>페이지네이션</div>
      </div>
    </>
  );
};

export default WishList;
