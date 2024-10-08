import ProductCard from "@/components/ProductCard";
import formatPrice from "@/lib/format";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      subCategory: true,
    },
  });

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="hero bg-base-200 rounded-2xl ">
        <div className="hero-content w-full justify-start flex-col lg:flex-row">
          <img
            src={products[0].imageUrl}
            className="max-w-sm rounded-2xl shadow-2xl"
            width={800}
            height={400}
          />
          <div>
            <h1 className="flex gap-3 ">
              <span className="text-5xl font-bold">{products[0].name}</span>
              <div className="badge badge-accent">
                {products[0].category.name}
              </div>
              <div className="badge badge-primary">
                {products[0].subCategory.name}
              </div>
            </h1>
            <h2 className="text-2xl font-bold mt-5">
              {formatPrice(products[0].price)} تومان
            </h2>
            <p className="py-6">{products[0].description}</p>
            <Link
              href={"/product/" + products[0].id}
              className="btn btn-primary text-lg"
            >
              برو بریم
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
        {products.slice(1).map((item) => (
          <ProductCard key={item.id} product={item} category={item.category} subcategory={item.subCategory} />
        ))}
      </div>
    </div>
  );
}
