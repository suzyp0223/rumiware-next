import Image from "next/image";
import Link from "next/link";

const OrderDetail = () => {
  return (
    <>
      {/* 주문상세내역 */}
      <section className="w-full max-w-3xl m-2 mt-4 mb-6">
        <div className="tracking-widest items-center justify-between px-4 pb-2 border-b-2 border-black">
          <h1 className="font-medium text-lg">주문 상세내역</h1>
        </div>

        <div>
          <table className="w-full table-fixed">
            <caption className="sr-only">최근 주문 정보 목록</caption>
            <colgroup>
              <col className="w-[50%]" />
              <col className="w-[20%]" />
              <col className="w-[17%]" />
              <col className="w-[13%]" />
            </colgroup>

            <thead>
              <tr className="border-b border-gray-300 ">
                <th scope="row" className="">
                  <div>
                    <ul className="text-sm flex items-center m-2">
                      <li className="flex items-center h-6 border-r border-gray-500">
                        <span className="mr-4">2023.05.21</span>
                      </li>
                      <li className="flex items-center">
                        <span className="ml-4 font-normal whitespace-nowrap max-w-[200px]">
                          20230521145320-25504963453
                        </span>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-800 border-b">
                <td className="py-4 px-2 flex flex-row items-center ">
                  <div className="">
                    <Link href="">
                      <div className="w-[80px] h-[100px] relative bg-peach-300">
                        <Image src="/assets/items/item1.jpg" alt="" fill className=""></Image>
                      </div>
                    </Link>
                  </div>
                  <div className="ml-4 text-left">
                    <p className="text-sm font-semibold">
                      <Link href="">핑크자수 H라인 치마 외 14건</Link>
                    </p>
                    <p className="text-gray-600 text-sm my-4">
                      <span>
                        색상:&nbsp;
                        <span>핑크</span>
                      </span>
                      <span className="px-2">|</span>
                      <span>
                        사이즈:&nbsp;
                        <span>M</span>
                      </span>
                      <span className="px-2">|</span>
                      <span>
                        수량:&nbsp;
                        <span>1개</span>
                      </span>
                    </p>
                  </div>
                </td>
                <td className="">
                  <div className="">
                    <ul className="text-xs p-2 flex flex-col">
                      <li className="my-6 text-black flex justify-between">
                        <span className="">상품금액</span>
                        <strong className="">300,000원</strong>
                      </li>
                      <li className="mb-2 flex justify-between">
                        <span>적립금</span>
                        <span>3,000원</span>
                      </li>
                      <li className="mb-2 flex justify-between">
                        <span>포인트</span>
                        <span>0원</span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="py-4 px-1 text-center text-xs">
                  <div className="flex flex-col gap-2">
                    <strong className="text-peach-600">배송완료</strong>
                    <p>우체국택배</p>
                    <p>6079264334316</p>
                  </div>
                </td>
                <td className="py-4 text-center text-xs">
                  <div>
                    <Link href="" className="border border-peach-400 px-3 py-2 rounded">
                      후기작성
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default OrderDetail;
