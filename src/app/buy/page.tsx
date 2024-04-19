'use client'

import { useCodeReader } from "@/hooks/useCodeReader"
import { schemas } from "@/lib/prisma/schemas"
import { useState } from "react"
import { z } from "zod"

const cartItemSchema = z.object({
  productCode: schemas.product.code

})

type CartItem = {

}

type CartItemsAction = {

}

const cartItemsReducer = (state)

export default () => {
  useCodeReader(console.log)

  const [text, setText] = useState('')

  return (
    <div>
      buy
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  )
}
