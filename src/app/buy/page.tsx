'use client'

import { useCodeReader } from "@/hooks/useCodeReader"
import { useCallback, useState } from "react"
import { ProductCodeDialog } from "../product/components/product-code-dialog"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { trpc } from "@/lib/trpc/client"
import { TRPCError } from "@/components/trpc-error"
import { ItemRow } from "./components/item-row"
import { useCartItemMap } from "./hooks/useCartItemMap"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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

  const router = useRouter()
  const { mutate } = trpc.item.checkout.useMutation({
    onSuccess: () => {
      router.push('/')
    }
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

  const itemsInCart = data.itemsInCartList.flatMap(itemList => itemList)
  const totalAmount = itemsInCart.reduce((sum, { salePrice }) => sum + salePrice, 0)
  const itemIdsInCart = itemsInCart.map(({ id }) => ({ id }))

  return (
    <div>
      <div>
        buy
      </div>
      <ProductCodeDialog onProductCodeSubmit={addFrontItem} />
      <div className="grid grid-cols-2">
        <div>
          {data.itemInFrontList.map(itemInFront => itemInFront === null || (
            <ItemRow {...itemInFront} key={itemInFront.id} >
              <Button onClick={() => updateCartItemMap({
                method: 'add-cart-item',
                productCode: itemInFront.product.code,
              })}>
                カートに入れる
                <ArrowRightIcon className="ms-2 w-4 h-4" />
              </Button>
            </ItemRow>
          ))}
        </div>
        <div>
          {data.itemsInCartList
            .flatMap(itemsInCart => itemsInCart)
            .map(itemInCart => (
              <ItemRow {...itemInCart} key={itemInCart.id} >
                <Button onClick={() => updateCartItemMap({
                  method: 'remove-cart-item',
                  productCode: itemInCart.product.code,
                })}>
                  <ArrowLeftIcon className="ms-2 w-4 h-4" />
                  カートから出す
                </Button>
              </ItemRow>
            ))}
        </div>
      </div>
      <div className="flex">
        <div>合計金額: {totalAmount}円</div>
        <Button onClick={() => mutate(itemIdsInCart)}>買う</Button>
      </div>
    </div>
  )
}
