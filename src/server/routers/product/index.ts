import { publicProcedure, router } from "../../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { productAddSchema, productByCodeSchema, productUpdateSchema } from "./schemas";

export const productRouter = router({
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
