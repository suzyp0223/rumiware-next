"use client";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import type { ProductDoc } from "./useProductsFS";

export function useProductsByTag(tag: string, pageSize = 24) {
  return useQuery({
    queryKey: ["productsByTag", tag, pageSize],
    queryFn: async () => {
      const q = query(
        collection(db, "products"),
        where("categoryPaths", "array-contains", tag), // "best-100" | "sale"
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ProductDoc) }));
    },
    enabled: !!tag,
    staleTime: 30_000,
  });
}
