import { prisma } from '@/lib/prisma';
import { publicProcedure, router } from "@/server/trpc";
import { TRPCError } from '@trpc/server';
import { shareAddSchema, shareByIdSchema, shareListSchema, shareRemoveSchema } from './schemas';

export const shareRouter = router({
  list: publicProcedure
    .input(shareListSchema)
    .query(async ({ input }) => {
      const { shareholderId, excludeDeleted, cursor, skip, limit } = input;

      const shares = await prisma.share.findMany({
        where: {
          shareholderId,
          ...(excludeDeleted ? {
            deletedAt: null,
          } : {})
        },

        ...(cursor === null ? {} : {
          cursor: {
            id: cursor
          }
        }),
        skip,
        take: limit + 1,

        orderBy: {
          createdAt: 'asc'
        },
      })
      const nextCursor = limit < shares.length ? shares.pop()?.id : null

      return {
        shares,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(shareByIdSchema)
    .query(async ({ input }) => {
      const share = await prisma.share.findUnique({
        where: input,
      });

      if (share === null) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No share with id '${input.id}'`,
        });
      }

      return share;
    }),
  add: publicProcedure
    .input(shareAddSchema)
    .mutation(async ({ input }) => {
      const share = await prisma.share.create({
        data: input,
      });

      return share;
    }),
  remove: publicProcedure
    .input(shareRemoveSchema)
    .mutation(async ({ input }) => {
      const { id, count } = input

      const share = await prisma.share.update({
        where: { id },
        data: {
          count: {
            decrement: count,
          }
        },
      });

      if (share.count <= 0) {
        await prisma.share.delete({
          where: { id },
        })
      }

      return share;
    }),
});
