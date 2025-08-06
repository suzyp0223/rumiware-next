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
  email: string,
  emailError: string,
  isEmailChecked: boolean,
  isEmailAvailable: boolean | null
): string | null => {
  if (emailError) return emailError;
  if (isValidEmail(email) && !isEmailChecked) {
    return "이메일 인증을 완료해주세요.";
  }
  if (isEmailChecked && isEmailAvailable === false) {
    return "아이디(이메일)가 중복입니다. 다시 입력해주세요.";
  }
  if (isEmailChecked && isEmailAvailable === true) {
    return "사용 가능한 아이디(이메일)입니다.";
  }
  return null;
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

// 전화번호 포맷팅
export const formatPhoneNumber = (input: string): string => {
  const onlyNumbers = input.replace(/\D/g, "");
  if (onlyNumbers.length <= 3) return onlyNumbers;
  if (onlyNumbers.length <= 7) return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
};

// 전화번호 유효성 검사
export const validatePhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (!cleaned || cleaned.length <= 10) {
    return "전화번호는 숫자 11자 이상 입력해주세요.";
  }
  return "";
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
