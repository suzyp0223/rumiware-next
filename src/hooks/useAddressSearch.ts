import { RefObject } from "react";
import { DaumPostcodeData } from "../components/types/daum";

export const handleAddressSearch = (
  detailInputRef: RefObject<HTMLInputElement | null>,
  setZonecode: (code: string) => void,
  setAddress: (addr: string) => void
) => {
  if (!window?.daum?.Postcode) {
    console.error("daum Postcode script not loaded");
    alert("주소 검색 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  new window.daum.Postcode({
    popupTitle: "Rumiware 루미웨어 주소 검색",
    popupKey: "popup1",
    oncomplete: (data: DaumPostcodeData) => {
      setZonecode(data.zonecode);
      setAddress(data.address);
      setTimeout(() => {
        detailInputRef.current?.focus();
      }, 0);
    },
  }).open();
};
