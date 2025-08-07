// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getEmailError = (email: string): string => {
  if (email.trim() === "") return "아이디(이메일)를 입력해주세요.";
  if (!isValidEmail(email)) return "유효한 이메일 형식이 아닙니다.";
  return "";
};

export const getEmailValidationMessage = (
  email: string, // 현재 입력된 이메일
  isEmailDuplicateChecked: boolean, //이메일 중복 체크를 실행한 상태인지(true면 검사함)
  isEmailAvailable: boolean | null, // 이메일이 사용 가능한 상태인지 (true면 중복 아님)
  emailVerified: boolean, // 이메일 인증 여부 (인증 완료 시 true)
  emailTouched: boolean = false, // 사용자가 입력을 시작했는지 여부
  emailError: string | null = ""
): string | null => {
  if (emailError) return emailError;

  if (emailVerified) return "✔ 이메일 인증이 완료되었습니다.";
  if (isValidEmail(email) && !isEmailDuplicateChecked) return "이메일을 인증해주세요.";

  if (email.trim() === "") {
    if (emailTouched) return "아이디(이메일)를 입력해주세요.";
    return null;
  }

  if (!isValidEmail(email)) return "유효한 이메일 형식이 아닙니다.";

  if (isEmailDuplicateChecked && isEmailAvailable === true)
    return "사용 가능한 아이디(이메일)입니다. 이메일을 인증해주세요.";
  if (isEmailDuplicateChecked && isEmailAvailable === false)
    return "아이디(이메일)가 중복입니다. 다시 입력해주세요.";

  return emailError || "";
};

// 비밀번호 유효성 검사
export const isValidPassword = (pwd: string): boolean => {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return pwd.trim().length >= 12 && specialCharRegex.test(pwd);
};

export const getPasswordError = (pwd: string): string => {
  if (pwd.trim() === "") return "비밀번호를 입력해주세요.";
  if (pwd.trim().length < 12) return "비밀번호는 12자 이상 입력해주세요.";
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(pwd)) return "특수문자를 1개 이상 포함해주세요.";
  return "";
};

// 비밀번호 확인 유효성 검사
export const getConfirmPwdMessage = (
  pwd: string,
  confirmPwd: string,
  isPwdMatch: boolean | null,
  confirmPwdFocused: boolean
): string | null => {
  if (pwd && confirmPwd === "" && !confirmPwdFocused) {
    return "비밀번호 확인을 입력해주세요.";
  }
  if (pwd && confirmPwd && isPwdMatch === false) {
    return "비밀번호가 다릅니다.";
  }
  if (pwd && confirmPwd && isPwdMatch === true) {
    return "비밀번호가 일치합니다.";
  }
  return null;
};

// 한글 이름 유효성 검사
export const isValidKoreanName = (name: string): boolean => {
  const koreanRegex = /^[가-힣]{2,}$/; // 두 글자 이상 한글만
  return koreanRegex.test(name);
};

export const getNameError = (name: string): string => {
  const trimmed = name.trim();
  if (trimmed === "") return "이름을 입력해주세요.";
  if (!isValidKoreanName(trimmed)) return "이름은 두 글자 이상 한글만 입력해주세요.";
  return "";
};

// 생년월일 유효성 검사 (숫자 6자리)
export const isValidBirthDate = (birth: string): boolean => {
  const regex = /^\d{6}$/;
  return regex.test(birth);
};

export const getBirthDateError = (birth: string): string => {
  if (birth.trim() === "") return "생년월일을 입력해주세요.";
  if (!isValidBirthDate(birth)) return "생년월일은 숫자 6자리(YYMMDD)로 입력해주세요.";
  return "";
};

// 전화번호 유효성 검사
export const getPhoneError = (phoneNumber: string): string => {
  const cleanedPhone = phoneNumber.replace(/\D/g, "");
  if (cleanedPhone === "") return "전화번호를 입력해주세요.";
  if (!cleanedPhone || cleanedPhone.length <= 10) {
    return "전화번호는 숫자 11자 이상 입력해주세요.";
  }
  return "";
};

// 전화번호 포맷팅
export const formatPhoneNumber = (input: string): string => {
  const onlyNumbers = input.replace(/\D/g, "");
  if (onlyNumbers.length <= 3) return onlyNumbers;
  if (onlyNumbers.length <= 7) return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
};

// 이메일 변경 핸들러
export const handleEmailFieldChange = (
  value: string,
  setEmail: (v: string) => void,
  setIsEmailChecked: (v: boolean) => void,
  setIsEmailAvailable: (v: boolean | null) => void,
  setEmailError: (v: string) => void
) => {
  setEmail(value);
  setIsEmailChecked(false);
  setIsEmailAvailable(null);
  setEmailError(getEmailError(value));
};

// 비밀번호 변경 핸들러
export const handlePasswordFieldChange = (
  pwd: string,
  confirmPwd: string,
  setPwd: (v: string) => void,
  setIsPwdMatch: (v: boolean | null) => void
) => {
  setPwd(pwd);
  if (confirmPwd) {
    setIsPwdMatch(pwd === confirmPwd);
  } else {
    setIsPwdMatch(null);
  }
};

// 비밀번호 확인 변경 핸들러
export const handleConfirmPasswordFieldChange = (
  pwd: string,
  value: string,
  setConfirmPwd: (v: string) => void,
  setIsPwdMatch: (v: boolean | null) => void
) => {
  setConfirmPwd(value);
  if (pwd) {
    setIsPwdMatch(pwd === value);
  } else {
    setIsPwdMatch(null);
  }
};

// 이름 변경 핸들러
export const handleNameFieldChange = (
  value: string,
  setName: (v: string) => void,
  setNameError: (v: string) => void,
  setConfirmPwdFocused?: (v: boolean) => void
) => {
  if (setConfirmPwdFocused) setConfirmPwdFocused(false);
  setName(value);
  setNameError(getNameError(value));
};

// 생일 변경 핸들러
export const handleBirthFieldChange = (
  raw: string,
  setBirth: (v: string) => void,
  setBirthError: (v: string) => void
) => {
  const value = raw.replace(/\D/g, "").slice(0, 6);
  setBirth(value);
  setBirthError(getBirthDateError(value));
};

// ✅ 전체 회원가입 유효성 검사 함수
interface SignUpFields {
  email: string;
  isEmailAvailable: boolean | null;
  emailVerified: boolean;
  pwd: string;
  name: string;
  birthDate: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  setEmailError: (msg: string) => void;
  setPasswordError: (msg: string) => void;
  setNameError: (msg: string) => void;
  setBirthDateError: (msg: string) => void;
  setGenderError: (msg: string) => void;
  setNationalityError: (msg: string) => void;
  setPhoneError: (msg: string) => void;
  emailRef: React.RefObject<HTMLInputElement | null>;
  pwdRef: React.RefObject<HTMLInputElement | null>;
  nameRef: React.RefObject<HTMLInputElement | null>;
  birthDateRef: React.RefObject<HTMLInputElement | null>;
  genderRef: React.RefObject<HTMLDivElement | null>;
  nationalityRef: React.RefObject<HTMLDivElement | null>;
  phoneNumberRef: React.RefObject<HTMLInputElement | null>;
}

interface SignUpValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
    name?: string;
    birthDate?: string;
    gender?: string;
    nationality?: string;
    phoneNumber?: string;
  };
}

export const validateSignUpFields = ({
  email,
  pwd,
  name,
  birthDate,
  gender,
  nationality,
  phoneNumber,
  setEmailError,
  emailRef,
}: SignUpFields): SignUpValidationResult => {
  const errors: SignUpValidationResult["errors"] = {};

  // 1️⃣ 이메일 유효성 검사
  if (!email.trim()) {
    setEmailError("이메일을 입력해주세요.");
    emailRef.current?.focus();
  }

  if (!email) errors.password = "아이디(이메일)를 입력해주세요.";
  if (!pwd) errors.password = "비밀번호를 입력해주세요.";

  if (!name) errors.name = "이름을 입력해주세요.";
  if (!birthDate || !isValidBirthDate(birthDate)) {
    errors.birthDate = "생년월일은 숫자 6자리(YYMMDD)로 입력해주세요.";
  }
  if (!gender) errors.gender = "성별을 선택해주세요.";
  if (!nationality) errors.nationality = "내/외국적을 선택해주세요.";
  if (!phoneNumber) errors.phoneNumber = "전화번호를 입력해주세요.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
