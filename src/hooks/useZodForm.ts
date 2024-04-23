import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormProps, useForm } from "react-hook-form"
import { z } from "zod"

export const useZodForm = <S extends z.ZodRawShape, T extends z.infer<z.ZodObject<S>>, C = unknown>({ schema, ...props }: {
  schema: z.ZodObject<S>
} & Omit<UseFormProps<T, C>, 'resolver'>) => {
  return useForm<T, C>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    ...props,
  })
}
