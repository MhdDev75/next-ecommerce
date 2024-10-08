import { prisma } from '@/lib/prisma'
import React from 'react'

const ListCategoryPage =async () => {

    const categoriesList = await prisma.category.findMany({
        orderBy:{id: "desc"} 
    })

  return (
    <div>
 {
    categoriesList.map((item)=> (
        <div key={item.id}>{item.name}</div>
    ))

   }
    </div>
  
    
  )
}

export default ListCategoryPage