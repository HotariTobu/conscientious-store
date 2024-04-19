import { z } from "zod";
import { Prisma } from "@prisma/client";

type ModelSchema<T> = Record<keyof T, z.ZodType>

const id = z.coerce.number().finite().int().positive()
const positiveInteger = z.coerce.number().finite().int().positive()

const product = {
  code: z.string().regex(/^\d+$/),
  name: z.string().min(1),
  image: z.string().url(),
} satisfies ModelSchema<Prisma.ProductFieldRefs>

const item = {
  id,
  purchaseQuantity: positiveInteger,
  soldQuantity: positiveInteger,
  purchasePrice: positiveInteger,
  salePrice: positiveInteger,
  productCode: product.code
} satisfies ModelSchema<Prisma.ItemFieldRefs>

const shareholder = {
  id,
  name: z.string().min(1),
} satisfies ModelSchema<Prisma.ShareholderFieldRefs>

const share = {
  id,
  count: positiveInteger,
  quote: positiveInteger,
  shareholderId: shareholder.id
} satisfies ModelSchema<Prisma.ShareFieldRefs>

export const schemas = {
  product,
  item,
  shareholder,
  share,
} as const
