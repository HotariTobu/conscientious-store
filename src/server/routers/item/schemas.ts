import { z } from "zod"
import { FieldSchemas, idSchema, listSchema, positiveIntegerSchema } from "../schemas"
import { Item } from "@prisma/client"
import { productSchema } from "../product/schemas"

export const itemSchema = z.object({
  id: idSchema,
  purchasePrice: positiveIntegerSchema,
  salePrice: positiveIntegerSchema,
  productCode: productSchema.shape.code
} satisfies FieldSchemas<Item>)

export const itemListSchema = listSchema.extend({
  productCode: productSchema.shape.code.optional(),
  inStockOnly: z.boolean().optional().default(true),
})

export const itemGroupByProductCodeSchema = listSchema.extend({
  inStockOnly: z.boolean().optional().default(true),
})

export const itemForBuySchema = z.object({
  productCode: productSchema.shape.code,
  countInCart: z.number().int().min(0),
}).array()

export const itemByIdSchema = itemSchema.pick({
  id: true
})

export const itemAddSchema = itemSchema.omit({
  id: true,
})

export const itemAddManySchema = itemAddSchema.extend({
  purchaseQuantity: positiveIntegerSchema,
}).array().min(1)

export const itemCheckoutSchema = itemByIdSchema.array().min(1)
