'use client'

import { PageTitle } from "@/components/page-title"
import { ProductImage } from "@/app/product/components/product-image"
import { TRPCErrorComponent } from "@/components/trpc-error-component"
import { trpc } from "@/lib/trpc/client"
import { Item } from "@prisma/client"

const getPrice = (items: Pick<Item, 'salePrice'>[]) => {
  const minPrice = Math.min(...items.map(({ salePrice }) => salePrice))
  const maxPrice = Math.max(...items.map(({ salePrice }) => salePrice))
  if (minPrice === maxPrice) {
    return minPrice
  }
  else {
    return [minPrice, maxPrice]
  }
}

export default () => {
  const { error, isLoading, data } = trpc.product.listWithItems.useQuery({})

  if (error !== null) {
    return (
      <TRPCErrorComponent error={error} />
    )
  }

  if (isLoading) {
    return
  }

  return (
    <div>
      <PageTitle title="在庫" />
      <div className="gap-4 flex flex-wrap">
        {data.products.map(product => {
          const price = getPrice(product.items)
          return (
            <div className="space-y-2 grow" key={product.code}>
              <ProductImage size="lg" src={product.image} />
              <div className="w-96 text-center">
                <div className="truncate">{product.name}</div>
                <div className="text-nowrap">
                  数量:
                  <span className="ms-1 text-xl">{product.items.length}</span>
                </div>
                {typeof price === 'number' ? (
                  <div className="text-nowrap">
                    価格:
                    <span className="ms-1 text-xl">{price}</span>
                    円
                  </div>
                ) : (
                  <div className="text-nowrap">
                    価格帯:
                    <span className="ms-1 text-xl">{price[0]}～{price[1]}</span>
                    円
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
