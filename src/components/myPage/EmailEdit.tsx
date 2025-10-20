// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

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
// import { checkEmailDuplicate } from "@/firebases/checkEmailDuplicate";
// import sendEmailVerificationLink from "@/firebases/sendEmailVerificationLink";

// const EmailEdit = ({ user }: { user: { email: string } }) => {
//   const [editing, setEditing] = useState(false);
//   const [newEmail, setNewEmail] = useState("");

//   const [email, setEmail] = useState("");
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
//   const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
//   const [emailError, setEmailError] = useState<string | null>(null);

//   const rawParams = useSearchParams();
//   const searchParams = rawParams ?? new URLSearchParams();

//   const handleEditClick = () => {
//     setEditing(true);
//     setNewEmail("");
//   };

//   const handleCancelClick = () => {
//     setEditing(false);
//     setNewEmail("");
//   };

//   // 이메일 중복 체크
//   const handleEmailCheck = async () => {
//     if (!email.trim() || !isValidEmail(email)) {
//       setIsEmailDuplicateChecked(false);
//       setIsEmailAvailable(null);
//       setEmailError(getEmailValidationMessage(email, false, null, emailVerified, false, ""));
//       return;
//     }

//     const isDuplicate = await checkEmailDuplicate(email);
//     const available = !isDuplicate;

//     setIsEmailDuplicateChecked(true);
//     setIsEmailAvailable(available);
//     setEmailError(
//       getEmailValidationMessage(email, true, available, emailVerified, false, "")
//     );
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (isValidEmail(email)) {
//         handleEmailCheck();
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [email]);

//   // 이메일 인증 버튼 클릭시 실행
//   const handleEmailVerify = async () => {
//     if (!email.trim() || !isValidEmail(email)) {
//       setIsEmailDuplicateChecked(false);
//       setIsEmailAvailable(null);
//       return;
//     }

//     try {
//       const { success } = await sendEmailVerificationLink(email);
//       if (success) {
//         setIsEmailDuplicateChecked(true);
//         setEmailError("이메일로 인증 링크를 전송했습니다. 메일함을 확인해주세요.");
//         window.localStorage.setItem("emailForVerification", email);
//       } else {
//         setIsEmailDuplicateChecked(false);
//         setEmailError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
//       }
//     } catch (error) {
//       console.error("이메일 인증 오류:", error);
//       setIsEmailDuplicateChecked(false);
//       setEmailError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   // 1. 인증 링크 클릭 후 돌아왔을 때 처리
//   useEffect(() => {
//     const verifyEmailLink = async () => {
//       const storedEmail = localStorage.getItem("emailForVerification");
//       const url = window.location.href;
//       const queryEmail = searchParams?.get("email");
//       const finalEmail = queryEmail || storedEmail;

//       if (!finalEmail) return;

//       if (isSignInWithEmailLink(auth, url)) {
//         try {
//           await signInWithEmailLink(auth, finalEmail, url);
//           setEmail(finalEmail);
//           setEmailVerified(true);
//           setIsEmailAvailable(true);
//           localStorage.removeItem("emailForVerification");
//           console.log("✅ 이메일 인증 성공 및 로그인 완료");
//         } catch (error) {
//           console.error("❌ 링크 인증 실패:", error);
//         }
//       }
//     };

//     verifyEmailLink();
//   }, [searchParams]);

//     try {
//       const { success } = await sendEmailVerificationLink(email);
//       if (success) {
//         setIsEmailDuplicateChecked(true);
//         setEmailError("이메일로 인증 링크를 전송했습니다. 메일함을 확인해주세요.");
//         window.localStorage.setItem("emailForVerification", email);
//       } else {
//         setIsEmailDuplicateChecked(false);
//         setEmailError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
//       }
//     } catch (error) {
//       console.error("이메일 인증 오류:", error);
//       setIsEmailDuplicateChecked(false);
//       setEmailError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
//     }
//   };

//   return (
//     <td className="p-2 m-4 align-middle">
//       {editing ? (
//         <input
//           type="email"
//           className="p-2 border border-gray-300 rounded w-[200px]"
//           placeholder={user.email} // ✅ 기존 이메일 표시
//           value={newEmail}
//           onChange={(e) => setNewEmail(e.target.value)}
//         />
//       ) : (
//         <span className="inline-block px-4 py-2">{user.email}</span>
//       )}

//       {/* 버튼 영역 */}
//       {!editing ? (
//         <Link
//           href="#"
//           onClick={(e) => {
//             e.preventDefault();
//             handleEditClick();
//           }}
//           className="m-2 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
//         >
//           이메일 변경
//         </Link>
//       ) : (
//         <>
//           <Link
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               handleSendLink();
//             }}
//             className="m-2 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
//           >
//             이메일링크 보내기
//           </Link>
//           <Link
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               handleCancelClick();
//             }}
//             className="m-2 p-2 text-sm border border-gray-300 hover:border-peach-300 hover:text-gray-800 rounded"
//           >
//             취소
//           </Link>
//         </>
//       )}
//     </td>
//   );
// };

// export default EmailEdit;
