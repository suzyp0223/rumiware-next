"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "@/firebases/firebase";
import { useAppDispatch } from "@/hooks/hooks";
import {
  setUser,
  fetchUserProfile,
  logoutUser,
  setAuthInitialized,
  type EmailUserForRedux,
  type SocialUserForRedux,
} from "@/store/slices/userSlice";

type Props = { children: ReactNode };

/** providerId → "google" | "kakao" 로 안전 매핑 */
function mapProviderIdToUnion(providerId?: string): "google" | "kakao" {
  if (providerId === "oidc.kakao") return "kakao";
  // 그 외는 전부 구글로 취급 (google.com 등)
  return "google";
}

function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 로그인 유지(지속성) 설정
    setPersistence(auth, browserLocalPersistence).catch(() => {});

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      // 초기화 플래그는 항상 먼저 true
      dispatch(setAuthInitialized());

      if (fbUser) {
        const primary = fbUser.providerData[0]?.providerId ?? "password";
        const isEmail = primary === "password";

        if (isEmail) {
          // 이메일 링크/비번 기반 로그인: 임시 email 유저 주입
          const tempEmailUser: EmailUserForRedux = {
            type: "email",
            uid: fbUser.uid,
            email: fbUser.email ?? "",
            name: fbUser.displayName ?? "",
            birthDate: "",
            gender: "",
            nationality: "",
            phoneNumber: "",
            emailVerified: fbUser.emailVerified,
            isAdmin: false,
          };
          dispatch(setUser(tempEmailUser));
        } else {
          // 소셜 로그인: provider를 유니온으로 좁힘
          const provider = mapProviderIdToUnion(primary); // "google" | "kakao"
          const tempSocialUser: SocialUserForRedux = {
            type: "social",
            provider, // ✅ 이제 string 아님: "google" | "kakao"
            uid: fbUser.uid,
            email: fbUser.email ?? "",
            name: fbUser.displayName ?? "",
            photoURL: fbUser.photoURL ?? null,
            birthDate: "",
            gender: "",
            nationality: "",
            phoneNumber: "",
            emailVerified: null,
            zoneCode: "",
            address: "",
            detailAddress: "",
            isAdmin: false,
          };
          dispatch(setUser(tempSocialUser));
        }

        // Firestore 프로필로 덮어쓰기(읽기 전용)
        await dispatch(fetchUserProfile(fbUser.uid));
      } else {
        dispatch(logoutUser());
      }
    });

    return () => unsub();
  }, [dispatch]);

  return null;
}

export default function ClientProviders({ children }: Props) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
