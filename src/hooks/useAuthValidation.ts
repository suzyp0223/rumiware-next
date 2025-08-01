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
    return "아이디(이메일) 중복 확인을 완료해주세요.";
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
