import type { RecaptchaVerifier } from "firebase/auth";

// 이 파일은 프로젝트에 자동으로 인식됩니다
export {};

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
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
