import { z } from "zod"
import { FieldSchemas, idSchema, paginationSchema } from "../schemas"
import { Prisma } from "@prisma/client"

export const shareholderSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
} satisfies FieldSchemas<Prisma.ShareholderFieldRefs>)

export const shareholderListSchema = paginationSchema

export const shareholderByIdSchema = shareholderSchema.pick({
  id: true
})

export const shareholderAddSchema = shareholderSchema.omit({
  id: true
})
