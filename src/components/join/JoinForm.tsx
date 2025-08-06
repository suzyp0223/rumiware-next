/* eslint-disable @typescript-eslint/no-unused-vars */
// 전체 회원가입 UI
"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { linkWithCredential } from "firebase/auth";

import { useAppDispatch } from "@/hooks/hooks";
import usePhoneAuth from "@/hooks/usePhoneAuth";
import { auth } from "@/firebases/firebase";
import { checkEmailDuplicate } from "@/firebases/checkEmailDuplicate";
import sendEmailVerificationLink from "@/firebases/sendEmailVerificationLink";
import updateEmailVerified from "@/hooks/updateEmailVerified";
import useEmailVerificationRedirect from "@/hooks/useEmailVerificationRedirect";

import { signUpUser } from "../../store/slices/userSlice";
import PasswordToggle from "../toggle/PasswordToggle";
// import CarrierChoice from "./CarrierChoice";
import PhoneForm from "./PhoneForm";

import {
  getEmailError,
  getEmailValidationMessage,
  getConfirmPwdMessage,
  handleEmailFieldChange,
  handlePasswordFieldChange,
  handleConfirmPasswordFieldChange,
  handleNameFieldChange,
  handleBirthFieldChange,
  isValidBirthDate,
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

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [isPwdMatch, setIsPwdMatch] = useState<boolean | null>(null); // 비밀번호 일치 여부
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerifiedCode, setIsVerifiedCode] = useState(false);

  const [nameError, setNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [nationalityError, setNationalityError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  // 필드별 ref 선언
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const nationalityRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { verifyCode } = usePhoneAuth(phoneNumber);

  const confirmPwdMessage = getConfirmPwdMessage(pwd, confirmPwd, isPwdMatch, confirmPwdFocused);

  // 이메일 인증 후 돌아왔을 때 처리
  useEmailVerificationRedirect({
    setEmail,
    setIsEmailChecked,
    setEmailError,
  });

  // 이메일 인증 버튼 클릭시 실행
  const handleEmailVerify = async () => {
    const error = getEmailError(email);

    if (error) {
      setEmailError(error); // ❗️ UI에 오류 메시지 출력
      setIsEmailChecked(false);
      return;
    }

    try {
      const { success } = await sendEmailVerificationLink(email);
      if (success) {
        setEmailError("이메일로 인증 링크를 전송했습니다. 메일함을 확인해주세요.");
        setIsEmailChecked(true);
        window.localStorage.setItem("emailForSignIn", email);
      } else {
        setEmailError("이메일 전송 실패. 다시 시도해 주세요");
        setIsEmailChecked(false);
      }
    } catch (error) {
      console.error("이메일 인증오류:", console.error());
      setEmailError("이메일 인증 시 알 수 없는 오류가 발생했습니다.");
      setIsEmailChecked(false);
    }
  };

  const handleSignUp = async () => {
    let isValid = true;

    const isVerified = await updateEmailVerified();
    if (!isVerified || !isEmailAvailable) {
      setEmailError("이메일 인증을 완료해주세요.");
      emailRef.current?.focus();
      isValid = false;
      return;
    }
    try {
      const available = await checkEmailDuplicate(email);
      if (!available) {
        setEmailError("이미 가입된 이메일입니다");
        setIsEmailAvailable(false); // ✅ 이메일 사용 불가 상태
        setIsEmailChecked(true);
        isValid = false;
        return;
      } else {
        setIsEmailAvailable(true); // ✅ 이메일 사용 가능 상태
      }
    } catch (error) {
      console.error("이메일 중복 확인 중 오류:", error);
      setEmailError("서버 오류로 이메일 확인 실패");
      isValid = false;
      return;
    }

    if (!pwd) {
      setPasswordError("비밀번호를 입력해주세요.");
      pwdRef.current?.focus();
      isValid = false;
      return;
    } else setPasswordError("");

    if (!name) {
      setNameError("이름을 입력해주세요.");
      nameRef.current?.focus();
      isValid = false;
      return;
    } else setNameError("");

    if (!birthDate && !isValidBirthDate(birthDate)) {
      setBirthDateError("생년월일은 숫자 6자리(YYMMDD)로 입력해주세요.");
      birthDateRef.current?.focus();
      isValid = false;
      return;
    } else setBirthDateError("");

    if (!gender) {
      setGenderError("성별을 선택해주세요.");
      genderRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      isValid = false;
      return;
    } else setGenderError("");

    if (!nationality) {
      setNationalityError("내/외국적을 선택해주세요.");
      nationalityRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      isValid = false;
      return;
    } else setNationalityError("");

    if (!isValid) return;

    if (!isPhoneVerified) {
      setPhoneError("휴대폰 인증을 완료해주세요.");
      document.getElementById("phone-input")?.focus(); // ✅ 인증 인풋으로 포커스
      return;
    }

    if (!isVerifiedCode) {
      setPhoneError("인증번호 6자리를 입력해주세요.");
      document.getElementById("phone-code")?.focus();
      return;
    }

    try {
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
      ).unwrap(); // 에러 핸들링 위해 unwrap() 사용 가능

      // 🔐 전화번호 인증 credential 가져오기
      const credential = await verifyCode(); // usePhoneAuth에서 반환
      if (credential && auth.currentUser) {
        await linkWithCredential(auth.currentUser, credential);
        console.log("✅ 전화번호 연결 완료");
      }

      console.log("회원가입 및 정보 저장 성공!");
      router.push("/");
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
              <div className="relative py-2 px-2 border border-gray-300 rounded-t">
                <input
                  type="email"
                  placeholder="아이디(이메일)"
                  value={email}
                  onChange={(e) =>
                    handleEmailFieldChange(
                      e.target.value,
                      setEmail,
                      setIsEmailChecked,
                      setIsEmailAvailable,
                      setEmailError
                    )
                  }
                  className="outline-none w-96 pl-3
                    border-b border-transparent focus:border-[#0073e9] rounded-t"
                />
                <button
                  type="button"
                  onClick={handleEmailVerify}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-4"
                >
                  이메일 인증
                </button>
              </div>

              {/* ✅ 유효성 메시지 출력 */}
              <div className="flex flex-col text-xs text-left">
                {getEmailValidationMessage(email, emailError, isEmailChecked, isEmailAvailable) && (
                  <p
                    className={`text-sm mt-1 ml-1 ${
                      isEmailAvailable === false || emailError ? "text-red-500" : "text-green-700"
                    }`}
                  >
                    {getEmailValidationMessage(email, emailError, isEmailChecked, isEmailAvailable)}
                  </p>
                )}
              </div>
            </li>

            {/* 비밀번호 */}
            <li className="mb-4">
              <div className="relative py-2 px-2 border border-gray-300 ">
                <input
                  ref={pwdRef}
                  type={showPwd ? "text" : "password"}
                  placeholder="비밀번호"
                  value={pwd}
                  onChange={(e) =>
                    handlePasswordFieldChange(e.target.value, confirmPwd, setPwd, setIsPwdMatch)
                  }
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
              <div className="relative py-2 px-2 border border-gray-300 rounded-b">
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
                  {/* {phoneError && (
                    <p className="text-[var(--color-red-500)] text-xs text-left ml-2 mt-1">
                      {phoneError}
                    </p>
                  )} */}
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
