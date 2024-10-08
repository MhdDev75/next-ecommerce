"use server"

import { createCart, getCart } from '@/lib/db/cart'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import React from 'react'

const IncrementProductQuantity = async (productId: string) => {
  const cart = (await getCart() ?? await createCart())
  const articleInCart = cart.cartItem.find(item => item.productId === productId)

  if (articleInCart) {
    await prisma.cartItem.update({
      where: {
        id: articleInCart.id
      },
      data: {
        quantity: { increment: 1 }
      }
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1
      }
    })
  }

  revalidatePath("/products/[id]");
}

export default IncrementProductQuantity