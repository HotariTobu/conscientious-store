import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useZodForm } from "@/hooks/useZodForm"
import { trpc } from "@/lib/trpc/client"
import { productAddSchema } from "@/server/routers/product/schemas"
import Image from "next/image"

export const ProductForm = (props: {
  productCode: string
}) => {
  const form = useZodForm({
    schema: productAddSchema,
    defaultValues: {
      code: props.productCode,
      name: '',
      image: '',
    },
  })

  const utils = trpc.useUtils()
  const { mutate } = trpc.product.add.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate()
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(values => mutate(values))}>
        <Button className="px-0" variant='link' asChild>
          <a href={`https://www.google.com/search?q=${props.productCode}`} target="_blank" rel="noopener noreferrer">新しいタブで検索する</a>
        </Button>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>商品名</FormLabel>
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>画像URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Image className="mx-auto max-h-[40vh]" src={form.getValues('image')} alt="product-image" />
        <SubmitButton>登録する</SubmitButton>
      </form>
    </Form>
  )
}
