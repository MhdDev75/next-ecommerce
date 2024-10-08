import formatPrice from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import IncrementProductQuantity from "./Action";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      subCategory: true,
    },
  });
  if (!product) notFound();
  return product;
});

export async function generateMetaData({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + "- مکش مارکت",
    description: product.description,
    // openGraph: {
    //   images: { url: product.imageUrl },
    // },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="hero bg-base-200 rounded-2xl ">
      <div className="hero-content w-full justify-start flex-col lg:flex-row">
        <img
          src={product.imageUrl}
          className="max-w-sm rounded-2xl shadow-2xl"
          width={800}
          height={400}
        />
        <div>
          <h1 className="flex gap-3 ">
            <span className="text-5xl font-bold">{product.name}</span>
            <div className="badge badge-accent">{product.category.name}</div>
            <div className="badge badge-primary">
              {product.subCategory.name}
            </div>
          </h1>
          <h2 className="text-2xl font-bold mt-5">
            {formatPrice(product.price)} تومان
          </h2>
          <p className="py-6">{product.description}</p>
          <AddToCartButton productId={product.id} incrementProductQuantity={IncrementProductQuantity} />
        </div>
      </div>
    </div>
  );
}
