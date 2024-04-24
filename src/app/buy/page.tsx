'use client'

import { useCodeReader } from "@/hooks/useCodeReader"
import { useCallback, useState } from "react"
import { ProductCodeDialog } from "../product/components/product-code-dialog"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { trpc } from "@/lib/trpc/client"
import { TRPCError } from "@/components/trpc-error"
import { ItemRow } from "./components/item-row"
import { useCartItemMap } from "./hooks/useCartItemMap"

export default () => {
  const [cartItemMap, updateCartItemMap] = useCartItemMap()

  const addFrontItem = useCallback((productCode: string) => {
    updateCartItemMap({
      method: 'add-front-item',
      productCode
    })
  }, [updateCartItemMap])

  useCodeReader(productCode => {
    console.log('code-reader:', productCode)
    addFrontItem(productCode)
  })

  const { error, isLoading, data } = trpc.item.forBuy.useQuery(
    Array.from(cartItemMap).map(
      ([productCode, countInCart]) => ({
        productCode,
        countInCart,
      })
    )
  )

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
      <div>
        buy
      </div>
      <ProductCodeDialog onProductCodeSubmit={addFrontItem} />
      <div className="flex">
        <div>
          {data.itemInFrontList.map(itemInFront => itemInFront === null || (
            <ItemRow {...itemInFront} key={itemInFront.id} />
          ))}
        </div>
        <div>
          <ArrowRightIcon />
        </div>
        <div>
          {data.itemsInCartList
            .flatMap(itemsInCart => itemsInCart)
            .map(itemInCart => (
              <ItemRow {...itemInCart} key={itemInCart.id} />
            ))}
        </div>
      </div>
    </div>
  )
}
