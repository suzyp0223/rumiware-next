import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, store } from "@/store/store";

// ✅ store에서 AppDispatch 타입을 노출
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
