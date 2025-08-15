import { SessionUser } from "@/components/types/auth";
import { UserInfoProps } from "@/components/types/user";

export type UserProfile = SessionUser & Partial<UserInfoProps>;
