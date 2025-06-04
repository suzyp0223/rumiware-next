import { useEffect } from "react";

export default function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClickOutside: () => void,
  active: boolean = true
) {
  //외부 클릭 시 닫기
  useEffect(() => {
    if (!active) return;

    const handleClickOutsideClose = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutsideClose);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideClose);
    };
  }, [ref, onClickOutside, active]);
}
