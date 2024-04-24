import { z } from "zod";

export type FieldSchemas<T> = Record<keyof T, z.ZodType>

export const idSchema = z.coerce.number().finite().int().positive()
export const positiveIntegerSchema = z.coerce.number().int().positive()

export const listSchema = z.object({
  cursor: idSchema.nullish().default(null),
  skip: positiveIntegerSchema.optional(),
  limit: positiveIntegerSchema.max(100).optional().default(50),
})
