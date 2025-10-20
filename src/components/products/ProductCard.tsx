"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  price: number;
  discountRate?: number;
  images: string[];
};

export default function ProductCard({ id, title, price, discountRate = 0, images }: Props) {
  const first = images?.[0] ?? "/placeholder.png";
  const sale = Math.round(price * (1 - discountRate / 100));
  return (
    <Link href={`/p/${id}`} className="block group">
      <div className="relative w-full aspect-[3/4] rounded border overflow-hidden">
        <Image src={first} alt={title} fill className="object-cover group-hover:opacity-90" />
      </div>
      <div className="mt-2">
        <p className="text-sm line-clamp-1">{title}</p>
        <div className="text-[15px] font-semibold">
          {discountRate > 0 && <span className="text-blue-500 mr-2">{discountRate}%</span>}
          <span>{sale.toLocaleString()}원</span>
          {discountRate > 0 && (
            <s className="text-gray-400 ml-2 text-sm">{price.toLocaleString()}원</s>
          )}
        </div>
      </div>
    </Link>
  );
}
