import Image from "next/image";
import Link from "next/link";

const ItemDetail = () => {
  return (
    <div>
      {/* // 개별 상품 페이지 지마켓 */}
      <div>
        <ul>
          <li>
            <Link href="/">홈</Link>
          </li>
        </ul>
      </div>

      {/* 상품 섬네일 */}
      <div>
        <div>
          <Image width={24} height={24} alt="상품 섬네일" src="/" className="" />
        </div>
        <span className="">1+1</span>
      </div>

      {/* 상품 텍스트 정보 */}
      <div>
        <div>[EVENT] 라벤더 라운드 티</div>
        <div>
          <div>
            <span>80%</span>
            <span>15,000원</span>
            <s>120,000원</s>
          </div>
          <div>
            <Link href="/">
              <Image src="" width={24} height={24} alt="관심상품 등록" />
            </Link>
            <Link href="/">
              <Image src="" width={24} height={24} alt="공유하기" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
