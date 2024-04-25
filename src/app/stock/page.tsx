'use client'

import { TRPCError } from "@/components/trpc-error"
import { trpc } from "@/lib/trpc/client"

export default () => {
  const { error, isLoading, data } = trpc.product.listWithItems.useQuery({})

  if (error !== null) {
    return (
      <TRPCError error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <div>
      {data.products.map(product => (
        <div className="flex" key={product.code}>
          <img className="w-64" src={product.image} />
          <div>{product.name}</div>
          <div>数量: {product.items.length}</div>
        </div>
      ))}
    </div>
  )
}
