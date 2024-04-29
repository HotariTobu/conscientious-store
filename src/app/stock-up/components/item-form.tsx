import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useZodForm } from "@/hooks/useZodForm"
import { itemAddManySchema } from "@/server/routers/item/schemas"
import { z } from "zod"

const itemPropsSchema = itemAddManySchema.element.omit({
  productCode: true
})

export type ItemProps = z.infer<typeof itemPropsSchema>

export const defaultItemProps: ItemProps = {
  purchasePrice: 0,
  salePrice: 0,
  purchaseQuantity: 1,
}

export const ItemForm = (props: {
  onChange: (itemProps: ItemProps) => void,
}) => {
  const form = useZodForm({
    schema: itemPropsSchema,
    defaultValues: defaultItemProps,
  })

  return (
    <Form {...form}>
      <form className="h-fit col-span-3 gap-y-2 grid-cols-subgrid grid" onChange={() => props.onChange(form.getValues())}>
        <FormField
          control={form.control}
          name="purchaseQuantity"
          render={({ field }) => (
            <FormItem className="space-y-0 col-span-3 grid-cols-subgrid grid items-center">
              <FormLabel className="text-end">仕入れ数量</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormLabel></FormLabel>
              <FormMessage className="col-span-3 text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem className="space-y-0 col-span-3 grid-cols-subgrid grid items-center">
              <FormLabel className="text-end">仕入れ値</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormLabel>({(form.getValues('purchasePrice') * 1.08).toFixed(1)})円</FormLabel>
              <FormMessage className="col-span-3 text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem className="space-y-0 col-span-3 grid-cols-subgrid grid items-center">
              <FormLabel className="text-end">売り値</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormLabel>円</FormLabel>
              <FormMessage className="col-span-3 text-center" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
