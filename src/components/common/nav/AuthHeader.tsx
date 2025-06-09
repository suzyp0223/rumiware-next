import Image from "next/image";
import Link from "next/link";

import rumiLogo from "../../../assets/img/rumiLogo1.jpg";

// 로그인 / 회원가입 버튼 그룹
const AuthHeader = () => {
  return (
    <header className="">
      <h1>
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image src={rumiLogo} alt="로고이미지" width={130} height={60} className="w40 h-auto" />
        </Link>
      </h1>
    </header>
  );
};

export default AuthHeader;
