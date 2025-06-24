import Image from "next/image";
import Link from "next/link";

const WishList = () => {
  return (
    <div className="mt-16">
      <div className="tracking-widest flex flex-row items-center justify-between pb-4 border-b-2 border-black">
        <h1 className="font-medium text-lg">관심상품</h1>
        <Link href="/myPage/wishListBox" className="text-sm mr-6 right-arrow-view">
          전체보기
        </Link>
      </div>
      <div className="mt-4 flex gap-2">
        <dl className="w-1/4 flex flex-col items-center ">
          <dt className="mb-2">
            <Link href="">
              <div className="w-[160px] h-[200px] relative bg-peach-300">
                <Image src="/assets/items/item11.jpg" alt="" fill className=""></Image>
              </div>
            </Link>
          </dt>
          <dd>
            <ul>
              <li className="text-base mb-2">
                <Link href="">
                  <span>옐로우 플레어 롱원피스</span>
                </Link>
              </li>
              <li className="mb-2">
                <div className="text-base">
                  <span className="text-peach-hoverText font-semibold mr-3">60%</span>
                  {/* originalPrice */}
                  <span className="font-semibold mr-2">120,000</span>
                  {/* salePrice */}
                  <s className="text-sm text-gray-700">56,000</s>
                </div>
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="w-1/4 flex flex-col items-center ">
          <dt className="mb-2">
            <Link href="">
              <div className="w-[160px] h-[200px] relative bg-peach-300">
                <Image src="/assets/items/item11.jpg" alt="" fill className=""></Image>
              </div>
            </Link>
          </dt>
          <dd>
            <ul>
              <li className="text-base mb-2">
                <Link href="">
                  <span>옐로우 플레어 롱원피스</span>
                </Link>
              </li>
              <li className="mb-2">
                <div className="text-base">
                  <span className="text-peach-hoverText font-semibold mr-3">60%</span>
                  {/* originalPrice */}
                  <span className="font-semibold mr-2">120,000</span>
                  {/* salePrice */}
                  <s className="text-sm text-gray-700">56,000</s>
                </div>
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="w-1/4 flex flex-col items-center ">
          <dt className="mb-2">
            <Link href="">
              <div className="w-[160px] h-[200px] relative bg-peach-300">
                <Image src="/assets/items/item11.jpg" alt="" fill className=""></Image>
              </div>
            </Link>
          </dt>
          <dd>
            <ul>
              <li className="text-base mb-2">
                <Link href="">
                  <span>옐로우 플레어 롱원피스</span>
                </Link>
              </li>
              <li className="mb-2">
                <div className="text-base">
                  <span className="text-peach-hoverText font-semibold mr-3">60%</span>
                  {/* originalPrice */}
                  <span className="font-semibold mr-2">120,000</span>
                  {/* salePrice */}
                  <s className="text-sm text-gray-700">56,000</s>
                </div>
              </li>
            </ul>
          </dd>
        </dl>
        <dl className="w-1/4 flex flex-col items-center ">
          <dt className="mb-2">
            <Link href="">
              <div className="w-[160px] h-[200px] relative bg-peach-300">
                <Image src="/assets/items/item11.jpg" alt="" fill className=""></Image>
              </div>
            </Link>
          </dt>
          <dd>
            <ul>
              <li className="text-base mb-2">
                <Link href="">
                  <span>옐로우 플레어 롱원피스</span>
                </Link>
              </li>
              <li className="mb-2">
                <div className="text-base">
                  <span className="text-peach-hoverText font-semibold mr-3">60%</span>
                  {/* originalPrice */}
                  <span className="font-semibold mr-2">120,000</span>
                  {/* salePrice */}
                  <s className="text-sm text-gray-700">56,000</s>
                </div>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default WishList;
