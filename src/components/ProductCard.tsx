import formatPrice from "@/lib/format";
import { Category, Product, SubCategory } from "@prisma/client";
import Link from "next/link";
import React from "react";
interface ProductCardProp {
  product: Product;
  category: Category;
  subcategory: SubCategory;
}

const ProductCard = ({ product, category, subcategory }: ProductCardProp) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          loading="lazy"
          className="h-48 object-cover"
          src={product.imageUrl}
          alt="Shoes"
          width={800}
          height={400}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          <div className="badge badge-accent">{category.name}</div>
          <div className="badge badge-primary">{subcategory.name}</div>
          {isNew && <div className="badge badge-secondary">New</div>}{" "}
        </h2>
        <h2 className="card-title">{formatPrice(product.price)} تومان</h2>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="card-actions justify-start">
          <Link href={"/product/" + product.id} className="btn btn-success">
            همین الان بخر
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
