import { publicProcedure, router } from "../../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { itemAddSchema, itemByIdSchema, itemListSchema } from "./schemas";

// export const itemRouter = router({
//   purchase: publicProcedure
//     .input(itemPurchaseSchema)
//     .mutation(async ({ input }) => {
//       const { } = await prisma.item.createMany({
//         data: Array.from(productCodeSet).map(productCode => {
//           const itemProps = itemPropsMap.get(productCode)
//           if (typeof itemProps === 'undefined') {
//             throw new TRPCError({
//               code: 'BAD_REQUEST',
//               message: `No itemProps for the product with code '${productCode}'`,
//             });
//           }
//           return {
//             ...itemProps,
//             productCode,
//           }
//         })
//       })
//     }),
//   list: publicProcedure
//     .input(z.object({
//     }))
//     .mutation(async ({ input }) => {

//     })
// })


export const itemRouter = router({
  list: publicProcedure
    .input(itemListSchema)
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { productCode, cursor } = input;

      const items = await prisma.item.findMany({
        where: { productCode },
        take: limit + 1,
        cursor,
      })
      const nextCursor = itemListSchema.shape.cursor.parse(items.at(limit))

      return {
        items,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(itemByIdSchema)
    .query(async ({ input }) => {
      const item = await prisma.item.findUnique({
        where: input,
      });

      if (item === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No item with id '${input.id}'`,
        });
      }

      return item;
    }),
  add: publicProcedure
    .input(itemAddSchema)
    .mutation(async ({ input }) => {
      const item = await prisma.item.create({
        data: input,
      });

      return item;
    }),
});
