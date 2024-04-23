import { z } from "zod";

export type FieldSchemas<T> = Record<keyof T, z.ZodType>

export const idSchema = z.coerce.number().finite().int().positive()
export const positiveIntegerSchema = z.coerce.number().finite().int().positive()

export const paginationSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(50),
  cursor: idSchema.nullish().default(null),
})
