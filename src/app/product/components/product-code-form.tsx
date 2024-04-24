// TODO: サジェスト機能

import { SubmitButton } from "@/components/submit-button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useZodForm } from "@/hooks/useZodForm"
import { productSchema } from "@/server/routers/product/schemas"
import { z } from "zod"

const formSchema = productSchema.pick({
  code: true,
})

type FieldValues = z.infer<typeof formSchema>

export type OnProductCodeSubmit = (productCode: string) => void

export const ProductCodeForm = (props: {
  onProductCodeSubmit: OnProductCodeSubmit
}) => {
  const form = useZodForm({
    schema: formSchema,
    defaultValues: {
      code: '',
    },
  })

  const handleSubmit = (values: FieldValues) => {
    form.reset()
    props.onProductCodeSubmit(values.code)
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>商品コード</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>追加する</SubmitButton>
      </form>
    </Form>
  )
}
