// utils/emailStorage.ts
export const getStoredEmail = (): string => {
  return localStorage.getItem("savedEmail") || "";
};

export const storeEmail = (email: string) => {
  localStorage.setItem("savedEmail", email);
};

export const removeStoredEmail = () => {
  localStorage.removeItem("savedEmail");
};
