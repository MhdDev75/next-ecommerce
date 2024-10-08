"use server"

import { createCart, getCart } from '@/lib/db/cart'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import React from 'react'

const setProductQuantity = async (productId: string, quantity: number) => {
    const cart = (await getCart() ?? await createCart())

    const articleInCart = cart.cartItem.find(item => item.productId === productId)


    if (quantity === 0) {
        if (articleInCart) {
            await prisma.cartItem.delete({
                where: { id: articleInCart.id }
            })
        }
    } else {
        if (articleInCart) {
            await prisma.cartItem.update({
                where: { id: articleInCart.id },
                data: { quantity }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                }
            })
        }
    }
    revalidatePath("/cart")
}

export default setProductQuantity