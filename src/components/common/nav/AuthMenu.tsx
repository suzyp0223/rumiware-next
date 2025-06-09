import Link from "next/link";

import AuthHeader from "./AuthHeader";

// 로그인 / 회원가입 버튼 그룹
const AuthMenu = () => {
  return (
    <Link href="/login" className="hover:underline hover:text-[var(--color-red-400)]">
      <AuthHeader />
      <div className="">
        <div>
          <Link href="/" className="hover:underline hover:text-[var(--color-red-400)]">
            이메일 로그인
          </Link>
          <Link href="/" className="hover:underline hover:text-[var(--color-red-400)]">
            QR코드 로그인
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default AuthMenu;
