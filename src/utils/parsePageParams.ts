import { z } from "zod";

export const parsePageParams = <S extends z.ZodRawShape>(schema: z.ZodObject<S>, pageProps: unknown) => {
  const propsSchema = z.object({
    params: schema
  })
  const { params } = propsSchema.parse(pageProps)
  if (typeof params === 'undefined') {
    throw new Error('Undefined params')
  }
  return params
}
