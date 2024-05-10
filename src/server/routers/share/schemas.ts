import { z } from "zod"
import { FieldSchemas, idSchema, listSchema, positiveIntegerSchema } from "../schemas"
import { Share } from "@prisma/client"
import { shareholderSchema } from "../shareholder/schemas"

export const shareSchema = z.object({
  id: idSchema,
  count: positiveIntegerSchema,
  quote: positiveIntegerSchema,
  shareholderId: shareholderSchema.shape.id
} satisfies FieldSchemas<Share>)

export const shareListSchema = listSchema.extend({
  shareholderId: shareholderSchema.shape.id.optional(),
})

export const shareByIdSchema = shareSchema.pick({
  id: true
})

export const shareAddSchema = shareSchema.omit({
  id: true
})

export const shareRemoveSchema = shareSchema.pick({
  id: true,
  count: true,
})
