import { prisma } from '@/lib/prisma';
import { router, publicProcedure } from '../../trpc';
import { TRPCError } from '@trpc/server';
import { shareAddSchema, shareByIdSchema, shareListSchema } from './schemas';

export const shareRouter = router({
  list: publicProcedure
    .input(shareListSchema)
    .query(async ({ input }) => {
      const { shareholderId, cursor, skip, limit } = input;

      const shares = await prisma.share.findMany({
        where: { shareholderId },

        ...(cursor === null ? {} : {
          cursor: {
            id: cursor
          }
        }),
        skip,
        take: limit + 1,
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
});
