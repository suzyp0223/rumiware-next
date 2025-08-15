// ✔ 의존성 없이 동작하도록 toMillis / toDate 메서드 존재 여부만 검사
export const toMillis = (raw: unknown): number | null => {
  if (raw == null) return null; // null/undefined
  if (typeof raw === "number") return raw;

  if (typeof raw === "object") {
    const anyRaw = raw as { toMillis?: () => number; toDate?: () => Date };
    if (typeof anyRaw.toMillis === "function") return anyRaw.toMillis();
    if (typeof anyRaw.toDate === "function") return anyRaw.toDate().getTime();
  }
  return null;
};
