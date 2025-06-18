export interface DaumPostcodeData {
  zonecode: string; // 우편번호
  address: string; // 도로명 or 지번 주소
  addressType?: string;
  bname?: string;
  buildingName?: string;
}
