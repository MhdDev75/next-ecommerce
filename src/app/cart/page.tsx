import { getCart } from '@/lib/db/cart'
import React from 'react'
import CartEntry from './CartEntry'
import formatPrice from '@/lib/format'
import setProductQuantity from './Action'


export const metadata = {
    title: "سبد خرید - مکش مارکت"
}

const CartPage = async () => {

    const cart = await getCart()

    return (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-3'>
            <div className='col-span-2'>
                <h1 className='mb-6 text-xl font-bold'>سبد خرید </h1>
                <div className='flex flex-col gap-4'>
                    {Number(cart?.cartItem.length) > 0 &&
                        <div className="hidden  md:grid lg:grid grid-cols-4 items-center gap-3  bg-slate-800 rounded-lg">
                            <div className='col-span-2 p-2 '>
                                محصول
                            </div>
                            <div>
                                تعداد
                            </div>
                            <div>قیمت</div>
                        </div>
                    }
                    {
                        cart?.cartItem.map((item) => (
                            <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity} />
                        ))
                    }
                </div>
                {!cart?.cartItem.length && <p className='flex justify-center bg-slate-800 rounded-lg p-3'>سبد خرید شما خالی می‌باشد</p>}
            </div>
            <div className="col-span-1">
                <div className='card bg-slate-800'>
                    <div className='card-body'>
                        <span>تعداد محصولات : {cart?.size}</span>
                        <span>مجموع مبالغ : {formatPrice(Number(cart?.subTotal))} تومان</span>
                        <span>تخفیف : 0 تومان</span>
                        <div className='divider' />
                        <span className='font-bold'>مبلغ قابل پرداخت : {formatPrice(Number(cart?.subTotal))} تومان</span>
                        <button className='btn btn-success'>پرداخت</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage