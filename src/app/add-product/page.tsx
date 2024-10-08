import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "افزودن محصول - مکش مارکت",
};

async function AddProductPage() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price"));
    const categoryId = formData.get("categoryId")?.toString();
    const subCategoryId = formData.get("subCategoryId")?.toString();

    if (!name || !description || !imageUrl || !price) {
      throw Error("Missing Require Fields");
    }

    await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
        categoryId,
        subCategoryId,
      },
    });

    redirect("/");
  }

  const subCategoriesList = await prisma.subCategory.findMany({
    where: { categoryId: { contains: "552cdd15-3f9a-4cc2-874f-a2ca0df541f6" } },
  });

  const categoriesList = await prisma.category.findMany();
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add Product</h1>
      <form action={addProduct} className="flex flex-col  gap-3">
        <input
          required
          name="name"
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea w-full max-w-xs"
        />
        <input
          required
          name="imageUrl"
          type="url"
          placeholder="Image Url"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          required
          name="price"
          type="number"
          placeholder="Price"
          className="input input-bordered w-full max-w-xs"
        />
        <select
          name="categoryId"
          required
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            دسته بندی را انتخاب کنید
          </option>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {subCategoriesList && (
          <select
            name="subCategoryId"
            required
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              زیر دسته بندی را انتخاب کنید
            </option>
            {subCategoriesList.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        )}
        <FormSubmitButton className=" btn-success btn-block w-full max-w-xs">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}

export default AddProductPage;
