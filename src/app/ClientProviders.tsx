"use client";

import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

import { QueryClientProvider } from "@tanstack/react-query";
import { makeStore } from "@/store/store";
import { queryClient } from "@/lib/queryClient";
import { UserProvider, User } from "@/components/context/UserContext";
import type { State as UserSliceState } from "@/store/slices/userSlice";

type Props = { children: ReactNode; initialUser: User };

export default function ClientProviders({ children, initialUser }: Props) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  if (!storeRef.current) {
    const preload: UserSliceState = initialUser?.uid
      ? // 소셜 여부만 간단히 분기 (provider가 있으면 소셜로)
        initialUser?.provider === "google" || initialUser?.provider === "kakao"
        ? {
            user: {
              type: "social",
              provider: (initialUser.provider as "google" | "kakao") ?? "google",
              uid: initialUser.uid,
              email: initialUser.email ?? "",
              name: initialUser.name ?? initialUser.displayName ?? "",
              photoURL: initialUser.picture ?? "",
              isAdmin: initialUser.isAdmin ?? false,
            },
            isLoggedIn: true,
            loading: false,
            error: null,
            initialized: true,
          }
        : {
            user: {
              type: "email",
              uid: initialUser.uid,
              email: (initialUser.email ?? "").toLowerCase(),
              name: initialUser.name ?? initialUser.displayName ?? "",
              birthDate: initialUser.birthDate ?? "",
              gender: initialUser.gender ?? "",
              nationality: initialUser.nationality ?? "",
              phoneNumber: initialUser.phoneNumber ?? "", // ★ userSlice에서 필수 → 기본값 보장
              emailVerified: initialUser.emailVerified ?? false,
              isAdmin: initialUser.isAdmin ?? false,
            },
            isLoggedIn: true,
            loading: false,
            error: null,
            initialized: true,
          }
      : {
          // 비로그인(또는 uid가 안 온 경우)
          user: null,
          isLoggedIn: false,
          loading: false,
          error: null,
          initialized: true,
        };

    // 🔑 store.ts의 reducer 키(userReducer)와 동일하게 주입. 최초 한 번만 store 생성
    storeRef.current = makeStore({ userReducer: preload });
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClient}>
        <UserProvider initialUser={initialUser}>{children}</UserProvider>
      </QueryClientProvider>
    </Provider>
  );
}
