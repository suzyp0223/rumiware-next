"use client";

import clsx from "clsx";
import Link from "next/link";
import { Category } from "../common/Category";

interface LocationNavProps {
  category: string;
}

const LocationNav = ({ category }: LocationNavProps) => {
  const segments = category.split("/").filter(Boolean);

  let accumulatedPath = "";
  const breadcrumbItems = segments.map((segment) => {
    accumulatedPath += `/${segment}`;

    const matchedCategory = findCategoryNameByPath(accumulatedPath);
    return {
      name: matchedCategory || segment,
      href: accumulatedPath,
    };
  });

  return (
    <nav className="text-sm text-gray-800 mt-12 ml-4">
      <ul className="flex gap-2 mb-2">
        <li className="relative">
          <Link href="/" className="hover:underline">
            홈&nbsp;
          </Link>
          <span className="mx-1">/</span>
        </li>

        {breadcrumbItems.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <Link
              href={item.href}
              className={clsx("hover:underline", {
                "font-bold text-black": idx === breadcrumbItems.length - 1,
              })}
            >
              {item.name}
            </Link>
            {idx < breadcrumbItems.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

function findCategoryNameByPath(path: string): string | null {
  for (const cate of Category) {
    if (cate.pathName === path) return cate.name;
    if (cate.subcategories) {
      for (const sub of cate.subcategories) {
        if (sub.pathName === path) return sub.name;
        if (sub.thirdSubcategories) {
          for (const third of sub.thirdSubcategories) {
            if (third.pathName === path) return third.name;
          }
        }
      }
    }
  }
  return null;
}

export default LocationNav;
