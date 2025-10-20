// /* eslint-disable @typescript-eslint/no-unused-vars */
// // 전체 회원가입 UI
// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { DaumPostcodeData } from "../types/daum";

// import {
//   isSignInWithEmailLink,
//   linkWithCredential,
//   signInWithEmailLink,
//   signOut,
// } from "firebase/auth";

// import { auth } from "@/firebases/firebase";
// import { checkEmailDuplicate } from "@/firebases/checkEmailDuplicate";
// import sendEmailVerificationLink from "@/firebases/sendEmailVerificationLink";

// import { useAppDispatch } from "@/hooks/hooks";
// import updateEmailVerified from "@/hooks/updateEmailVerified";
// import useEmailLinkVerification from "@/hooks/useEmailLinkVerification";

// import { logoutUser, signUpUser } from "../../store/slices/userSlice";
// import PasswordToggle from "../toggle/PasswordToggle";
// import PhoneForm from "./PhoneForm";

// import {
//   // getEmailError,
//   getEmailValidationMessage,
//   getConfirmPwdMessage,
//   handlePasswordFieldChange,
//   handleConfirmPasswordFieldChange,
//   handleNameFieldChange,
//   handleBirthFieldChange,
//   isValidEmail,
//   validateSignUpFields,
// } from "@/hooks/useAuthValidation";

// import { addAddress } from "@/store/slices/addressesSlice";
// import AddressEditRow, { AddressFormValue } from "@/components/myPage/profile/AddressEditRow";

// const JoinForm = () => {
//   const [email, setEmail] = useState("");
//   const [pwd, setPwd] = useState("");
//   const [confirmPwd, setConfirmPwd] = useState(""); // 비밀번호 확인 입력값
//   const [name, setName] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [gender, setGender] = useState("");
//   const [nationality, setNationality] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const [showPwd, setShowPwd] = useState(false);
//   const [showConfirmPwd, setShowConfirmPwd] = useState(false);
//   const [confirmPwdFocused, setConfirmPwdFocused] = useState(false);

//   const [emailVerified, setEmailVerified] = useState(false);
//   const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
//   const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
//   const [showEmptyMessage, setShowEmptyMessage] = useState(false);
//   const [isPwdMatch, setIsPwdMatch] = useState<boolean | null>(null); // 비밀번호 일치 여부

//   // ✅ 주소 초안(폼에서 저장 버튼 누르면 여기에 담김)
//   const [addressDraft, setAddressDraft] = useState<AddressFormValue | null>(null);

//   const [emailError, setEmailError] = useState<string | null>(null);
//   const [nameError, setNameError] = useState("");
//   const [birthDateError, setBirthDateError] = useState("");
//   const [genderError, setGenderError] = useState("");
//   const [nationalityError, setNationalityError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [passwordError, setPasswordError] = useState<string>("");

//   // 필드별 ref 선언
//   const emailRef = useRef<HTMLInputElement>(null);
//   const pwdRef = useRef<HTMLInputElement>(null);
//   const nameRef = useRef<HTMLInputElement>(null);
//   const birthDateRef = useRef<HTMLInputElement>(null);
//   const genderRef = useRef<HTMLDivElement>(null);
//   const nationalityRef = useRef<HTMLDivElement>(null);
//   const phoneNumberRef = useRef<HTMLInputElement>(null);
//   const submitButtonRef = useRef<HTMLButtonElement>(null);

//   const rawParams = useSearchParams();
//   const searchParams = rawParams ?? new URLSearchParams();

//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   // const { verifyCode } = usePhoneAuth(phoneNumber);

//   const confirmPwdMessage = getConfirmPwdMessage(pwd, confirmPwd, isPwdMatch, confirmPwdFocused);

//   const {
//     // email,
//     // setEmail, // 기존 setEmail 대체
//     // emailVerified,
//     // isEmailAvailable,
//     uiMessage, // 기존 confirmEmailMessage 대체 가능
//     readOnly,
//     handleEmailCheck,
//     handleEmailVerify,
//     consumeLinkFromURL,
//   } = useEmailLinkVerification({ redirectPath: "/join" });

//   useEffect(() => {
//     const url = window.location.href;
//     consumeLinkFromURL(url, searchParams); // 인증 링크 확인
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   const handleSignUp = async () => {
//     setShowEmptyMessage(true);

//     // 🔍 공통 유효성 검사
//     const { isValid, errors } = validateSignUpFields({
//       email,
//       isEmailAvailable,
//       emailVerified,
//       pwd,
//       name,
//       birthDate,
//       gender,
//       nationality,
//       phoneNumber,
//       setEmailError,
//       setPasswordError,
//       setNameError,
//       setBirthDateError,
//       setGenderError,
//       setNationalityError,
//       setPhoneError,
//       emailRef,
//       pwdRef,
//       nameRef,
//       birthDateRef,
//       genderRef,
//       nationalityRef,
//       phoneNumberRef,
//     });

//     // 🔴 유효성 오류 메시지 반영 (useState로 연결된 메시지 세팅)
//     setEmailError(errors.email || "");
//     setPasswordError(errors.password || "");
//     setNameError(errors.name || "");
//     setBirthDateError(errors.birthDate || "");
//     setGenderError(errors.gender || "");
//     setNationalityError(errors.nationality || "");
//     setPhoneError(errors.phoneNumber || "");

//     if (!isValid) return;

//     try {
//       // 🧩 Redux Thunk로 사용자 생성 및 Firestore 저장
//       await dispatch(
//         signUpUser({
//           email,
//           password: pwd,
//           name,
//           birthDate,
//           gender,
//           nationality,
//           phoneNumber,
//         })
//       ).unwrap(); // ✅ dispatch 타입이 AppDispatch면 정상 동작
//       console.log("회원가입 및 정보 저장 성공!");

//       //  주소 초안이 있다면 서브컬렉션에 추가 (기본 배송지)
//       //    auth.currentUser가 존재하는 이메일 링크 가입 흐름이라면 uid 사용 가능
//       if (addressDraft && auth.currentUser?.uid) {
//         await dispatch(
//           addAddress({
//             uid: auth.currentUser.uid,
//             value: {
//               ...addressDraft,
//               isDefault: true, // 회원가입 첫 주소 = 기본
//             },
//           })
//         ).unwrap();
//       }

//       // 🔐 이메일 인증 여부 확인 (인증 안 되었으면 중단)
//       const isVerified = await updateEmailVerified();
//       if (!isVerified || !isEmailAvailable) {
//         emailRef.current?.focus();
//         return;
//       }

//       // ✅ 인증되지 않은 경우만 중복 확인
//       if (!emailVerified) {
//         try {
//           const available = await checkEmailDuplicate(email);
//           if (!available) {
//             setEmailError("이미 가입된 이메일입니다");
//             setIsEmailAvailable(false); // ✅ 이메일 사용 불가 상태
//             setIsEmailDuplicateChecked(true);
//             emailRef.current?.focus();
//             return;
//           }
//         } catch (error) {
//           console.error("이메일 중복 확인 중 오류:", error);
//           setIsEmailAvailable(null); // 검사 실패로 리셋
//           return;
//         }
//       }

//       dispatch(logoutUser());
//       await signOut(auth);
//       router.push("/auth/login");
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.log("회원가입 오류:", error);
//       } else {
//         console.log("회원가입시 알 수 없는 오류가 발생했습니다");
//       }
//     }
//   };

//   return (
//     <form name="form" id="form" className="flex flex-col px-5">
//       <div
//         className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto
//         border border-gray-200  mt-12"
//       >
//         <h1 className="text-3xl mb-3">회원가입</h1>
//         <ul className="flex flex-row text-center px-4">
//           <div className="">
//             <li className="mb-4">
//               <div className="relative py-2 px-2 border border-gray-300 rounded">
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="아이디(이메일)"
//                   value={email}
//                   onBlur={handleEmailCheck}
//                   onChange={(e) => setEmail(e.target.value)}
//                   readOnly={emailVerified}
//                   className="w-full outline-none w-96 pl-3
//                     border-b border-transparent focus:border-[#0073e9]"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleEmailVerify}
//                   disabled={isEmailAvailable === false}
//                   className={`absolute top-1/2 right-0 transform -translate-y-1/2 text-xs p-4
//                   ${
//                     isEmailAvailable === false
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "hover:bg-gray-300 cursor-pointer"
//                   }
//                   `}
//                 >
//                   이메일 인증
//                 </button>
//               </div>

//               {/* ✅ 유효성 메시지 출력 */}
//               <div className="flex flex-col text-xs text-left">
//                 {uiMessage && (
//                   <p
//                     className={`mt-2 ml-1  ${
//                       /완료|성공|전송|인증되었습니다/.test(uiMessage)
//                         ? "text-blue-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {uiMessage}
//                   </p>
//                 )}
//               </div>
//             </li>

//             {/* 비밀번호 */}
//             <li className="mb-4">
//               <div className="relative py-2 px-2 border border-gray-300 rounded">
//                 <input
//                   ref={pwdRef}
//                   type={showPwd ? "text" : "password"}
//                   placeholder="비밀번호"
//                   value={pwd}
//                   onChange={(e) => {
//                     handlePasswordFieldChange(e.target.value, confirmPwd, setPwd, setIsPwdMatch);
//                     if (e.target.value.trim() !== "") {
//                       setPasswordError(""); // ✅ 입력 시 에러 초기화
//                     }
//                   }}
//                   className="w-full outline-none w-96 pl-3
//                   border-b border-transparent focus:border-[#0073e9] rounded-t"
//                 />
//                 <span className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
//                   <PasswordToggle visible={showPwd} onToggle={() => setShowPwd((prev) => !prev)} />
//                 </span>
//               </div>
//               <div className="flex flex-col text-xs mb-4">
//                 {passwordError && (
//                   <span className="text-red-500 ml-2 mt-2 text-left">{passwordError}</span>
//                 )}
//               </div>
//               <div className="relative py-2 px-2 border border-gray-300 rounded">
//                 <input
//                   type={showConfirmPwd ? "text" : "password"}
//                   placeholder="비밀번호 확인"
//                   value={confirmPwd}
//                   onChange={(e) =>
//                     handleConfirmPasswordFieldChange(
//                       pwd,
//                       e.target.value,
//                       setConfirmPwd,
//                       setIsPwdMatch
//                     )
//                   }
//                   className="w-full outline-none w-96 pl-3
//                 border-b border-transparent focus:border-[#0073e9] rounded-t"
//                 />
//                 <span className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
//                   <PasswordToggle
//                     visible={showConfirmPwd}
//                     onToggle={() => setShowConfirmPwd((prev) => !prev)}
//                   />
//                 </span>
//               </div>
//               <div className="flex flex-col text-xs mb-4">
//                 {/* 비밀번호 확인 에러 메시지 */}
//                 {confirmPwdMessage && (
//                   <span
//                     className={`text-xs mt-2 mx-2 text-left ${
//                       confirmPwdMessage.includes("일치")
//                         ? "text-[var(--color-blue-500)]"
//                         : "text-[var(--color-red-500)]"
//                     }`}
//                   >
//                     {confirmPwdMessage}
//                   </span>
//                 )}
//               </div>
//             </li>

//             <li>
//               <div className="py-2 px-2 border border-gray-300 rounded-t">
//                 <input
//                   ref={nameRef}
//                   type="text"
//                   placeholder="이름"
//                   value={name}
//                   onChange={(e) =>
//                     handleNameFieldChange(
//                       e.target.value,
//                       setName,
//                       setNameError,
//                       setConfirmPwdFocused
//                     )
//                   }
//                   className="w-full outline-none w-96 pl-3
//                 border-b border-transparent focus:border-[#0073e9] rounded-t"
//                 />
//                 {nameError && (
//                   <p className="text-[var(--color-red-500)] text-xs text-left ml-2 mt-1">
//                     {nameError}
//                   </p>
//                 )}
//               </div>
//             </li>

//             <li className="pb-2">
//               <div className="py-2 px-2 border border-gray-300 border-y-0">
//                 <input
//                   ref={birthDateRef}
//                   type="text"
//                   placeholder="생년월일 6자리(YYMMDD)"
//                   value={birthDate}
//                   onChange={(e) =>
//                     handleBirthFieldChange(e.target.value, setBirthDate, setBirthDateError)
//                   }
//                   className="w-full outline-none w-96 pl-3
//                 border-b border-transparent focus:border-[#0073e9]"
//                 />
//                 {birthDateError && (
//                   <p className="text-[var(--color-red-500)] text-xs text-left ml-2 mt-1">
//                     {birthDateError}
//                   </p>
//                 )}
//               </div>
//               <div className="flex border border-gray-300 rounded-b w-full p-2 text-sm">
//                 {/* 성별 */}
//                 <div className="w-1/2 mr-2" ref={genderRef}>
//                   <div className="flex ">
//                     {["남자", "여자"].map((label, idx) => (
//                       <div key={label} className="relative flex-1">
//                         <input
//                           type="radio"
//                           name="gender"
//                           onChange={(e) => {
//                             setGender(e.target.value);
//                             setGenderError("");
//                           }}
//                           value={label}
//                           id={`gender-${idx}`}
//                           className="hidden peer"
//                         />
//                         <label
//                           htmlFor={`gender-${idx}`}
//                           className={`block text-center px-4 py-2 border border-gray-300
//                             hover:border-blue-600 peer-checked:border-blue-600 cursor-pointer
//                             ${idx === 0 ? "rounded-l -mr-px" : ""}
//                             ${idx === 1 ? "rounded-r -ml-px" : ""}
//                             `}
//                         >
//                           {label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {genderError && (
//                     <span className="text-[var(--color-red-500)] mx-2 mt-2 text-xs text-left">
//                       {genderError}
//                     </span>
//                   )}
//                 </div>

//                 {/* 내·외국인 */}
//                 <div className="w-1/2 text-sm" ref={nationalityRef}>
//                   <div className="flex">
//                     {["내국인", "외국인"].map((label, idx) => (
//                       <div key={label} className="relative flex-1">
//                         <input
//                           type="radio"
//                           name="nationality"
//                           onChange={(e) => {
//                             setNationality(e.target.value);
//                             setNationalityError("");
//                           }}
//                           value={label}
//                           id={`nationality-${idx}`}
//                           className="hidden peer"
//                         />
//                         <label
//                           htmlFor={`nationality-${idx}`}
//                           className={`block text-center px-4 py-2 border border-gray-300
//                           hover:border-blue-600 peer-checked:border-blue-600 peer-checked:z-10 cursor-pointer
//                           ${idx === 0 ? "rounded-l -mr-px" : ""}
//                           ${idx === 1 ? "rounded-r -ml-px" : ""}
//                           `}
//                         >
//                           {label}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                   {nationalityError && (
//                     <span className="text-[var(--color-red-500)] text-xs left-left ml-2 mt-1">
//                       {nationalityError}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </li>

//             {/* 주소 */}
//             {/* <KakaoMap /> */}
//             <AddressEditRow
//               onSubmit={(v) => {
//                 // 폼 내부 "저장" 클릭 시 로컬 상태에 저장
//                 setAddressDraft(v);
//               }}
//               // renderMap={({ address }) => <KakaoMap address={address} />} // (선택) 지도 연결
//             />
//             {!addressDraft && (
//               <p className="text-xs text-gray-500 mt-1">
//                 회원가입 시 첫 배송지를 기본 배송지로 저장합니다.
//               </p>
//             )}
//             {addressDraft && (
//               <div className="text-xs text-green-600 mt-1">
//                 임시 저장됨: [{addressDraft.zonecode}] {addressDraft.address}{" "}
//                 {addressDraft.detailAddress}
//               </div>
//             )}

//             {/* 전화번호 */}
//             <li className="py-2">
//               <div className="">
//                 <ul className="">
//                   <PhoneForm
//                     phoneNumber={phoneNumber}
//                     setPhoneNumber={setPhoneNumber}
//                     phoneError={phoneError}
//                     setPhoneError={setPhoneError}
//                   />
//                 </ul>
//               </div>
//             </li>

//             <button
//               ref={submitButtonRef}
//               type="button"
//               id="submit-button"
//               onClick={handleSignUp}
//               className="w-full border border-blue-600 text-blue-600 hover:text-blue-800 hover:border-blue-800 p-2 mt-4 rounded"
//             >
//               가입하기
//             </button>
//           </div>
//         </ul>
//       </div>
//     </form>
//   );
// };

// export default JoinForm;
