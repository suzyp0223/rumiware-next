export type FirestoreUser = {
  // 공통
  uid: string;
  isAdmin?: boolean;

  // 이메일 유저
  type?: "email" | "social";
  provider?: "google" | "kakao";
  email?: string;
  emailVerified?: boolean;

  // 기존 회원정보
  name?: string;
  birthDate?: string; // YYMMDD
  gender?: string; // "남자" | "여자" | "non" 등
  nationality?: string;
  phoneNumber?: string; // 숫자만 저장 권장

  // 주소 3종
  zoneCode?: string;
  address?: string;
  detailAddress?: string;

  // 서버 타임스탬프 등 직렬화 불가 필드는 fetch에서 제거
  createdAt?: unknown;
  updatedAt?: unknown;
};

// Redux에 보관할 형태(직렬화 가능)
export type EmailUserForRedux = Omit<FirestoreUser, "createdAt"> & { type: "email" };
export type SocialUserForRedux = Omit<FirestoreUser, "createdAt"> & { type: "social" };
