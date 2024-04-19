import { ProductForm } from "@/app/stock-up/components/product-form"
import { NumberInput } from "@/components/number-input"
import { trpc } from "@/lib/trpc/client"
import { ItemProps, itemPropsSchema } from "@/server/routers/item/schemas"
import { parseFormData } from "@/utils/parseFormData"
import { useEffect, useRef } from "react"

export type SetItemProps = (ItemProps: ItemProps) => void

export const ItemRow = (props: {
  productCode: string
  setItemProps: SetItemProps
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleChange = () => {
    const form = formRef.current
    if (form === null) {
      return
    }

    try {
      const formData = new FormData(form)
      const ItemProps = parseFormData(itemPropsSchema, formData)
      props.setItemProps(ItemProps)
    } catch (error) {

    }
  }

  useEffect(() => {
    handleChange()
  }, [])

  return (
    <div className="flex">
      <ProductForm code={props.productCode} />
      <form onChange={handleChange} ref={formRef}>
        <NumberInput name="purchaseQuantity" placeholder="仕入れ数量" defaultValue={0} integer />
        <NumberInput name="purchasePrice" placeholder="仕入れ値" defaultValue={0} integer />円
        <NumberInput name="salePrice" placeholder="売り値" defaultValue={0} integer />円
      </form>
    </div>
  )
}
