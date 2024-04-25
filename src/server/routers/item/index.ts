import { publicProcedure, router } from "../../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { itemAddManySchema, itemAddSchema, itemByIdSchema, itemForBuySchema, itemListSchema } from "./schemas";

export const itemRouter = router({
  list: publicProcedure
    .input(itemListSchema)
    .query(async ({ input }) => {
      const { productCode, excludeDeleted, cursor, skip, limit } = input;

      const items = await prisma.item.findMany({
        where: {
          productCode,
          ...(excludeDeleted ? {
            deletedAt: null,
          } : {}),
        },
        ...(cursor === null ? {} : {
          cursor: {
            id: cursor
          }
        }),

        skip,
        take: limit + 1,
        include: {
          product: true,
        },

        orderBy: {
          createdAt: 'asc'
        },
      })
      const nextCursor = limit < items.length ? items.pop()?.id : null

      return {
        items,
        nextCursor,
      };
    }),
  forBuy: publicProcedure
    .input(itemForBuySchema)
    .query(async ({ input }) => {
      const promises = input.map(async ({ productCode, countInCart }) => {
        const items = await prisma.item.findMany({
          select: {
            id: true,
            salePrice: true,
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          where: {
            productCode,
            deletedAt: null,
          },
          take: countInCart + 1,
          orderBy: {
            createdAt: 'asc'
          },
        })

        return {
          itemInFront: items.pop() ?? null,
          itemsInCart: items,
        }
      })

      const itemsList = await Promise.all(promises)
      return {
        itemInFrontList: itemsList.map(({ itemInFront }) => itemInFront),
        itemsInCartList: itemsList.map(({ itemsInCart }) => itemsInCart),
      }
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
  addMany: publicProcedure
    .input(itemAddManySchema)
    .mutation(async ({ input }) => {
      const data = input.flatMap(({ purchaseQuantity, ...props }) =>
        new Array<typeof props>(purchaseQuantity).fill(props)
      )

      const item = await prisma.item.createMany({
        data,
      });

      return item;
    }),
});
