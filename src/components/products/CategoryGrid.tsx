"use client";
import ProductCard from "./ProductCard";
import { useProductsByCategory } from "@/hooks/useProductsByCategory";

export default function CategoryGrid({ slug = [] as string[] }) {
  const { data, isLoading, error } = useProductsByCategory(slug, 24);

  if (isLoading) return <div className="p-6">로딩 중…</div>;
  if (error) return <div className="p-6">목록을 불러올 수 없습니다.</div>;
  if (!data?.length) return <div className="p-6 text-gray-500">상품이 없습니다.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {data.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          discountRate={p.discountRate}
          images={p.images}
        />
      ))}
    </div>
  );
}
