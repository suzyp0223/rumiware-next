// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import HamBtnToggle from "@/components/toggle/HamBtnToggle";
// import Sidebar from "@/components/common/Sidebar";
// import { Category } from "./Category";

// export default function ResponsiveNav() {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen((p) => !p);
//   const closeSidebar = () => setIsOpen(false);

//   return (
//     <>
//       {/* 모바일: 햄버거 + 1뎁 링크 프리뷰 */}
//       <nav className="md:hidden">
//         <ul className="flex justify-center items-center gap-6 text-sm font-medium bg-gray-100">
//           <li className="hover:bg-[#e5e7eb] rounded-md">
//             <HamBtnToggle
//               isOpen={isOpen}
//               toggleSidebar={toggleSidebar}
//               closeSidebar={closeSidebar}
//             />
//           </li>
//           {Category.map((cat) => (
//             <li key={cat.name} className="relative mx-1">
//               <Link
//                 href={cat.pathName}
//                 className="hover:underline hover:text-[var(--color-red-400)]"
//               >
//                 {cat.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* 사이드 메뉴: 상태는 상위에서 제어 */}
//         <Sidebar isOpen={isOpen} onClose={closeSidebar} category={Category} />
//       </nav>

//       {/* 데스크톱: 가로 탭 */}
//       <nav className="hidden md:block bg-gray-100">
//         <ul className="flex justify-center gap-6 text-sm font-medium py-2">
//           {Category.map((cat) => (
//             <li key={cat.name} className="mb-4">
//               <Link
//                 href={cat.pathName}
//                 className="font-bold text-base text-gray-700 hover:text-blue-500"
//               >
//                 {cat.name}
//               </Link>

//               {/* 2뎁 */}
//               {cat.subcategories && (
//                 <ul className="ml-4 mt-2 space-y-1">
//                   {cat.subcategories.map((sub) => (
//                     <li key={sub.name}>
//                       <Link href={sub.pathName} className="text-gray-600 hover:text-blue-500">
//                         └ {sub.name}
//                       </Link>

//                       {/* 3뎁 */}
//                       {sub.thirdSubcategories && (
//                         <ul className="ml-4 mt-1 space-y-1">
//                           {sub.thirdSubcategories.map((third) => (
//                             <li key={third.name}>
//                               <Link
//                                 href={third.pathName}
//                                 className="text-gray-500 hover:text-blue-500"
//                               >
//                                 &nbsp;&nbsp;&nbsp;&nbsp;↳ {third.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// }
