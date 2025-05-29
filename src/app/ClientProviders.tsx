// ✅ 클라이언트 컴포넌트
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { queryClient } from "../lib/queryClient";
import { store } from "../store/store";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
