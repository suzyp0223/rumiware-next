/* eslint-disable @typescript-eslint/no-unused-vars */
// 전체 회원가입 UI
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { linkWithCredential } from "firebase/auth";

import { useAppDispatch } from "@/hooks/hooks";
import usePhoneAuth from "@/hooks/usePhoneAuth";
import { auth } from "@/firebases/firebase";
import { checkEmailDuplicate } from "@/firebases/checkEmailDuplicate";

import { signUpUser } from "../../store/slices/userSlice";
import PasswordToggle from "../toggle/PasswordToggle";
import CarrierChoice from "./CarrierChoice";

import {
  isValidEmail,
  getEmailError,
  getEmailValidationMessage,
  isValidPassword,
  getPasswordError,
  getConfirmPwdMessage,
  isValidKoreanName,
  getNameError,
  isValidBirthDate,
  getBirthDateError,
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
  const [confirmPwdError, setConfirmPwdError] = useState("");
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
  const confirmPwdRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);
  const nationalityRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const emailValidationMessage = getEmailValidationMessage(
    email,
    emailError,
    isEmailChecked,
    isEmailAvailable
  );

  const { verifyCode } = usePhoneAuth(phoneNumber);
  const confirmPwdMessage = getConfirmPwdMessage(pwd, confirmPwd, isPwdMatch, confirmPwdFocused);

  const handleSignUp = async () => {
    let isValid = true;

    if (!isEmailChecked || !isEmailAvailable) {
      setEmailError("이메일 중복 확인을 완료해주세요.");
      emailRef.current?.focus();
      isValid = false;
      return;
    } else setEmailError("");

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(getEmailError(value));

    // 중복확인 상태 초기화
    setIsEmailChecked(false);
    setIsEmailAvailable(null);
  };
  const handleEmailBlur = () => {
    setEmailError(getEmailError(email));
  };

  const handleEmailCheck = async () => {
    const error = getEmailError(email);
    if (error) {
      setEmailError(error); // ❗️ UI에 오류 메시지 출력
      return;
    }

    const available = await checkEmailDuplicate(email);
    setIsEmailAvailable(available);
    setIsEmailChecked(true);

    if (available && isValidEmail(email)) {
      pwdRef.current?.focus();
    }
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);

    // confirmPwd가 있다면 비밀번호 일치 여부 다시 판단
    if (confirmPwd) {
      setIsPwdMatch(value === confirmPwd);
    } else {
      setIsPwdMatch(null);
    }
  };
  const handlePwdBlur = () => {
    setPasswordError(getPasswordError(pwd));
  };

  const handleConfirmPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPwd(value);

    // 즉시 일치 여부 판단
    if (pwd) {
      setIsPwdMatch(pwd === value);
    } else {
      setIsPwdMatch(null);
    }
  };
  const handleConfirmPwdBlur = () => {
    setConfirmPwdFocused(false);
  };
  const handleConfirmPwdFocus = () => {
    setConfirmPwdFocused(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPwdFocused(false);
    const value = e.target.value;
    setName(value);
    setNameError(getNameError(value)); // 실시간 유효성 검사
  };

  const handleBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // 숫자만, 최대 6자리
    setBirthDate(value);
    setBirthDateError(getBirthDateError(value)); // 실시간 에러 업데이트
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
                  type="text"
                  placeholder="아이디(이메일)"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className="outline-none w-96 pl-3
                    border-b border-transparent focus:border-[#0073e9] rounded-t"
                />
                <button
                  type="button"
                  onClick={handleEmailCheck}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs hover:bg-gray-300 p-4"
                >
                  아이디(이메일) 중복 확인
                </button>
              </div>

              <div className="flex flex-col text-xs">
                {emailValidationMessage && (
                  <span
                    className={`text-xs ml-2 mt-2 text-left ${
                      emailValidationMessage.includes("중복") ||
                      emailValidationMessage.includes("유효한")
                        ? "text-red-500"
                        : "text-[var(--color-blue-500)]"
                    }`}
                  >
                    {emailValidationMessage}
                  </span>
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
                  // onChange={(e) => setPwd(e.target.value)}
                  onChange={handlePwdChange}
                  onBlur={handlePwdBlur}
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
                  onChange={handleConfirmPwdChange}
                  onFocus={() => setConfirmPwdFocused(true)}
                  onBlur={() => setConfirmPwdFocused(false)}
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
                  onChange={handleNameChange}
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
                  onChange={handleBirthChange}
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
                  <CarrierChoice
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    setVerified={setIsPhoneVerified}
                    setVerifiedCode={setIsVerifiedCode}
                    phoneError={phoneError}
                    setPhoneError={setPhoneError}
                    submitButtonRef={submitButtonRef}
                  />
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
