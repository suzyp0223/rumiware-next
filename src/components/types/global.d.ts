import type { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";

// 이 파일은 프로젝트에 자동으로 인식됩니다
export {};

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
    recaptchaWidgetId?: number; // 위젯 ID는 number 타입
    daum: {
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
