// ✅ src/app/auth/page.tsx
/**
 * 	기본 서버 컴포넌트. fetch, cookies(), headers() 등 서버 기능 사용 가능
 */
import AuthMainMenu from "@/components/auth/login/AuthMainMenu";

//코드형태는 페이지 컴포넌트 , React 컴포넌트(함수형 컴포넌트)
const AuthPage = () => {
  return <AuthMainMenu />;
};

export default AuthPage;
