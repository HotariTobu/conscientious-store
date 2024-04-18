import { z } from "zod";
import { prisma } from "./prisma";

type ModelSchema<T> = Record<keyof T, z.ZodType>

const id = z.coerce.number().finite().int().positive()
const positiveInteger = z.coerce.number().finite().int().positive()

const product = {
  code: z.string().min(1),
  name: z.string().min(1),
  image: z.string().url(),
}
product as ModelSchema<typeof prisma.product.fields>

const item = {
  id,
  purchaseQuantity: positiveInteger,
  soldQuantity: positiveInteger,
  purchasePrice: positiveInteger,
  salePrice: positiveInteger,
  productCode: product.code
}
item as ModelSchema<typeof prisma.item.fields>

const shareholder = {
  id,
  name: z.string().min(1),
}
shareholder as ModelSchema<typeof prisma.shareholder.fields>

const share = {
  id,
  count: positiveInteger,
  quote: positiveInteger,
  shareholderId: shareholder.id
}
share as ModelSchema<typeof prisma.share.fields>

export const schemas = {
  product,
  item,
  shareholder,
  share,
} as const
