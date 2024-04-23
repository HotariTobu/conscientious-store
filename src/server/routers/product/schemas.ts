import { z } from "zod"
import { FieldSchemas, paginationSchema } from "../schemas"
import { Prisma } from "@prisma/client"

export const productSchema = z.object({
  code: z.string().regex(/^\d+$/),
  name: z.string().min(1),
  image: z.string().url(),
} satisfies FieldSchemas<Prisma.ProductFieldRefs>)

// export const productListSchema = paginationSchema

export const productByCodeSchema = productSchema.pick({
  code: true,
}).extend({
  errorOnNotFound: z.boolean().optional(),
})

export const productAddSchema = productSchema

export const productUpdateSchema = productSchema
