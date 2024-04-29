'use client'

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";
import { shareAddSchema } from "@/server/routers/share/schemas";
import constants from "@/constants.json"
import { useZodForm } from "@/hooks/useZodForm";
import { toastTRPCError } from "@/utils/toastTRPCError";

export const ShareCreateForm = (props: {
  shareholderId: string,
  onCreate?: (() => void) | undefined
}) => {
  const form = useZodForm({
    schema: shareAddSchema,
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
      props.onCreate?.call(null)
    },
    onError: toastTRPCError,
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(values => mutate(values))}>
        <div className="text-nowrap">
          株価:
          <span className="ms-1 text-xl">{constants.quote}</span>
          円
        </div>
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
