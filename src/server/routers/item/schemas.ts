import { schemas } from "@/lib/prisma/schemas"
import { z } from "zod"

export const itemPropsSchema = z.object({
  purchaseQuantity: schemas.item.purchaseQuantity,
  purchasePrice: schemas.item.purchasePrice,
  salePrice: schemas.item.salePrice,
})

export type ItemProps = z.infer<typeof itemPropsSchema>
