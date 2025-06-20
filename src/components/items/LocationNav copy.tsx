"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LocationNav = () => {
  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);

  let accumulatedPath = "";
  const breadcrumbItems = paths.map((segment, index) => {
    accumulatedPath += `/${segment}`;

    const matchedCategory = findCategoryNameByPath(accumulatedPath);
    return {
      name: matchedCategory || segment,
      href: accumulatedPath,
    };
  });

  return (
    <nav className="text-sm text-gray-800 mt-12 ml-4">
      <ul className="flex gap-2">
        <li className="relative">
          <Link href="/" className="hover:underline">
            홈
          </Link>
          <span className="mx-1">/</span>
        </li>

        {breadcrumbItems.map((item, idx) => (
          <li key={item.href} className="flex items-center">
          <Link href={items.href} className="hover:underline">{item.name}</Link>
          {idx < breadcrumbItems.length -1 && <span className="mx-1">/</span>}
          </li>
        ))}
          <div>
            <Link href="" aria-haspopup="menu" aria-expanded="false" aria-controls="loc-cate1">
              열기
            </Link>
            <span>
              <Link href="">남성의류</Link>
              <Link href="">캐주얼</Link>
            </span>
          </div>
        </li>

        <li>
          <Link href="">셔츠/남방</Link>
          <div>
            <Link href="" aria-haspopup="menu" aria-expanded="false" aria-controls="loc-cate1">
              열기
            </Link>
            <span>
              <Link href="">드레스 셔츠</Link>
              <Link href="">니트/가디건/베스트</Link>
              <Link href="">자켓/코드</Link>
            </span>
          </div>
        </li>

        <li>
          <Link href="">셔츠/남방</Link>
          <div>
            <Link href="" aria-haspopup="menu" aria-expanded="false" aria-controls="loc-cate1">
              열기
            </Link>
            <span>
              <Link href="">체크 셔츠/남방</Link>
              <Link href="">스트라이프 셔츠/남방</Link>
            </span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default LocationNav;
