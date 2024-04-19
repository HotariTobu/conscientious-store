'use client'

import { useRef, useState } from "react"
import { ItemRow, SetItemProps } from "./components/item-row"
import { useCodeReader } from "@/hooks/useCodeReader"
import { ItemProps } from "@/server/routers/item/schemas"
import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc/client"
import { useRouter } from "next/navigation"

export default () => {
  const router = useRouter()

  const [productCodeSet, setProductCodeSet] = useState(new Set<string>())
  const ref = useRef({
    itemPropsMap: new Map<string, ItemProps>()
  })

  useCodeReader(code => {
    console.log('code-reader:', code)
    setProductCodeSet(prevProductCodeSet => new Set([
      ...prevProductCodeSet,
      code,
    ]))
  })

  const itemPurchaseMutation = trpc.item.purchase.useMutation({
    onSuccess: () => {
      router.push('/')
    }
  })

  const handleSubmit = () => {
    const { itemPropsMap } = ref.current
    itemPurchaseMutation.mutate({
      productCodeSet,
      itemPropsMap,
    })
  }

  return (
    <div>
      <div>
        仕入れ
      </div>
      {Array.from(productCodeSet).map(code => {
        const setItemProps: SetItemProps = itemProps => {
          ref.current.itemPropsMap.set(code, itemProps)
        }

        return (
          <ItemRow key={code} productCode={code} setItemProps={setItemProps} />
        )
      })}
      <Button onClick={handleSubmit}>仕入れを確定する</Button>
    </div>
  )
}
