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
      <form className="gap-2 flex" onSubmit={form.handleSubmit(props.onChange)}>
        <FormField
          control={form.control}
          name="purchaseQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>仕入れ数量</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>仕入れ値</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>円
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>売り値</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>円
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
