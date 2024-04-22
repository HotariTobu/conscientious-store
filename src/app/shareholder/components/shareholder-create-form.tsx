'use client'

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";
import { shareholderAddSchema } from "@/server/routers/shareholder/schemas";

export const ShareholderCreateForm = () => {
  const form = useForm<z.infer<typeof shareholderAddSchema>>({
    resolver: zodResolver(shareholderAddSchema),
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
      <form onSubmit={form.handleSubmit(values => mutate(values))} className="space-y-8">
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
