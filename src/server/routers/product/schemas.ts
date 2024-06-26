import { z } from "zod"
import { FieldSchemas, listSchema } from "../schemas"
import { Product } from "@prisma/client"

export const productSchema = z.object({
  code: z.string().regex(/^\d+$/),
  name: z.string().min(1),
  image: z.string().url(),
} satisfies FieldSchemas<Product>)

export const productListWithItemsSchema = listSchema.omit({
  cursor: true,
}).extend({
  cursor: productSchema.shape.code.nullish().default(null),
})

export const productByCodeSchema = productSchema.pick({
  code: true,
}).extend({
  errorOnNotFound: z.boolean().optional(),
})

export const productAddSchema = productSchema

export const productUpdateSchema = productSchema
