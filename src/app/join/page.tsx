import Link from "next/link";

const page = () => {
  return (
    <>
      <Link href="/auth/email" className="hover:underline hover:text-[#0073e9]">
        회원가입
      </Link>
    </>
  );
};

export default page;
