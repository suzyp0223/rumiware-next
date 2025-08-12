/* eslint-disable @typescript-eslint/no-unused-vars */
// 전체 회원가입 UI
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  isSignInWithEmailLink,
  linkWithCredential,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";

import { auth } from "@/firebases/firebase";
import { checkEmailDuplicate } from "@/firebases/checkEmailDuplicate";
import sendEmailVerificationLink from "@/firebases/sendEmailVerificationLink";

import { useAppDispatch } from "@/hooks/hooks";
import updateEmailVerified from "@/hooks/updateEmailVerified";

import { logoutUser, signUpUser } from "../../store/slices/userSlice";
import PasswordToggle from "../toggle/PasswordToggle";
import PhoneForm from "./PhoneForm";

import {
  // getEmailError,
  getEmailValidationMessage,
  getConfirmPwdMessage,
  handlePasswordFieldChange,
  handleConfirmPasswordFieldChange,
  handleNameFieldChange,
  handleBirthFieldChange,
  isValidEmail,
  validateSignUpFields,
} from "@/hooks/useAuthValidation";

const JoinForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState(""); // 비밀번호 확인 입력값
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [confirmPwdFocused, setConfirmPwdFocused] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [isPwdMatch, setIsPwdMatch] = useState<boolean | null>(null); // 비밀번호 일치 여부

  const [isPhoneDuplicateChecked, setIsPhoneDuplicateChecked] = useState(false);
  const [isPhoneAvailable, setIsPhoneAvailable] = useState<boolean | null>(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [nationalityError, setNationalityError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");

  // 필드별 ref 선언
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const nationalityRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const rawParams = useSearchParams();
  const searchParams = rawParams ?? new URLSearchParams();

  const dispatch = useAppDispatch();
  const router = useRouter();
  // const { verifyCode } = usePhoneAuth(phoneNumber);

  const confirmPwdMessage = getConfirmPwdMessage(pwd, confirmPwd, isPwdMatch, confirmPwdFocused);
  const confirmEmailMessage = getEmailValidationMessage(
    email,
    isEmailDuplicateChecked,
    isEmailAvailable,
    emailVerified,
    showEmptyMessage || emailTouched,

    emailError ?? "" // 널 병합 연산자
    //emailError가 null 또는 undefined이면, ""(빈 문자열)을 사용하고,
    // 그렇지 않으면 emailError를 그대로 사용한다.
  );

  // 이메일 중복 체크
  const handleEmailCheck = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setIsEmailDuplicateChecked(false);
      setIsEmailAvailable(null);
      setEmailError(getEmailValidationMessage(email, false, null, emailVerified, emailTouched, ""));
      return;
    }

    const isDuplicate = await checkEmailDuplicate(email);
    const available = !isDuplicate;

    setIsEmailDuplicateChecked(true);
    setIsEmailAvailable(available);
    setEmailError(
      getEmailValidationMessage(email, true, available, emailVerified, emailTouched, "")
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValidEmail(email)) {
        handleEmailCheck();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [email]);

  // 이메일 인증 버튼 클릭시 실행
  const handleEmailVerify = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setIsEmailDuplicateChecked(false);
      setIsEmailAvailable(null);
      return;
    }

    try {
      const { success } = await sendEmailVerificationLink(email, "/join");
      if (success) {
        setIsEmailDuplicateChecked(true);
        setEmailError("이메일로 인증 링크를 전송했습니다. 메일함을 확인해주세요.");
        window.localStorage.setItem("emailForVerification", email);
      } else {
        setIsEmailDuplicateChecked(false);
        setEmailError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      setIsEmailDuplicateChecked(false);
      setEmailError("이메일 인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 1. 인증 링크 클릭 후 돌아왔을 때 처리
  useEffect(() => {
    const verifyEmailLink = async () => {
      const storedEmail = localStorage.getItem("emailForVerification");
      const url = window.location.href;
      const queryEmail = searchParams?.get("email");
      const finalEmail = queryEmail || storedEmail;

      if (!finalEmail) return;

      if (isSignInWithEmailLink(auth, url)) {
        try {
          await signInWithEmailLink(auth, finalEmail, url);
          setEmail(finalEmail);
          setEmailVerified(true);
          setIsEmailAvailable(true);
          localStorage.removeItem("emailForVerification");
          console.log("✅ 이메일 인증 성공 및 로그인 완료");
        } catch (error) {
          console.error("❌ 링크 인증 실패:", error);
        }
      }
    };

    verifyEmailLink();
  }, [searchParams]);

  const handleSignUp = async () => {
    setShowEmptyMessage(true);

    // 🔍 공통 유효성 검사
    const { isValid, errors } = validateSignUpFields({
      email,
      isEmailAvailable,
      emailVerified,
      pwd,
      name,
      birthDate,
      gender,
      nationality,
      phoneNumber,
      setEmailError,
      setPasswordError,
      setNameError,
      setBirthDateError,
      setGenderError,
      setNationalityError,
      setPhoneError,
      emailRef,
      pwdRef,
      nameRef,
      birthDateRef,
      genderRef,
      nationalityRef,
      phoneNumberRef,
    });

    // 🔴 유효성 오류 메시지 반영 (useState로 연결된 메시지 세팅)
    setEmailError(errors.email || "");
    setPasswordError(errors.password || "");
    setNameError(errors.name || "");
    setBirthDateError(errors.birthDate || "");
    setGenderError(errors.gender || "");
    setNationalityError(errors.nationality || "");
    setPhoneError(errors.phoneNumber || "");

    if (!isValid) return;

    try {
      // 🧩 Redux Thunk로 사용자 생성 및 Firestore 저장
      await dispatch(
        signUpUser({
          email,
          password: pwd,
          name,
          birthDate,
          gender,
          nationality,
          phoneNumber,
        })
      ).unwrap(); // ✅ dispatch 타입이 AppDispatch면 정상 동작

      console.log("회원가입 및 정보 저장 성공!");

      // 🔐 이메일 인증 여부 확인 (인증 안 되었으면 중단)
      const isVerified = await updateEmailVerified();
      if (!isVerified || !isEmailAvailable) {
        emailRef.current?.focus();
        return;
      }

      // ✅ 인증되지 않은 경우만 중복 확인
      if (!emailVerified) {
        try {
          const available = await checkEmailDuplicate(email);
          if (!available) {
            setEmailError("이미 가입된 이메일입니다");
            setIsEmailAvailable(false); // ✅ 이메일 사용 불가 상태
            setIsEmailDuplicateChecked(true);
            emailRef.current?.focus();
            return;
          }
        } catch (error) {
          console.error("이메일 중복 확인 중 오류:", error);
          setIsEmailAvailable(null); // 검사 실패로 리셋
          return;
        }
      }

      dispatch(logoutUser());
      await signOut(auth);
      router.push("/auth/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("회원가입 오류:", error);
      } else {
        console.log("회원가입시 알 수 없는 오류가 발생했습니다");
      }
    }
  };

  return (
    <form name="form" id="form" className="flex flex-col px-5">
      <div
        className="flex flex-col items-center justify-center text-lg gap-4 py-5 w-fit mx-auto
        border border-gray-200  mt-12"
      >
        <h1 className="text-3xl mb-3">회원가입</h1>
        <ul className="flex flex-row text-center px-4">
          <div className="">
            <li className="mb-4">
              <div className="relative py-2 px-2 border border-gray-300 rounded">
                <input
                  type="email"
                  id="email"
                  placeholder="아이디(이메일)"
                  value={email}
                  onBlur={handleEmailCheck}
                  onChange={(e) => {
                    const newEmail = e.target.value;

                    setEmail(newEmail);
                    setEmailTouched(true); // 🔸 입력하면 touched됨
                    setIsEmailDuplicateChecked(false);
                    setIsEmailAvailable(null);
                    setEmailVerified(false);

                    // 인증된 이메일이 입력되면 다시 입력 가능하도록 제어
                    if (emailVerified) setEmailVerified(false);
                  }}
                  readOnly={emailVerified}
                  className="outline-none w-96 pl-3
                    border-b border-transparent focus:border-[#0073e9]"
                />
                <button
                  type="button"
                  onClick={handleEmailVerify}
                  disabled={isEmailAvailable === false}
                  className={`absolute top-1/2 right-0 transform -translate-y-1/2 text-xs p-4
                  ${
                    isEmailAvailable === false
                      ? "bg-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-300 cursor-pointer"
                  }
                  `}
                >
                  이메일 인증
                </button>
              </div>

              {/* ✅ 유효성 메시지 출력 */}
              <div className="flex flex-col text-xs text-left">
                {confirmEmailMessage && (
                  <p
                    className={`mt-2 ml-1  ${
                      /완료|성공|전송|인증되었습니다/.test(confirmEmailMessage)
                        ? "text-blue-500"
                        : "text-red-500"
                    }`}
                  >
                    {confirmEmailMessage}
                  </p>
                )}
              </div>
            </li>

            {/* 비밀번호 */}
            <li className="mb-4">
              <div className="relative py-2 px-2 border border-gray-300 rounded">
                <input
                  ref={pwdRef}
                  type={showPwd ? "text" : "password"}
                  placeholder="비밀번호"
                  value={pwd}
                  onChange={(e) => {
                    handlePasswordFieldChange(e.target.value, confirmPwd, setPwd, setIsPwdMatch);
                    if (e.target.value.trim() !== "") {
                      setPasswordError(""); // ✅ 입력 시 에러 초기화
                    }
                  }}
                  className="outline-none w-96 pl-3
                  border-b border-transparent focus:border-[#0073e9] rounded-t"
                />
                <span className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
                  <PasswordToggle visible={showPwd} onToggle={() => setShowPwd((prev) => !prev)} />
                </span>
              </div>
              <div className="flex flex-col text-xs mb-4">
                {passwordError && (
                  <span className="text-red-500 ml-2 mt-2 text-left">{passwordError}</span>
                )}
              </div>
              <div className="relative py-2 px-2 border border-gray-300 rounded">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="비밀번호 확인"
                  value={confirmPwd}
                  onChange={(e) =>
                    handleConfirmPasswordFieldChange(
                      pwd,
                      e.target.value,
                      setConfirmPwd,
                      setIsPwdMatch
                    )
                  }
                  className="outline-none w-96 pl-3
                border-b border-transparent focus:border-[#0073e9] rounded-t"
                />
                <span className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
                  <PasswordToggle
                    visible={showConfirmPwd}
                    onToggle={() => setShowConfirmPwd((prev) => !prev)}
                  />
                </span>
              </div>
              <div className="flex flex-col text-xs mb-4">
                {/* 비밀번호 확인 에러 메시지 */}
                {confirmPwdMessage && (
                  <span
                    className={`text-xs mt-2 mx-2 text-left ${
                      confirmPwdMessage.includes("일치")
                        ? "text-[var(--color-blue-500)]"
                        : "text-[var(--color-red-500)]"
                    }`}
                  >
                    {confirmPwdMessage}
                  </span>
                )}
              </div>
            </li>

            <li>
              <div className="py-2 px-2 border border-gray-300 rounded-t">
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) =>
                    handleNameFieldChange(
                      e.target.value,
                      setName,
                      setNameError,
                      setConfirmPwdFocused
                    )
                  }
                  className="outline-none w-96 pl-3
                border-b border-transparent focus:border-[#0073e9] rounded-t"
                />
                {nameError && (
                  <p className="text-[var(--color-red-500)] text-xs text-left ml-2 mt-1">
                    {nameError}
                  </p>
                )}
              </div>
            </li>

            <li className="pb-2">
              <div className="py-2 px-2 border border-gray-300 border-y-0">
                <input
                  ref={birthDateRef}
                  type="text"
                  placeholder="생년월일 6자리(YYMMDD)"
                  value={birthDate}
                  onChange={(e) =>
                    handleBirthFieldChange(e.target.value, setBirthDate, setBirthDateError)
                  }
                  className="outline-none w-96 pl-3
                border-b border-transparent focus:border-[#0073e9]"
                />
                {birthDateError && (
                  <p className="text-[var(--color-red-500)] text-xs text-left ml-2 mt-1">
                    {birthDateError}
                  </p>
                )}
              </div>
              <div className="flex border border-gray-300 rounded-b w-full p-2 text-sm">
                {/* 성별 */}
                <div className="w-1/2 mr-2" ref={genderRef}>
                  <div className="flex ">
                    {["남자", "여자"].map((label, idx) => (
                      <div key={label} className="relative flex-1">
                        <input
                          type="radio"
                          name="gender"
                          onChange={(e) => {
                            setGender(e.target.value);
                            setGenderError("");
                          }}
                          value={label}
                          id={`gender-${idx}`}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={`gender-${idx}`}
                          className={`block text-center px-4 py-2 border border-gray-300
                            hover:border-blue-600 peer-checked:border-blue-600 cursor-pointer
                            ${idx === 0 ? "rounded-l -mr-px" : ""}
                            ${idx === 1 ? "rounded-r -ml-px" : ""}
                            `}
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {genderError && (
                    <span className="text-[var(--color-red-500)] mx-2 mt-2 text-xs text-left">
                      {genderError}
                    </span>
                  )}
                </div>

                {/* 내·외국인 */}
                <div className="w-1/2 text-sm" ref={nationalityRef}>
                  <div className="flex">
                    {["내국인", "외국인"].map((label, idx) => (
                      <div key={label} className="relative flex-1">
                        <input
                          type="radio"
                          name="nationality"
                          onChange={(e) => {
                            setNationality(e.target.value);
                            setNationalityError("");
                          }}
                          value={label}
                          id={`nationality-${idx}`}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={`nationality-${idx}`}
                          className={`block text-center px-4 py-2 border border-gray-300
                          hover:border-blue-600 peer-checked:border-blue-600 peer-checked:z-10 cursor-pointer
                          ${idx === 0 ? "rounded-l -mr-px" : ""}
                          ${idx === 1 ? "rounded-r -ml-px" : ""}
                          `}
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {nationalityError && (
                    <span className="text-[var(--color-red-500)] text-xs left-left ml-2 mt-1">
                      {nationalityError}
                    </span>
                  )}
                </div>
              </div>
            </li>

            <li className="py-2">
              <div className="">
                <ul className="text-s">
                  <PhoneForm
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                  />
                  {/* <CarrierChoice
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    setVerified={setIsPhoneVerified}
                    setVerifiedCode={setIsVerifiedCode}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    submitButtonRef={submitButtonRef}
                  /> */}
                </ul>
              </div>
            </li>

            <button
              ref={submitButtonRef}
              type="button"
              id="submit-button"
              onClick={handleSignUp}
              className="w-full border border-blue-600 text-blue-600 hover:text-blue-800 hover:border-blue-800 p-2 mt-4 rounded"
            >
              가입하기
            </button>
          </div>
        </ul>
      </div>
    </form>
  );
};

export default JoinForm;
function verifyCode() {
  throw new Error("Function not implemented.");
}
