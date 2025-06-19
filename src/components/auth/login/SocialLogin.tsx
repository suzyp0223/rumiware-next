import Link from "next/link";

const SocialLogin = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href="/login/social">카톡소셜</Link>
      <div>
        <button>네이버소셜</button>
        <button>구글소셜</button>
        <button>애플소셜</button>
      </div>
    </div>
  );
};

export default SocialLogin;
