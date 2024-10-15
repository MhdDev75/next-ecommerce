"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import formatPrice from "@/lib/format";
import { Minimize, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { startTransition, useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

const CartEntry = ({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) => {

  const [isPending, startTransaction] = useTransition()
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 items-center gap-3  bg-slate-800 rounded-lg p-3">
      <div className="flex gap-3 col-span-2 items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          width={120}
          height={120}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div className="text-sm text-gray-500">به ازای هر محصول {formatPrice(Number(product.price))} تومان</div>


        </div>
      </div>
      <div className="flex flex-nowrap gap-2 items-center">
        <button onClick={() => {
          const newQuantity = quantity + 1;
          startTransaction(async () => {
            await setProductQuantity(product.id, newQuantity)
          })

        }} className="btn btn-sm btn-success"><Plus size={15} /></button>
        <input className="input input-bordered w-16 text-center " value={quantity} />
        <button onClick={() => {
          const newQuantity = quantity - 1;
          startTransaction(async () => {
            await setProductQuantity(product.id, newQuantity < 0 ? 0 : newQuantity)
          })

        }} className="btn btn-sm btn-primary"><Minus size={15} /></button>
      </div>
      <div className="flex flex-nowrap gap-2 items-center">  {formatPrice(Number(product.price * quantity))} تومان
        {isPending && <span className="loading loading-ring loading-sm"></span>}
      </div>
    </div>
  );
};

export default CartEntry;
