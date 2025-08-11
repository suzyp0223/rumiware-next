"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebases/firebase";

export type User = {
  uid?: string; // ← 옵셔널
  email?: string;
  phoneNumber?: string;
  name?: string;
  displayName?: string;
  picture?: string;

  birthDate?: string;
  gender?: string;
  nationality?: string;
  emailVerified?: boolean;
  isAdmin?: boolean;

  type?: "email" | "social";
  provider?: "google" | "kakao";
} | null;

const UserContext = createContext<{ user: User }>({ user: null });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children,
  initialUser, // 👈 Layout에서 전달받을 사용자 정보
}: {
  children: React.ReactNode;
  initialUser: User | undefined;
}) => {
  const [user] = useState(initialUser ?? null); // 상태는 유지만 하고 변경하지 않음

  // ✅ 자동 로그인 연장 로직
  useEffect(() => {
    const refreshSessionIfNeeded = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const tokenResult = await currentUser.getIdTokenResult();
      const expirationTime = new Date(tokenResult.expirationTime);
      const now = new Date();

      const timeLeft = expirationTime.getTime() - now.getTime();
      const oneDay = 1000 * 60 * 60 * 24;

      // 만료까지 1일 미만 남았으면 쿠키 갱신
      if (timeLeft < oneDay) {
        const newIdToken = await currentUser.getIdToken(true); // 강제로 재발급
        await fetch("/api/sessionLogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: newIdToken, autoLogin: true }), // 🔁 재발급 요청
        });
        console.log("🔄 자동 로그인 쿠키 갱신 완료");
      }
    };

    // ⏱️ 1시간마다 검사
    const interval = setInterval(refreshSessionIfNeeded, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
