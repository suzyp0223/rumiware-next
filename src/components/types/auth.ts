import { ReactNode } from "react";

export interface SessionUser {
  uid: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  type?: "email" | "social";
  provider?: "google" | "kakao";
  isAdmin?: boolean;
}

export interface LayoutProps {
  user?: SessionUser | null;
  children: ReactNode;
}
