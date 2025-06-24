import { cartItemList } from "@/components/cart/data/cartItemList";
import ItemDetail from "@/components/items/ItemDetail";

// ✅ 정적 경로 생성을 위한 함수
export function generateStaticParams(): { id: string }[] {
  return cartItemList.map((item) => ({
    id: item.id,
  }));
}

// ✅ Next.js 15 기준 - params는 Promise 형태로 받아서 await 처리
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ItemDetail productId={id} />;
}
