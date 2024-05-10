'use client'

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { trpc } from "@/lib/trpc/client";
import { shareRemoveSchema, shareSchema } from "@/server/routers/share/schemas";
import { useZodForm } from "@/hooks/useZodForm";
import { toastTRPCError } from "@/utils/toastTRPCError";

export const ShareDeleteForm = (props: {
  shareId: string,
  maxCount: number,
  quote: number,
  onDelete?: (() => void) | undefined
}) => {
  const form = useZodForm({
    schema: shareRemoveSchema.omit({
      count: true,
    }).extend({
      count: shareSchema.shape.count.max(props.maxCount),
    }),
    defaultValues: {
      id: props.shareId,
      count: 1,
    },
  })

  const utils = trpc.useUtils();
  const { mutate } = trpc.share.remove.useMutation({
    onSuccess: async () => {
      await utils.share.invalidate()
      form.reset()
      props.onDelete?.call(null)
    },
    onError: toastTRPCError,
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(values => mutate(values))}>
        <div className="text-nowrap">
          株価:
          <span className="ms-1 text-xl">{props.quote}</span>
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
        <SubmitButton>売る</SubmitButton>
      </form>
    </Form>
  )
}
