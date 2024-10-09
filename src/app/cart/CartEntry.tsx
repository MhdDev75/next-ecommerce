"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import formatPrice from "@/lib/format";
import Link from "next/link";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

const CartEntry = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <Link href={"/products/" + product.id} className="font-bold">
          {product.name}
        </Link>
        <div>قیمت : {formatPrice(Number(product.price ))}</div>
        <div>تعداد : {quantity}</div>
        <div> قیمت کل : {formatPrice(Number(product.price * quantity))}</div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default CartEntry;
