"use client";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { slugToPath } from "@/lib/category";
import type { ProductDoc } from "./useProductsFS";

export function useProductsByCategory(slug: string[] = [], pageSize = 24) {
  return useQuery({
    queryKey: ["productsByCategory", slug, pageSize],
    queryFn: async () => {
      const path = slugToPath(slug); // "suit/formal"
      const q = query(
        collection(db, "products"),
        where("categoryKeys", "array-contains", path || slug[0] || ""), // 상/중/하 모두 대응
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as ProductDoc) }));
    },
    enabled: true,
    staleTime: 30_000,
  });
}
