import Link from 'next/link'
import React from 'react'
import logo from "@/assets/logo.png"
import Image from 'next/image'
import { redirect } from 'next/navigation'
import ShoppingCartButton from './ShoppingCartButton'
import { getCart } from '@/lib/db/cart'

const Navbar = async () => {

    const searchProducts = async (formData: FormData) => {
        "use server"
        const searchQuery = formData.get("searchQuery")?.toString()
        if (searchQuery) {
            redirect("/search?query=" + searchQuery)
        }
    }

    const cart = await getCart()

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1 gap-2">
                <Link href={"/"} className="btn btn-ghost text-xl">
                    <Image src={logo} width={40} height={40} alt='Makesh logo' />
                    <span> مکش مارکت</span>
                </Link>
                <div className="form-control">
                    <form action={searchProducts}>
                        <input name='searchQuery' type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </form>
                </div>
            </div>
            <div className="flex-none gap-3">
                <ShoppingCartButton cart={cart} />

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar