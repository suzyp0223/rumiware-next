import { cartItemList } from "@/components/cart/data/cartItemList";
import ItemDetail from "@/components/items/ItemDetail";

// ✅ 정적 경로 생성을 위한 함수
export function generateStaticParams(): { id: string }[] {
  return cartItemList.map((item) => ({
    id: item.id,
  }));
}

// ✅ Next.js 15 기준
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <ItemDetail productId={id} />;
}
