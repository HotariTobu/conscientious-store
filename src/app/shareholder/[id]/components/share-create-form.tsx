'use client'

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";
import { shareAddSchema } from "@/server/routers/share/schemas";
import constants from "@/constants.json"

export const ShareCreateForm = (props: {
  shareholderId: number
}) => {
  const form = useForm<z.infer<typeof shareAddSchema>>({
    resolver: zodResolver(shareAddSchema),
    defaultValues: {
      quote: constants.quote,
      count: 1,
      ...props,
    },
  })

  const utils = trpc.useUtils();
  const { mutate } = trpc.share.add.useMutation({
    onSuccess: async () => {
      await utils.share.invalidate()
      form.reset()
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(values => mutate(values))} className="space-y-8">
        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>株数</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton>買う</SubmitButton>
      </form>
    </Form>
  )
}
