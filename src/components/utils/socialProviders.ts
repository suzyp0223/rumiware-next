import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";

// 🔧 Firebase Authentication에 설정된 Provider ID들을 통일해서 사용
export const PROVIDERS = {
  google: "google.com",
  kakao: "oidc.kakao",
} as const;

export function createProviderInstance(providerId: string) {
  if (providerId === PROVIDERS.google) return new GoogleAuthProvider();
  // 🔧 OIDC로 등록한 공급자는 OAuthProvider로 생성
  return new OAuthProvider(providerId);
}

export const PROVIDER_META: Record<string, { label: string; icon: string }> = {
  [PROVIDERS.google]: { label: "구글", icon: "/google.jpg" },
  [PROVIDERS.kakao]: {
    label: "카카오",
    icon: "/kakaoIcon.png",
  },
};
