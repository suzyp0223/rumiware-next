// hooks/useAuthValidation.ts
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidPassword = (pwd: string): boolean => {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return pwd.trim().length >= 12 && specialCharRegex.test(pwd);
};

export const getEmailError = (email: string): string => {
  if (email.trim() === "") return "아이디(이메일)를 입력해주세요.";
  if (!isValidEmail(email)) return "유효한 이메일 형식이 아닙니다.";
  return "";
};

export const getPasswordError = (pwd: string): string => {
  if (pwd.trim() === "") return "비밀번호를 입력해주세요.";
  if (pwd.trim().length < 12) return "비밀번호는 12자 이상 입력해주세요.";
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(pwd)) return "특수문자를 1개 이상 포함해주세요.";
  return "";
};
