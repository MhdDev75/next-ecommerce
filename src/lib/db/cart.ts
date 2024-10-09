import { cookies } from "next/headers";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


export type CartWithProduct = Prisma.CartGetPayload<{
    include: { cartItem: { include: { product: true } } }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
    include: { product: true }
}>

export type ShoppingCart = CartWithProduct & {
    size: number,
    subTotal: number
}


export async function getCart(): Promise<ShoppingCart | null> {
    const localCartId = cookies().get("localCartId")?.value
    const cart = localCartId ?
        await prisma.cart.findUnique({ where: { id: localCartId }, include: { cartItem: { include: { product: true } } } })
        : null

    if (!cart) {
        return null
    }

    return {
        ...cart,
        size: cart.cartItem.reduce((acc, item) => acc + item.quantity, 0),
        subTotal: cart.cartItem.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    }
}

export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
        data: {

        }
    })
    cookies().set("localCartId", newCart.id)

    return {
        ...newCart,
        cartItem: [],
        size: 0,
        subTotal: 0
    }
}