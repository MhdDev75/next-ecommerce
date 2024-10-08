import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "افزودن محصول - مکش مارکت",
};

function AddProductPage() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();

    if (!name || !description) {
      throw Error("Missing Require Fields");
    }

    await prisma.category.create({
      data: { name, description },
    });

    redirect("/list-category");
  }
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
        <FormSubmitButton className=" btn-success btn-block w-full max-w-xs">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}

export default AddProductPage;
