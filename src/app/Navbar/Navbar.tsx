import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import ShoppingCartButton from "./ShoppingCartButton";
import { getCart } from "@/lib/db/cart";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Navbar = async () => {
  const searchProducts = async (formData: FormData) => {
    "use server";
    const searchQuery = formData.get("searchQuery")?.toString();
    if (searchQuery) {
      redirect("/search?query=" + searchQuery);
    }
  };

  const cart = await getCart();
  const session = await getServerSession(authOptions);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 gap-2">
        <Link href={"/"} className="btn btn-ghost text-xl">
          <Image src={logo} width={40} height={40} alt="Makesh logo" />
          <span> مکش مارکت</span>
        </Link>
        <div className="form-control">
          <form action={searchProducts}>
            <input
              name="searchQuery"
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </form>
        </div>
      </div>
      <div className="flex-none gap-3">
        <ShoppingCartButton cart={cart} />
        <UserMenuButton session={session} />
       
      </div>
    </div>
  );
};

export default Navbar;
