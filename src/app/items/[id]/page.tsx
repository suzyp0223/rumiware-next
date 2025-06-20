import { cartItemList } from "@/components/cart/data/cartItemList";
import ItemDetail from "@/components/items/ItemDetail";

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return cartItemList.map((item) => ({
    id: item.id,
  }));
}

const Page = async ({ params }: Awaited<PageProps>) => {
  return <ItemDetail productId={params.id} />;
};

export default Page;
