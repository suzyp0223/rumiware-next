export interface UserInfoProps {
  name: string;
  gender: "male" | "female" | "non";
  birth?: string;
  phone?: string;
  emailAgree: boolean;
  smsAgree: boolean;
  address: string; // 기본주소
  detailAddress: string; // 상세주소
  zoneCode: string; // 우편번호
}
