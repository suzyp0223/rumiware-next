import type { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";

// 이 파일은 프로젝트에 자동으로 인식됩니다
export {};

declare global {
  // ✅ HMR/개발환경에서 onAuthStateChanged 단일 등록용 플래그/핸들러
  //   (globalThis에 붙을 전역 변수)
  var __auth_bootstrapped__: boolean | undefined;
  var __auth_unsub__: (() => void) | undefined;

  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
    recaptchaWidgetId?: number;
    daum?: {
      Postcode: new (options: {
        popupTitle?: string;
        popupKey?: string;
        oncomplete: (data: DaumPostcodeData) => void;
      }) => {
        open: () => void;
      };
    };
  }
}
