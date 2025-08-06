"use client";
import { useEffect } from "react";

interface Props {
  setEmail: (email: string) => void;
  setIsEmailChecked: (val: boolean) => void;
  setEmailError: (msg: string) => void;
}

const useEmailVerificationRedirect = ({ setEmail, setIsEmailChecked, setEmailError }: Props) => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const verified = searchParams.get("verified");
    const verifiedEmail = searchParams.get("email");

    if (verified === "true" && verifiedEmail) {
      setEmail(verifiedEmail);
      setIsEmailChecked(true);
      setEmailError("");
      window.history.replaceState({}, "", "/join"); // 쿼리 제거
    }
  }, []);
};

export default useEmailVerificationRedirect;
