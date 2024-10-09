import { getCart } from '@/lib/db/cart'
import React from 'react'
import CartEntry from './CartEntry'


export const metadata = {
    title:"سبد خرید - مکش مارکت"
}

const CartPage = async () => {
    
    const cart = await getCart()

  return (
    <div>
        <h1 className='mb-6 text-3xl font-bold'>سبد خرید </h1>
        {
            cart?.cartItem.map((item)=>(
                <CartEntry cartItem={item} key={item.id} />
            ))
        }
    </div>
  )
}

export default CartPage