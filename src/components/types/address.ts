import { FieldValue } from "firebase/firestore";

export interface AddressDoc {
  id: string; // Firestore 문서 ID
  label?: string; // 배송지명 (집/회사 등)
  receiverName?: string; // 수령인
  phone?: string; // 숫자만 (예: 01012345678)
  zonecode?: string; // 우편번호
  address: string; // 기본주소
  detailAddress?: string; // 상세주소
  memo?: string; // 배송 메모
  isDefault: boolean; // 기본 배송지 여부

  createdAt: number | null;
}

export type AddressCreate = Omit<AddressDoc, "id" | "createdAt"> & {
  createdAt: FieldValue; // 만들 때는 serverTimestamp() (FieldValue)
};

export type AddressUpdate = Partial<Omit<AddressDoc, "id" | "createdAt">>;
