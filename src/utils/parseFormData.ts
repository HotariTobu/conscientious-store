import { z } from "zod";

export const parseFormData = <S extends z.ZodRawShape>(schema: z.ZodObject<S>, formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
  const parsedData = schema.parse(data)
  return parsedData
}
