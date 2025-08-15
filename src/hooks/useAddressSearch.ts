import { DaumPostcodeData } from "../components/types/daum";

export const handleAddressSearch = (
  setZonecode: (code: string) => void,
  setAddress: (addr: string) => void,
  focusDetail: () => void
) => {
  new window.daum.Postcode({
    popupTitle: "Rumiware 루미웨어 주소 검색",
    popupKey: "popup1",
    oncomplete: (data: DaumPostcodeData) => {
      setZonecode(data.zonecode);
      setAddress(data.address);
      focusDetail();
    },
  }).open();
};
