'use client'

import { useCallback, useRef, useState } from "react"
import { useCodeReader } from "@/hooks/useCodeReader"
import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc/client"
import { useRouter } from "next/navigation"
import { ProductArea } from "./components/product-area"
import { ItemForm, ItemProps, defaultItemProps } from "./components/item-form"
import { ProductCodeDialog } from "../product/components/product-code-dialog"

export default () => {
  const router = useRouter()

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

  useCodeReader(productCode => {
    console.log('code-reader:', productCode)
    addProductCode(productCode)
  })

  const utils = trpc.useUtils()
  const { mutate } = trpc.item.addMany.useMutation({
    onSuccess: async () => {
      await utils.item.invalidate()
      router.push('/')
    },
  })

  const handleSubmit = () => {
    mutate(Array.from(productCodeSet).map(productCode => ({
      productCode,
      ...(ref.current.itemPropsMap.get(productCode) ?? defaultItemProps)
    })))
  }

  return (
    <div>
      <div>
        仕入れ
      </div>
      <ProductCodeDialog onProductCodeSubmit={addProductCode} />
      <div>
        {Array.from(productCodeSet).map(productCode => (
          <div className="flex" key={productCode}>
            <ProductArea productCode={productCode} onDelete={() => removeProductCode(productCode)} />
            <ItemForm onChange={itemProps => updateItemProps(productCode, itemProps)} />
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit}>仕入れを確定する</Button>
    </div>
  )
}
