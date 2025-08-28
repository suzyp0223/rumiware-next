import { notFound } from "next/navigation";

type Props = {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function CategoryPage({ params }: Props) {
  const slug = params.slug ?? []; // 예: ["top", "blouse", "shirt"]
  const [main, sub, third] = slug;

  // 🔎 슬러그 검증(선택)
  if (!main) {
    // /c 로만 들어오면 404 대신 전체 카테고리/인기상품 등으로 이동시킬 수도 있음
    // redirect("/best-100");  // 필요 시 사용
    notFound();
  }

  // 🧠 여기서 슬러그에 따라 상품을 조회하세요.
  // 예시: Firestore/Algolia/DB에서 main, sub, third로 필터링
  // const items = await fetchProducts({ main, sub, third })

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">카테고리: {["", ...slug].join(" / ")}</h1>

      {/* 서브카테고리/브레드크럼프 등 */}
      {/* <Breadcrumb segments={slug} /> */}

      {/* 아이템 리스트 */}
      {/* {items.length === 0 ? (
        <p className="text-gray-500">해당 카테고리의 상품이 없습니다.</p>
      ) : (
        <ProductGrid items={items} />
      )} */}

      <pre className="mt-6 p-3 bg-gray-100 rounded">
        {JSON.stringify({ main, sub, third }, null, 2)}
      </pre>
    </main>
  );
}
