import { publicProcedure, router } from "@/server/trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { productAddSchema, productByCodeSchema, productListWithItemsSchema, productUpdateSchema } from "./schemas";

export const productRouter = router({
  listWithItems: publicProcedure
    .input(productListWithItemsSchema)
    .query(async ({ input }) => {
      const { excludeDeleted, cursor, skip, limit } = input;

      const products = await prisma.product.findMany({
        where: {
          ...(excludeDeleted ? {
            deletedAt: null,
          } : {}),
          items: {
            some: {
              ...(excludeDeleted ? {
                deletedAt: null,
              } : {}),
            },
          },
        },
        ...(cursor === null ? {} : {
          cursor: {
            code: cursor
          }
        }),
        include: {
          items: {
            where: {
              ...(excludeDeleted ? {
                deletedAt: null,
              } : {}),
            }
          },
        },

        skip,
        take: limit + 1,

        orderBy: {
          createdAt: 'asc'
        },
      })
      const nextCursor = limit < products.length ? products.pop()?.code : null

      return {
        products,
        nextCursor,
      };
    }),
  byCode: publicProcedure
    .input(productByCodeSchema)
    .query(async ({ input }) => {
      const { errorOnNotFound, ...where } = input
      const product = await prisma.product.findUnique({
        where
      })

      if (product === null && errorOnNotFound === true) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with code '${input.code}'`,
        });
      }

      return product
    }),
  add: publicProcedure
    .input(productAddSchema)
    .mutation(async ({ input }) => {
      const product = await prisma.product.create({
        data: input
      })

      return product
    }),
  update: publicProcedure
    .input(productUpdateSchema)
    .mutation(async ({ input }) => {
      const { code, ...data } = input

      const product = await prisma.product.update({
        where: {
          code,
        },
        data,
      })

      return product
    }),
})
