import { z } from "zod"
import { FieldSchemas, idSchema, paginationSchema, positiveIntegerSchema } from "../schemas"
import { Prisma } from "@prisma/client"
import { productSchema } from "../product/schemas"

export const itemSchema = z.object({
  id: idSchema,
  purchaseQuantity: positiveIntegerSchema,
  soldQuantity: positiveIntegerSchema,
  purchasePrice: positiveIntegerSchema,
  salePrice: positiveIntegerSchema,
  productCode: productSchema.shape.code
} satisfies FieldSchemas<Prisma.ItemFieldRefs>)

export const itemListSchema = paginationSchema.extend({
  productCode: productSchema.shape.code.optional(),
  inStockOnly: z.boolean().optional().default(true),
})

export const itemByIdSchema = itemSchema.pick({
  id: true
})

export const itemFirstByProductCodeSchema = itemSchema.pick({
  productCode: true
})

export const itemAddSchema = itemSchema.omit({
  id: true,
  soldQuantity: true,
})

export const itemAddManySchema = itemAddSchema.array()
