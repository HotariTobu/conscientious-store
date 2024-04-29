'use client'

import { PageTitle } from "@/components/page-title"
import { ProductImage } from "@/app/product/components/product-image"
import { TRPCErrorComponent } from "@/components/trpc-error-component"
import { trpc } from "@/lib/trpc/client"
import { ItemPriceDialog } from "./components/item-price-dialog"

export default function Page() {
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
        {data.products.map(product => (
          <div className="space-y-2 max-w-96 grow" key={product.code}>
            <ProductImage size="lg" src={product.image} />
            <div className="text-center">
              <div className="truncate">{product.name}</div>
              <div className="text-nowrap">
                数量:
                <span className="ms-1 text-xl">{product.items.length}</span>
              </div>
              <ItemPriceDialog productCode={product.code} items={product.items} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
