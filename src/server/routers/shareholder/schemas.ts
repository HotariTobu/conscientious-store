import { z } from "zod"
import { FieldSchemas, idSchema, listSchema } from "../schemas"
import { Shareholder } from "@prisma/client"

export const shareholderSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
} satisfies FieldSchemas<Shareholder>)

export const shareholderListSchema = listSchema

export const shareholderByIdSchema = shareholderSchema.pick({
  id: true
})

export const shareholderAddSchema = shareholderSchema.omit({
  id: true
})
