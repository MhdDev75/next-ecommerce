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
    const categoryId = formData.get("categoryId")?.toString();
    
    if (!name || !description) {
      throw Error("Missing Require Fields");
    }

    await prisma.subCategory.create({
      data: { name, description, categoryId },
    });

    redirect("/list-category");
  }

  const categoriesList = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

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

        <select name="categoryId" required className="select select-bordered w-full max-w-xs">
          <option disabled selected>
            دسته بندی را انتخاب کنید
          </option>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <FormSubmitButton className=" btn-success btn-block w-full max-w-xs">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}

export default AddProductPage;
