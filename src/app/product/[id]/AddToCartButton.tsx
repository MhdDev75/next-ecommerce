"use client"

import React, { useState, useTransition } from 'react'

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void>
}

const AddToCartButton = ({ productId, incrementProductQuantity }: AddToCartButtonProps) => {

    const [isPending, startTransaction] = useTransition();
    const [success, setSuccess] = useState(false)

    return (
        <div className='flex items-center gap-3'>
            <button className='btn btn-secondary' onClick={() => {
                setSuccess(false); startTransaction(async () => {
                    await incrementProductQuantity(productId)
                    setSuccess(true)
                })
            }}>
                افزودن به سبر خرید
            </button>
            {isPending && <span className='loading loading-spinner loading-md' />}
            {!isPending && success && <span className='text-sm' >به سبد افزوده شد</span>}

            
        </div>
    )
}

export default AddToCartButton