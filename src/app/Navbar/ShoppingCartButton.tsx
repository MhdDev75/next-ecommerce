"use client"
import { ShoppingCart } from '@/lib/db/cart'
import formatPrice from '@/lib/format'
import Link from 'next/link'
import React from 'react'

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null
}

const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {

    function closeDropdown() {
       const elem = document.activeElement as HTMLElement 
       if (elem) {
        elem.blur()
       }
    }
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="badge badge-sm indicator-item">{cart?.size || 0}</span>
                </div>
            </div>
            <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-80 shadow">
                <div className="card-body">
                    <span className="text-lg font-bold">تعداد : {cart?.size || 0} </span>
                    <span className="text-info">مبلغ کل : {formatPrice(Number(cart?.subTotal)) || 0} تومان </span>
                    <div className='flex flex-col gap-2 '>
                     {
                        cart?.cartItem && (<div className='grid grid-cols-4 p-2'>
                            <span> عکس </span>
                            <span>
                                نام 
                            </span>
                            <span className='text-center'>
                                تعداد
                            </span>
                            <span>
                                مبلغ
                            </span>
                        </div>)
                     }   
                        {cart?.cartItem.map((item) => (
                            <div key={item.id} className='grid grid-cols-4 bg-slate-700 rounded-md p-2'>
                                <img className='rounded-lg' src={item.product.imageUrl} width={40} height={40} />
                                <span>
                                    {item.product.name}
                                </span>
                                <span className='text-center'>
                                    {item.quantity}
                                </span>
                                <span>
                                    {formatPrice(item.product.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="card-actions">
                        <Link href={"/cart"} onClick={()=>closeDropdown()} className="btn btn-primary btn-block">مشاهده سبد خرید</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShoppingCartButton