import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import counterReducer from "./slices/counterSlice";
import userReducer from "./slices/userSlice";
import addressesReducer from "./slices/addressesSlice";

// 1) 먼저 rootReducer를 만든 뒤 ------------------------------ ✨
//    여기 키 이름(state 경로)은 컴포넌트의 useSelector 경로와 반드시 일치해야 합니다.
//    예: state.userReducer.user, state.cartReducer.items, state.counterReducer.value
export const rootReducer = combineReducers({
  counterReducer, // ✨ 기존과 동일한 키 유지
  cartReducer,
  userReducer,
  addressesReducer,
});

// 2) RootState는 rootReducer 기반으로만 선언 ---------------- ✨ (순환 참조 제거)
export type RootState = ReturnType<typeof rootReducer>;

// 3) preloadedState를 받는 makeStore 도입 -------------------- ✨
//    (SSR에서 초기 상태 주입 가능: { userReducer: { user: ..., initialized: true, ... } })
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer, // ✨ object 대신 rootReducer 사용 → 타입 에러 방지
    preloadedState, // ✨ SSR 주입 지점
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredPaths: ["userReducer.user"], // 우리는 이미 직렬화 처리했지만 혹시 모를 경고 무시
        },
      }),
  });
}

// 4) 실제 앱에서 사용할 store (CSR 기본 진입) -------------- ✨ 추가
//    SSR에서 preloadedState를 쓰고 싶다면 ClientProviders에서 makeStore(...)로 생성하세요.
export const store = makeStore();

// 5) AppStore / AppDispatch 타입 ---------------------------- ✨ 위치/정의 정리
export type AppStore = ReturnType<typeof makeStore>;
// 싱글톤 store에서 사용.
export type AppDispatch = typeof store.dispatch;
// 여러 스토어 인스턴스를 만들 수 있는 패턴(SSR 프리로드 등)에서 사용.
// export type AppDispatch = AppStore["dispatch"];
