"use client";
// **Client Component (클라이언트 컴포넌트)**로 동작
// 브라우저에서 자바스크립트를 실행해서 인터랙션이 가능한 UI를 구현할 수 있음.
/**
 * ✅ 다음과 같은 작업이 가능:
  useState, useEffect, useRef, useContext 등 훅 사용
  버튼 클릭, input 입력 등 사용자 이벤트 처리
  브라우저 API (localStorage, window 등) 사용 가능
 */

import EyeCloseIcon from "../icons/EyeCloseIcon";
import EyeOpenIcon from "../icons/EyeOpenIcon";

interface PasswordToggleProps {
  visible: boolean;
  onToggle: () => void;
}

const PasswordToggle = ({ visible, onToggle }: PasswordToggleProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
      title={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
      className="flex items-center justify-center w-6 h-6 focus:outline-none"
    >
      {visible ? <EyeOpenIcon /> : <EyeCloseIcon />}
    </button>
  );
};

export default PasswordToggle;
