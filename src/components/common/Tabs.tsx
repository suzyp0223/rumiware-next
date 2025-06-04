import Link from "next/link";
import { Category } from "./Category";

const Tabs = () => {
  return (
    <ul className="md:flex justify-center gap-6 text-sm font-medium py-2 bg-gray-100">
      {Category.map((category) => (
        <li key={category.name} className="mb-4">
          <Link
            href={category.pathName}
            className="font-bold text-base text-gray-700 hover:text-blue-500"
          >
            {category.name}
          </Link>

          {/* 2단계: subcategories */}
          {category.subcategories && (
            <ul className="ml-4 mt-2 space-y-1">
              {category.subcategories.map((sub) => (
                <li key={sub.name}>
                  <Link href={sub.pathName} className="text-gray-600 hover:text-blue-500">
                    └ {sub.name}
                  </Link>

                  {/* 3단계: thirdSubcategories */}
                  {sub.thirdSubcategories && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {sub.thirdSubcategories.map((third) => (
                        <li key={third.name}>
                          <Link href={third.pathName} className="text-gray-500 hover:text-blue-500">
                            &nbsp;&nbsp;&nbsp;&nbsp;↳ {third.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
