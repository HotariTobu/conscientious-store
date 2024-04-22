import { z } from "zod"
import { FieldSchemas, idSchema, paginationSchema, positiveIntegerSchema } from "../schemas"
import { Prisma } from "@prisma/client"
import { shareholderSchema } from "../shareholder/schemas"

export const shareSchema = z.object({
  id: idSchema,
  count: positiveIntegerSchema,
  quote: positiveIntegerSchema,
  shareholderId: shareholderSchema.shape.id
} satisfies FieldSchemas<Prisma.ShareFieldRefs>)

export const shareListSchema = paginationSchema.extend({
  shareholderId: shareholderSchema.shape.id
})

export const shareByIdSchema = shareSchema.pick({
  id: true
})

export const shareAddSchema = shareSchema.omit({
  id: true
})
