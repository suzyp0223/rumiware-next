import { EmailUser, SocialUser, UserState } from "@/store/slices/userSlice";

export function isEmailUser(user: UserState | null): user is EmailUser {
  return !!user && user.type === "email";
}

export function isSocialUser(user: UserState | null): user is SocialUser {
  return !!user && user.type === "social";
}
