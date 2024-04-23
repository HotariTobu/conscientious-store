import { publicProcedure, router } from "../../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { itemAddManySchema, itemAddSchema, itemByIdSchema, itemFirstByProductCodeSchema, itemListSchema } from "./schemas";

export const itemRouter = router({
  list: publicProcedure
    .input(itemListSchema)
    .query(async ({ input }) => {
      const { productCode, inStockOnly, limit, cursor } = input;

      const items = await prisma.item.findMany({
        where: {
          productCode,
          ...(inStockOnly ? {
            soldQuantity: {
              lt: prisma.item.fields.purchaseQuantity,
            }
          } : {})
        },
        take: limit + 1,
        ...(cursor === null ? {} : {
          cursor: {
            id: cursor
          }
        })
      })
      const nextCursor = items.at(limit)?.id

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
  firstByProductCode: publicProcedure
    .input(itemFirstByProductCodeSchema)
    .query(async ({ input }) => {
      const item = await prisma.item.findFirst({
        where: input,
      });

      if (item === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No item with productCode '${input.productCode}'`,
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
  addMany: publicProcedure
    .input(itemAddManySchema)
    .mutation(async ({ input }) => {
      const item = await prisma.item.createMany({
        data: input,
      });

      return item;
    }),
});
