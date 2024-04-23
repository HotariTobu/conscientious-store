'use client'

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";
import { shareholderAddSchema } from "@/server/routers/shareholder/schemas";
import { useZodForm } from "@/hooks/useZodForm";

export const ShareholderCreateForm = () => {
  const form = useZodForm({
    schema: shareholderAddSchema,
    defaultValues: {
      name: '',
    },
  })

  const utils = trpc.useUtils();
  const { mutate } = trpc.shareholder.add.useMutation({
    onSuccess: async () => {
      await utils.shareholder.invalidate()
      form.reset()
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(values => mutate(values))}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>株主名</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>追加</SubmitButton>
      </form>
    </Form>
  )
}
