// ✅ 클라이언트 컴포넌트
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { queryClient } from "../lib/queryClient";
import { store } from "../store/store";
import { UserProvider, User } from "../components/context/UserContext"; // ✅

type Props = {
  children: ReactNode;
  initialUser: User;
};

export default function ClientProviders({ children, initialUser }: Props) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* ✅ 로그인 상태 자동 연장 감시 */}
        <UserProvider initialUser={initialUser}>{children}</UserProvider>
      </QueryClientProvider>
    </Provider>
  );
}
