'use client'

import { useCallback, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc/client"
import { useRouter } from "next/navigation"
import { ProductArea } from "./components/product-area"
import { ItemForm, ItemProps, defaultItemProps, taxRate } from "./components/item-form"
import { ProductCodeDialog } from "../product/components/product-code-dialog"
import { PageTitle } from "@/components/page-title"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toastTRPCError } from "@/utils/toastTRPCError"
import { SoundEffect } from "@/components/sound-effect"
import constants from "@/constants.json"
import { useSoundEffect } from "@/hooks/useSoundEffect"

const PageContent = () => {
  const [productCodeSet, setProductCodeSet] = useState(new Set<string>())
  const ref = useRef({
    itemPropsMap: new Map<string, ItemProps>()
  })

  const addProductCode = useCallback((productCode: string) => {
    setProductCodeSet(prevProductCodeSet => new Set([
      ...prevProductCodeSet,
      productCode,
    ]))
  }, [setProductCodeSet])

  const removeProductCode = useCallback((productCode: string) => {
    setProductCodeSet(prevProductCodeSet => new Set([
      ...Array.from(prevProductCodeSet)
        .filter(code => code !== productCode),
    ]))
  }, [setProductCodeSet])

  const updateItemProps = (productCode: string, itemProps: ItemProps) => {
    ref.current.itemPropsMap.set(productCode, itemProps)
  }

  const utils = trpc.useUtils()
  const [open, setOpen] = useState(false)
  const openDialog = useSoundEffect(constants.audio.ok, () => setOpen(true))
  const router = useRouter()
  const { mutate } = trpc.item.addMany.useMutation({
    onSuccess: async () => {
      await utils.item.invalidate()
      openDialog()
    },
    onError: toastTRPCError,
  })

  const handleSubmit = () => {
    mutate(Array.from(productCodeSet).map(productCode => {
      const itemProps = ref.current.itemPropsMap.get(productCode) ?? defaultItemProps
      const { purchasePrice, salePrice, purchaseQuantity, usePurchasePriceIncludedTax } = itemProps
      return {
        productCode,
        purchasePrice: usePurchasePriceIncludedTax ? Math.round(purchasePrice * taxRate) : purchasePrice,
        purchaseQuantity,
        salePrice,
      }
    }))
  }

  const handleCancel = () => {
    setProductCodeSet(new Set())
    setOpen(false)
  }

  const handleAction = () => {
    router.push('/')
  }

  return (
    <div>
      <PageTitle title="仕入れる" />
      <div className="space-y-4">
        <ProductCodeDialog onProductCodeSubmit={addProductCode} />
        <div className="text-sm">カッコ内の数値は8%消費税込みの価格</div>
        {Array.from(productCodeSet).map(productCode => (
          <div className="gap-2 grid grid-cols-12 items-center" key={productCode}>
            <ProductArea productCode={productCode} onDelete={() => removeProductCode(productCode)} />
            <ItemForm onChange={itemProps => updateItemProps(productCode, itemProps)} />
          </div>
        ))}
        <Button onClick={handleSubmit}>仕入れを確定する</Button>
      </div>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>商品在庫の登録が完了しました</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>仕入れに戻る</AlertDialogCancel>
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
    <SoundEffect sources={constants.audio.open} />
  </>
}
