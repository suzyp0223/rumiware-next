// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import KakaoMap from "../maps/KakaoMap";

// const MyInfo = () => {
//   const [emailDomain, setEmailDomain] = useState("");
//   const [isCustom, setIsCustom] = useState(false);
//   const [smsSelected, setSmsSelected] = useState<string>("yesSms");
//   const [emailSelected, setEmailSelected] = useState<string>("yesEmail");
//   const [genderSelected, setGenderSelected] = useState<string>("non");

//   const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = e.target.value;

//     if (selected === "direct") {
//       setIsCustom(true);
//       setEmailDomain("");
//     } else {
//       setIsCustom(false);
//       setEmailDomain(selected);
//     }
//   };

//   return (
//     <div className="w-[800px] mx-auto">
//       <div className="border-b border-black px-4 pb-2 text-xl">
//         <span>회원 정보</span>
//       </div>
//       <div className="">
//         <span className="w-full max-w-[800px] mx-auto text-sm px-2">
//           변경할 부분만 수정해주세요
//         </span>
//         <table className="w-[800px] mx-auto w-full mt-4">
//           <colgroup>
//             <col className="w-[180px]" /> {/* <!-- 첫 번째 열: th 열 -->*/}
//             <col className="w-auto" /> {/* <!-- 두 번째 열: td 열 --> */}
//           </colgroup>
//           <tbody className="">
//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label htmlFor="id" className="head-cell">
//                   <span className="text-red-400">*</span>&nbsp;아이디(이메일)
//                 </label>
//               </th>
//               <td className="p-2 m-4">
//                 <span className="inline-block px-4 py-2">2021234@naver.com</span>
//                 <input type="hidden" className="p-4" id="id" value="suzy2020" />
//                 <Link
//                   href={""}
//                   className="m-2 p-2 text-xs border border-gray-300 hover:border-[#0073e9] hover:text-[#0073e9]"
//                 >
//                   이메일 변경
//                 </Link>
//                 <div className="p-2 w-[600px]">
//                   <input
//                     type="text"
//                     className="w-[300px] border-gray-300 outline-none p-2 border-b hover:border-b-[#0073e9] focus:border-b-[#0073e9]"
//                   />

//                   {/* 인증메일 전송 버튼 클릭시 이멜중복검사 통과시 인증메일 전송 */}
//                   <button type="submit" className="ml-4 p-2 text-sm border border-gray-300">
//                     인증메일 전송
//                   </button>
//                 </div>
//               </td>
//             </tr>

//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label htmlFor="password1" className="head-cell">
//                   <span className="text-red-400">*</span>&nbsp;비밀번호
//                 </label>
//               </th>
//               <td className="p-4 pb-0">
//                 <input
//                   type="password"
//                   className="outline-none border-b w-[200px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 text-base"
//                   id="password1"
//                   size={15}
//                   maxLength={20}
//                 />
//                 <span className="block text-sm pt-2 pb-2 pl-2">
//                   * 영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자
//                 </span>
//               </td>
//             </tr>

//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label htmlFor="password2" className="">
//                   <span className="text-red-400">*</span>&nbsp;비밀번호 확인
//                 </label>
//               </th>
//               <td className="p-4 pb-0">
//                 <input
//                   type="password"
//                   className="outline-none border-b w-[200px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 text-base"
//                   id="password2"
//                 />
//                 <span className="block text-sm text-red-500 pb-2 pl-2">
//                   비밀번호가 일치하지 않습니다.
//                 </span>
//               </td>
//             </tr>

//             <tr className="border-y border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label htmlFor="hname" className="head-cell">
//                   <span className="text-red-400">*</span>&nbsp;이름
//                 </label>
//               </th>
//               <td className="pl-2">
//                 <input
//                   type="text"
//                   className="w-[200px] border-gray-300 outline-none px-4 py-2 border-b hover:border-b-[#0073e9] focus:border-b-[#0073e9]"
//                   id="hname"
//                   // value="박수지"
//                   size={15}
//                   maxLength={30}
//                 />
//               </td>
//             </tr>

//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label className="head-cell">
//                   <span className="text-red-400">*</span>&nbsp;휴대폰
//                 </label>
//               </th>
//               <td className="p-4">
//                 <select
//                   className="outline-none border-b border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-1 mr-4"
//                   id="etcphone1"
//                 >
//                   <option value="">선택</option>
//                   <option value="010">010</option>
//                   <option value="011">011</option>
//                   <option value="011">016</option>
//                   <option value="011">017</option>
//                   <option value="011">018</option>
//                   <option value="011">019</option>
//                 </select>
//                 -
//                 <input
//                   type="text"
//                   className="outline-none w-[80px] mx-2 px-2 border-b border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9]"
//                   id="etcphone2"
//                   size={4}
//                   maxLength={4}
//                 />
//                 -
//                 <input
//                   type="text"
//                   className="outline-none w-[80px] mx-2 px-2 border-b border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9]"
//                   id="etcphone3"
//                   size={4}
//                   maxLength={4}
//                 />
//               </td>
//             </tr>
//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label className="head-cell">
//                   <span className="text-red-400">*</span>&nbsp;수신설정
//                 </label>
//               </th>
//               <td className="p-4">
//                 <div className="p-2 mt-4">
//                   <span className="text-sm">이메일 수신 여부</span>
//                   <label
//                     className={`inline-block  pr-6 whitespace-nowrap pl-6 ${
//                       emailSelected === "yes" ? "text-[#0073e9]" : "text-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="emailAdd"
//                       value="yes"
//                       checked={emailSelected === "yes"}
//                       onChange={(e) => setEmailSelected(e.target.value)}
//                       className="mr-1 accent-[#0073e9]"
//                     />
//                     <span className="text-sm">수신함</span>
//                   </label>
//                   <label
//                     className={`inline-block  pr-6 whitespace-nowrap ${
//                       emailSelected === "no" ? "text-[#0073e9]" : "text-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="emailAdd"
//                       value="no"
//                       checked={emailSelected === "no"}
//                       onChange={(e) => setEmailSelected(e.target.value)}
//                       className="mr-1 accent-[#0073e9]"
//                     />
//                     <span className="text-sm">수신안함</span>
//                   </label>
//                 </div>
//                 <div className="p-2 mt-4">
//                   <span className="text-sm">문자 수신 여부</span>
//                   <label
//                     className={`inline-flex items-center px-6 cursor-pointer ${
//                       smsSelected === "yes" ? "text-[#0073e9]" : "text-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="sms"
//                       value="yesSms"
//                       checked={smsSelected === "yesSms"}
//                       onChange={(e) => setSmsSelected(e.target.value)}
//                       className="mr-1 accent-[#0073e9]"
//                     />
//                     <span className="text-sm">수신함</span>
//                   </label>
//                   <label
//                     className={`inline-flex items-center cursor-pointer ${
//                       smsSelected === "no" ? "text-[#0073e9]" : "text-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="sms"
//                       value="noSms"
//                       checked={smsSelected === "noSms"}
//                       onChange={(e) => setSmsSelected(e.target.value)}
//                       className="mr-1 accent-[#0073e9]"
//                     />
//                     <span className="text-sm">수신안함</span>
//                   </label>
//                 </div>
//               </td>
//             </tr>

//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label htmlFor="birthyear" className="">
//                   <span className="text-red-400">*</span>&nbsp;생년월일
//                 </label>
//               </th>
//               <td className="p-4">
//                 <select
//                   id="birthYear"
//                   className="outline-none border-b border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 mr-2"
//                 >
//                   <option value="">년</option>
//                   {Array.from({ length: 100 }, (_, i) => {
//                     const year = new Date().getFullYear() - i;
//                     return (
//                       <option key={year} value={year}>
//                         {year}년
//                       </option>
//                     );
//                   })}
//                 </select>

//                 <select
//                   id="birthMonth"
//                   className="outline-none border-b border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2 mr-2"
//                 >
//                   <option value="">월</option>
//                   {Array.from({ length: 12 }, (_, i) => {
//                     return (
//                       <option key={i + 1} value={i + 1}>
//                         {i + 1}월
//                       </option>
//                     );
//                   })}
//                 </select>

//                 <select
//                   id="birthDay"
//                   className="outline-none border-b border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9] p-2"
//                 >
//                   <option value="">일</option>
//                   {Array.from({ length: 31 }, (_, i) => {
//                     return (
//                       <option key={i + 1} value={i + 1}>
//                         {i + 1}일
//                       </option>
//                     );
//                   })}
//                 </select>
//               </td>
//             </tr>

//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <span className="text-red-400">*</span>&nbsp;성별
//               </th>
//               <td className="p-4">
//                 {[
//                   { label: "선택안함", value: "non" },
//                   { label: "남", value: "male" },
//                   { label: "여", value: "female" },
//                 ].map(({ label, value }) => (
//                   <label
//                     key={value}
//                     className={`inline-block  pr-6 whitespace-nowrap cursor-pointer ${
//                       genderSelected === value ? "text-[#0073e9]" : "text-black"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="gender"
//                       value={value}
//                       checked={genderSelected === value}
//                       onChange={(e) => setGenderSelected(e.target.value)}
//                       className="mr-1 accent-[#0073e9]"
//                     />
//                     {label}
//                   </label>
//                 ))}
//               </td>
//             </tr>

//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label htmlFor="address" className="">
//                   <span className="text-red-400">*</span>&nbsp;주소
//                 </label>
//               </th>

//               <KakaoMap />
//             </tr>
//             <tr className="border-b border-gray-300 ">
//               <th className="bg-gray-100 px-5 py-4 align-middle text-left">
//                 <label className="head-cell" htmlFor="email1">
//                   <span className="text-red-400">*</span>&nbsp;배송지
//                 </label>
//               </th>
//               <td className="pl-4 py-4">
//                 <input type="hidden" className="" id="oldemail" value="" />
//                 <input type="hidden" className="" id="email" value="" />
//                 <input
//                   type="text"
//                   className="outline-none border-b w-[180px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9]"
//                   id="email1"
//                   size={10}
//                   maxLength={20}
//                 />
//                 <span className="px-2">@</span>
//                 <input
//                   type="text"
//                   id="email3"
//                   className="outline-none border-b w-[150px] border-gray-300 hover:border-b-[#0073e9] focus:border-b-[#0073e9]"
//                   value={emailDomain}
//                   onChange={(e) => setEmailDomain(e.target.value)}
//                   size={15}
//                   maxLength={25}
//                 />
//                 <select
//                   className="px-2 outline-none text-sm"
//                   id="email2"
//                   onChange={handleDomainChange}
//                   value={isCustom ? "direct" : "emailDomain"}
//                 >
//                   <option value="direct">직접입력</option>
//                   <option value="naver.com">naver.com</option>
//                   <option value="gmail.com">gmail.com</option>
//                   <option value="hotmail.com">hotmail.com</option>
//                 </select>
//                 <Link
//                   href={""}
//                   className="m-2 p-2 text-xs border border-gray-300 hover:border-[#0073e9] hover:text-[#0073e9]"
//                 >
//                   이메일 중복확인
//                 </Link>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div>
//           <span>
//             <Link href="">회원탈퇴</Link>
//           </span>
//         </div>
//       </div>

//       {/* 소셜 연결 */}
//       <ul>
//         <li>
//           <dl>
//             <dt>
//               네이버
//               <Image src="" alt="네이버" className="" />
//             </dt>
//             <dd>
//               <Link href="">
//                 <Image src="" alt="연결하기" className="" />
//               </Link>
//               <Link href="">
//                 <Image src="" alt="연결끊기" className="" />
//               </Link>
//             </dd>
//           </dl>
//         </li>
//         <li>
//           <dl>
//             <dt>
//               카카오
//               <Image src="" alt="카카오" className="" />
//             </dt>
//             <dd>
//               <Link href="">
//                 <Image src="" alt="연결하기" className="" />
//               </Link>
//               <Link href="">
//                 <Image src="" alt="연결끊기" className="" />
//               </Link>
//             </dd>
//           </dl>
//         </li>
//       </ul>

//       <div>
//         <Link href="">취소</Link>
//         <Link href="">수정</Link>
//       </div>
//     </div>
//   );
// };

// export default MyInfo;
