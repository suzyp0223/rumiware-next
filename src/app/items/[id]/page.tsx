import { cartItemList } from "@/components/cart/data/cartItemList";
import ItemDetail from "@/components/items/ItemDetail";

export async function generateStaticParams() {
  return cartItemList.map((item) => ({
    id: item.id,
  }));
}

const Page = async ({ params }: { params: { id: string } }) => {
  return <ItemDetail productId={params.id} />;
};

export default Page;
