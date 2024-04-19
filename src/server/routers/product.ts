import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { schemas } from "@/lib/prisma/schemas";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export const productRouter = router({
  byCode: publicProcedure
    .input(z.object({
      code: schemas.product.code,
      errorOnNotFound: z.boolean().optional(),
    }))
    .query(async opts => {
      const { code, errorOnNotFound } = opts.input
      const product = await prisma.product.findUnique({
        where: {
          code
        }
      })
      if (product === null && errorOnNotFound === true) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No product with code '${code}'`,
        });
      }
      return product
    }),
  add: publicProcedure
    .input(z.object(schemas.product))
    .mutation(async opts => {
      const data = opts.input
      const product = await prisma.product.create({
        data
      })
      return product
    }),
  update: publicProcedure
    .input(z.object(schemas.product))
    .mutation(async opts => {
      const { code, ...data } = opts.input
      const product = await prisma.product.update({
        where: {
          code,
        },
        data,
      })
      return product
    }),
})
