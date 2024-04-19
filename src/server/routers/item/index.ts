import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { schemas } from "@/lib/prisma/schemas";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { itemPropsSchema } from "./schemas";

export const itemRouter = router({
  purchase: publicProcedure
    .input(z.object({
      productCodeSet: z.set(schemas.product.code),
      itemPropsMap: z.map(schemas.product.code, itemPropsSchema)
    }))
    .mutation(async opts => {
      const { productCodeSet, itemPropsMap } = opts.input

      const { } = await prisma.item.createMany({
        data: Array.from(productCodeSet).map(productCode => {
          const itemProps = itemPropsMap.get(productCode)
          if (typeof itemProps === 'undefined') {
            throw new TRPCError({
              code: 'BAD_REQUEST',
              message: `No itemProps for the product with code '${productCode}'`,
            });
          }
          return {
            ...itemProps,
            productCode,
          }
        })
      })
    }),
  list: publicProcedure
    .input(z.object({
      productCodeSet: z.set(schemas.product.code),
    }))
    .mutation(opts => {

  })
})
