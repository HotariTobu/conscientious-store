import { z } from "zod";

export const parsePageSearchParams = <S extends z.ZodRawShape>(schema: z.ZodObject<S>, pageProps: unknown) => {
  const propsSchema = z.object({
    searchParams: schema
  })
  const { searchParams } = propsSchema.parse(pageProps)
  if (typeof searchParams === 'undefined') {
    throw new Error('Undefined searchParams')
  }
  return searchParams
}
