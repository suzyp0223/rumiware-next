"use client";

import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebases/firebase";

export type ProductDoc = {
  title: string;
  price: number;
  discountRate?: number;
  description?: string;
  images: string[];
  category: { main: string; sub?: string; third?: string; pathName: string };
  categoryPaths?: string[];
  categoryKeys: string[];
  stock: number;
  sold: number;
  options?: string[];
  color?: string[];
};

export function useProductsFS(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const snap = await getDoc(doc(db, "products", id));
      if (!snap.exists()) throw new Error("NOT_FOUND");
      return { id: snap.id, ...(snap.data() as ProductDoc) };
    },
    enabled: !!id,
    staleTime: 60_000,
  });
}
