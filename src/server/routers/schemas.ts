import { z } from "zod";

export type FieldSchemas<T> = Record<keyof Omit<T, 'createdAt' | 'updatedAt' | 'deletedAt'>, z.ZodType>

export const positiveIntegerSchema = z.coerce.number().int().positive()

export const idSchema = z.string().uuid()

export const listSchema = z.object({
  excludeDeleted: z.boolean().optional().default(true),

  cursor: idSchema.nullish().default(null),
  skip: positiveIntegerSchema.optional(),
  limit: positiveIntegerSchema.max(100).optional().default(50),
})
