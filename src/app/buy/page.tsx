'use client'

import { useCallback, useState } from "react"
import { ProductCodeDialog } from "../product/components/product-code-dialog"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { trpc } from "@/lib/trpc/client"
import { TRPCErrorComponent } from "@/components/trpc-error-component"
import { ItemRow } from "./components/item-row"
import { useCartItemMap } from "./hooks/useCartItemMap"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PageTitle } from "@/components/page-title"
import { Separator } from "@/components/ui/separator"
import { toastTRPCError } from "@/utils/toastTRPCError"
import { useSoundEffect } from "@/hooks/useSoundEffect"
import constants from "@/constants.json"
import { SoundEffect } from "@/components/sound-effect"

const PageContent = () => {
  const [cartItemMap, updateCartItemMap] = useCartItemMap()

  const addFrontItem = useCallback((productCode: string) => {
    updateCartItemMap({
      method: 'add-front-item',
      productCode
    })
  }, [updateCartItemMap])

  const [open, setOpen] = useState(false)
  const openDialog = useSoundEffect(checkoutSESources, () => setOpen(true))
  const router = useRouter()
  const { mutate } = trpc.item.checkout.useMutation({
    onSuccess: () => {
      openDialog()
    },
    onError: toastTRPCError,
  })

  const { error, isLoading, data } = trpc.item.forBuy.useQuery(
    Array.from(cartItemMap).map(
      ([productCode, countInCart]) => ({
        productCode,
        countInCart,
      })
    )
  )

  const addCart = useSoundEffect(constants.audio.money, (productCode: string) => updateCartItemMap({
    method: 'add-cart-item',
    productCode,
  }))

  const removeCart = useSoundEffect(removeCartSESources, (productCode: string) => updateCartItemMap({
    method: 'remove-cart-item',
    productCode,
  }))

  if (error !== null) {
    return (
      <TRPCErrorComponent error={error} />
    )
  }

  if (isLoading) {
    return
  }

  const itemsInCart = data.itemsInCartList.flatMap(itemList => itemList)
  const totalAmount = itemsInCart.reduce((sum, { salePrice }) => sum + salePrice, 0)
  const itemIdsInCart = itemsInCart.map(({ id }) => ({ id }))

  const handleCancel = () => {
    updateCartItemMap({
      method: 'clear',
    })
    setOpen(false)
  }

  const handleAction = () => {
    router.push('/')
  }

  return (
    <div>
      <PageTitle title="買う" />
      <div className="space-y-4">
        <ProductCodeDialog onProductCodeSubmit={addFrontItem} />
        <div className="gap-2 grid grid-cols-2">
          <div className="space-y-2">
            <div className="text-center">メニュー</div>
            <Separator className="mx-auto w-4/5" orientation="horizontal" />
            {data.itemInFrontList.map(itemInFront => itemInFront === null || (
              <ItemRow {...itemInFront} key={itemInFront.id} >
                <Button onClick={() => addCart(itemInFront.product.code)}>
                  カートに入れる
                  <ArrowRightIcon className="ms-2 w-4 h-4" />
                </Button>
              </ItemRow>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-center">カート</div>
            <Separator className="mx-auto w-4/5" orientation="horizontal" />
            {data.itemsInCartList
              .flatMap(itemsInCart => itemsInCart)
              .map(itemInCart => (
                <ItemRow {...itemInCart} key={itemInCart.id} >
                  <Button onClick={() => removeCart(itemInCart.product.code)}>
                    <ArrowLeftIcon className="ms-2 w-4 h-4" />
                    カートから出す
                  </Button>
                </ItemRow>
              ))}
          </div>
        </div>
        <div className="w-fit gap-2 flex items-center group">
          <div className="text-nowrap">
            合計金額:
            <span className="ms-1 text-4xl group-hover:text-destructive">{totalAmount}</span>
            円
          </div>
          <Button onClick={() => mutate(itemIdsInCart)}>買う</Button>
        </div>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>商品の購入が完了しました</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>買い物を続ける</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>ホームに戻る</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default function Page() {
  return <>
    <PageContent />
    <SoundEffect sources={buySESources} />
  </>
}

const buySESources = [
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-irasshaimase1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-irasshai1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-rasshai1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-irasshaidesu1.mp3",
]

const checkoutSESources = [
  "https://soundeffect-lab.info/sound/voice/mp3/info-girl1/info-girl1-goriyouarigatou1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/info-girl1/info-girl1-goriyouarigatou2.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/info-girl1/info-girl1-matanogoriyouwo1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-arigatougozaimasu1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-maidoari1.mp3",
  "https://soundeffect-lab.info/sound/voice/mp3/line-girl1/line-girl1-maidoarigatougozaimasu1.mp3",
]

const removeCartSESources = [
  "https://soundeffect-lab.info/sound/anime/mp3/pa1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/papa1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/peta1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/pafu1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/pico-pico-hammer1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/nyu1.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/nyu2.mp3",
  "https://soundeffect-lab.info/sound/anime/mp3/nyu3.mp3",
]
