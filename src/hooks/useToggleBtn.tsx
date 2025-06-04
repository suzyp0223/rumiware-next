import { useCallback, useState } from "react";

export default function useToggleBtn(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);

  // 빈 배열([])을 넣으면 해당 콜백은 처음 마운트될 때 한 번만 생성되고 다시 생성되지 않음.
  const toggle = useCallback(() => {
    // 불리언 값을 반전 시킴. false => true, true => false
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, toggle, close, open };
}
