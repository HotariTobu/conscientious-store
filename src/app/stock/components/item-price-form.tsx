import { SubmitButton } from "@/components/submit-button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useZodForm } from "@/hooks/useZodForm"
import { trpc } from "@/lib/trpc/client"
import { itemUpdatePriceSchema } from "@/server/routers/item/schemas"
import { toastTRPCError } from "@/utils/toastTRPCError"

export const ItemPriceForm = (props: {
  productCode: string
  defaultSalePrice: number
  onSubmit: () => void
}) => {
  const form = useZodForm({
    schema: itemUpdatePriceSchema,
    defaultValues: {
      productCode: props.productCode,
      salePrice: props.defaultSalePrice,
    },
  })

  const utils = trpc.useUtils()
  const { mutate } = trpc.item.updatePrice.useMutation({
    onSuccess: async () => {
      await utils.invalidate()
      props.onSubmit()
    },
    onError: toastTRPCError,
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(values => mutate(values))}>
        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem className="space-y-0 gap-2 flex items-center">
              <FormLabel>売り値</FormLabel>
              <FormControl className="w-32">
                <Input {...field} />
              </FormControl>
              <FormLabel>円</FormLabel>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>更新する</SubmitButton>
      </form>
    </Form>
  )
}
